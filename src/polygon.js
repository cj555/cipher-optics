// Three.js polyhedron renderer
// Requires THREE to be loaded globally (from CDN)

const PolygonRenderer = (() => {
  let scene, camera, renderer, group, raycaster;
  let faceMeshes = [];
  let isDragging = false;
  let prevPointer = { x: 0, y: 0 };
  let dragDistance = 0;
  let autoRotating = true;
  let manuallyFrozen = false;
  let onFaceSelectCb = null;
  let container = null;
  let animFrameId = null;

  // ─── Geometry helpers ────────────────────────────────────────────────────

  function v3(x, y, z) { return new THREE.Vector3(x, y, z); }

  function makeTriMesh(va, vb, vc, faceIndex, color) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array([va.x, va.y, va.z, vb.x, vb.y, vb.z, vc.x, vc.y, vc.z]), 3
    ));
    geo.setAttribute('uv', new THREE.BufferAttribute(
      new Float32Array([0.5, 1, 0, 0, 1, 0]), 2
    ));
    geo.computeVertexNormals();
    const mat = new THREE.MeshLambertMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.faceIndex = faceIndex;
    return mesh;
  }

  function buildCube(faceColors) {
    const s = 0.88;
    const h = s / 2;
    const meshes = [];
    const configs = [
      { pos: [h, 0, 0], rot: [0, Math.PI / 2, 0] },   // right
      { pos: [-h, 0, 0], rot: [0, -Math.PI / 2, 0] },  // left
      { pos: [0, h, 0], rot: [-Math.PI / 2, 0, 0] },   // top
      { pos: [0, -h, 0], rot: [Math.PI / 2, 0, 0] },   // bottom
      { pos: [0, 0, h], rot: [0, 0, 0] },               // front
      { pos: [0, 0, -h], rot: [0, Math.PI, 0] },        // back
    ];
    configs.forEach((cfg, i) => {
      const geo = new THREE.PlaneGeometry(s, s);
      const mat = new THREE.MeshLambertMaterial({
        color: parseInt(faceColors[i % faceColors.length].replace('#', ''), 16),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...cfg.pos);
      mesh.rotation.set(...cfg.rot);
      mesh.userData.faceIndex = i;
      meshes.push(mesh);
    });
    return meshes;
  }

  function buildTetrahedron(faceColors) {
    const r = 1.0;
    const verts = [
      v3(0, r, 0),
      v3(2 * Math.sqrt(2) / 3 * r, -r / 3, 0),
      v3(-Math.sqrt(2) / 3 * r, -r / 3, Math.sqrt(6) / 3 * r),
      v3(-Math.sqrt(2) / 3 * r, -r / 3, -Math.sqrt(6) / 3 * r),
    ];
    const faces = [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]];
    return faces.map((f, i) =>
      makeTriMesh(verts[f[0]], verts[f[1]], verts[f[2]], i,
        parseInt(faceColors[i % faceColors.length].replace('#', ''), 16))
    );
  }

  function buildOctahedron(faceColors) {
    const r = 0.95;
    const verts = [
      v3(0, r, 0),    // 0 top
      v3(0, -r, 0),   // 1 bottom
      v3(r, 0, 0),    // 2 right
      v3(-r, 0, 0),   // 3 left
      v3(0, 0, r),    // 4 front
      v3(0, 0, -r),   // 5 back
    ];
    const faces = [
      [0, 4, 2], [0, 2, 5], [0, 5, 3], [0, 3, 4],
      [1, 2, 4], [1, 5, 2], [1, 3, 5], [1, 4, 3],
    ];
    return faces.map((f, i) =>
      makeTriMesh(verts[f[0]], verts[f[1]], verts[f[2]], i,
        parseInt(faceColors[i % faceColors.length].replace('#', ''), 16))
    );
  }

  // ─── Init / Destroy ───────────────────────────────────────────────────────

  let ignoreClickUntil = 0;

  function init(containerEl, polygonType, theme, onFaceSelect) {
    destroy();
    container = containerEl;
    onFaceSelectCb = onFaceSelect;
    // Ignore click events for 400ms after init (prevents propagation from nav click)
    ignoreClickUntil = Date.now() + 400;

    const W = containerEl.clientWidth || 320;
    const H = Math.min(W, 380);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
    camera.position.z = 2.8;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerEl.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(2, 3, 2);
    scene.add(dir);
    const fill = new THREE.DirectionalLight(0xffffff, 0.3);
    fill.position.set(-2, -1, -2);
    scene.add(fill);

    group = new THREE.Group();
    group.rotation.x = 0.3;
    group.rotation.y = 0.5;

    faceMeshes = buildPolygon(polygonType, theme);
    faceMeshes.forEach(m => group.add(m));

    // Wireframe edges for polish
    faceMeshes.forEach(m => {
      const edges = new THREE.EdgesGeometry(m.geometry);
      const lineMat = new THREE.LineBasicMaterial({
        color: parseInt(theme.accentColor.replace('#', ''), 16),
        transparent: true,
        opacity: 0.5,
      });
      const wire = new THREE.LineSegments(edges, lineMat);
      wire.userData.isEdge = true;
      m.add(wire);
    });

    scene.add(group);
    raycaster = new THREE.Raycaster();

    setupEvents(renderer.domElement);
    animate();
  }

  function destroy() {
    if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
    if (renderer && container && renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
    if (renderer) { renderer.dispose(); renderer = null; }
    faceMeshes = [];
    scene = null;
    group = null;
    manuallyFrozen = false;
    autoRotating = true;
  }

  function buildPolygon(type, theme) {
    if (type === 'tetrahedron') return buildTetrahedron(theme.faceColors);
    if (type === 'octahedron') return buildOctahedron(theme.faceColors);
    return buildCube(theme.faceColors);
  }

  // ─── Interaction ─────────────────────────────────────────────────────────

  function setupEvents(canvas) {
    canvas.style.touchAction = 'none';

    const onStart = (x, y) => {
      isDragging = true;
      dragDistance = 0;
      autoRotating = false;
      prevPointer = { x, y };
    };
    const onMove = (x, y) => {
      if (!isDragging) return;
      const dx = x - prevPointer.x;
      const dy = y - prevPointer.y;
      dragDistance += Math.abs(dx) + Math.abs(dy);
      group.rotation.y += dx * 0.013;
      group.rotation.x += dy * 0.013;
      prevPointer = { x, y };
    };
    const onEnd = (x, y) => {
      if (dragDistance < 8) pickFace(x, y, canvas);
      isDragging = false;
      // Resume auto-rotate after 3s idle, unless manually frozen
      setTimeout(() => { if (!manuallyFrozen) autoRotating = true; }, 3000);
    };

    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    canvas.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      onEnd(t.clientX, t.clientY);
    });

    canvas.addEventListener('mousedown', e => onStart(e.clientX, e.clientY));
    canvas.addEventListener('mousemove', e => { if (isDragging) onMove(e.clientX, e.clientY); });
    canvas.addEventListener('mouseup', e => onEnd(e.clientX, e.clientY));
  }

  function pickFace(clientX, clientY, canvas) {
    if (Date.now() < ignoreClickUntil) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera({ x, y }, camera);
    const hits = raycaster.intersectObjects(faceMeshes, false);
    if (hits.length > 0) {
      const mesh = hits[0].object;
      highlightFace(mesh);
      if (onFaceSelectCb) onFaceSelectCb(mesh.userData.faceIndex);
    }
  }

  function highlightFace(target) {
    faceMeshes.forEach(m => {
      m.material.emissive = new THREE.Color(0x000000);
    });
    target.material.emissive = new THREE.Color(0x333366);
  }

  // ─── Texture update ───────────────────────────────────────────────────────

  function setFaceTexture(faceIndex, iconCanvas) {
    const mesh = faceMeshes.find(m => m.userData.faceIndex === faceIndex);
    if (!mesh) return;
    if (mesh.material.map) mesh.material.map.dispose();
    const tex = new THREE.CanvasTexture(iconCanvas);
    mesh.material.map = tex;
    mesh.material.color.set(0xffffff);
    mesh.material.needsUpdate = true;
  }

  function clearFaceTexture(faceIndex, color) {
    const mesh = faceMeshes.find(m => m.userData.faceIndex === faceIndex);
    if (!mesh) return;
    if (mesh.material.map) { mesh.material.map.dispose(); mesh.material.map = null; }
    mesh.material.color.set(parseInt(color.replace('#', ''), 16));
    mesh.material.needsUpdate = true;
  }

  // ─── Animation loop ───────────────────────────────────────────────────────

  function animate() {
    animFrameId = requestAnimationFrame(animate);
    if (autoRotating && group) group.rotation.y += 0.005;
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  // ─── Resize ──────────────────────────────────────────────────────────────

  function resize() {
    if (!renderer || !container || !camera) return;
    const W = container.clientWidth;
    const H = Math.min(W, 380);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }

  function getRotation() {
    return group ? { x: group.rotation.x, y: group.rotation.y, z: group.rotation.z } : null;
  }

  function setFrozen(rx, ry, rz) {
    if (!group) return;
    group.rotation.set(rx, ry, rz);
    autoRotating = false;
    manuallyFrozen = true;
  }

  function setUnfrozen() {
    manuallyFrozen = false;
    autoRotating = true;
  }

  return { init, destroy, setFaceTexture, clearFaceTexture, resize, getRotation, setFrozen, setUnfrozen };
})();
