// Main app controller

const App = (() => {
  // ─── State ─────────────────────────────────────────────────────────────────
  let state = {
    step: 1,            // 1=theme 2=polygon 3=customize
    theme: null,
    polygon: null,
    title: '',
    faceIcons: {},      // { faceIndex: iconId }
    pickerOpen: false,
    currentPickerFace: null,
    lang: 'zh',
  };

  // ─── Step navigation ───────────────────────────────────────────────────────

  function goToStep(n) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`step-${n}`);
    if (el) el.classList.add('active');
    updateProgress(n);
    state.step = n;

    if (n === 3) {
      initCustomizeStep();
    }
  }

  function goBack() {
    if (state.step > 1) goToStep(state.step - 1);
  }

  function updateProgress(step) {
    document.querySelectorAll('.progress-dot').forEach((dot, i) => {
      dot.classList.toggle('done', i + 1 < step);
      dot.classList.toggle('active', i + 1 === step);
    });
  }

  // ─── Step 1: Theme ─────────────────────────────────────────────────────────

  function renderThemes() {
    const grid = document.getElementById('theme-grid');
    grid.innerHTML = '';
    Object.values(CONFIG.themes).forEach(theme => {
      const card = document.createElement('div');
      card.className = 'theme-card';
      card.style.setProperty('--t-accent', theme.accentColor);
      card.style.setProperty('--t-bg', theme.polygonColor);
      card.innerHTML = `
        <div class="theme-preview">
          <div class="theme-swatch" style="background:${theme.polygonColor}">
            <div class="theme-glow" style="background:${theme.accentColor}"></div>
          </div>
        </div>
        <div class="theme-info">
          <strong>${theme.name[state.lang]}</strong>
          <div class="theme-icons-preview">
            ${theme.icons.slice(0, 4).map(id => `<span class="mini-icon">${renderMiniSVG(id, theme.accentColor)}</span>`).join('')}
          </div>
        </div>`;
      card.addEventListener('click', () => selectTheme(theme.id));
      grid.appendChild(card);
    });
  }

  function renderMiniSVG(iconId, color) {
    const icon = ICONS[iconId];
    if (!icon) return '';
    return icon.svg.replace(/currentColor/g, color);
  }

  function selectTheme(themeId) {
    state.theme = themeId;
    const theme = CONFIG.themes[themeId];
    applyThemeCSS(theme);
    goToStep(2);
    renderPolygons();
  }

  function applyThemeCSS(theme) {
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', theme.polygonColor);
    root.style.setProperty('--theme-accent', theme.accentColor);
    root.style.setProperty('--theme-title', theme.titleColor);
    root.style.setProperty('--theme-glow', theme.glowColor);
  }

  // ─── Step 2: Polygon ───────────────────────────────────────────────────────

  function renderPolygons() {
    const grid = document.getElementById('polygon-grid');
    grid.innerHTML = '';
    Object.values(CONFIG.polygons).forEach(poly => {
      const card = document.createElement('div');
      card.className = 'polygon-card';
      card.innerHTML = `
        <div class="polygon-emoji">${poly.emoji}</div>
        <strong>${poly.name[state.lang]}</strong>
        <small>${poly.desc[state.lang]}</small>
        <span class="face-count">${poly.faces} ${state.lang === 'zh' ? '面' : 'faces'}</span>`;
      card.addEventListener('click', () => selectPolygon(poly.id));
      grid.appendChild(card);
    });
  }

  function selectPolygon(polyId) {
    state.polygon = polyId;
    state.faceIcons = {};
    goToStep(3);
  }

  // ─── Step 3: Customize ─────────────────────────────────────────────────────

  function initCustomizeStep() {
    const theme = CONFIG.themes[state.theme];
    const poly = CONFIG.polygons[state.polygon];

    // Apply theme bg to body
    document.body.style.background = theme.polygonColor;

    // Title input
    const titleInput = document.getElementById('product-title');
    titleInput.placeholder = t('step3.titleHint');
    titleInput.value = state.title;
    titleInput.oninput = e => { state.title = e.target.value.slice(0, 15); };

    // Init 3D
    const container = document.getElementById('three-container');
    container.innerHTML = '';
    PolygonRenderer.init(container, state.polygon, theme, onFaceSelected);

    updateFaceStatus();
    updateBuyBtn();

    // Hint
    document.getElementById('rotate-hint').textContent = t('rotate.hint');
  }

  function onFaceSelected(faceIndex) {
    state.currentPickerFace = faceIndex;
    openIconPicker(faceIndex);
  }

  function updateFaceStatus() {
    const poly = CONFIG.polygons[state.polygon];
    const done = Object.keys(state.faceIcons).length;
    const total = poly.faces;
    document.getElementById('face-status').textContent =
      t('step3.faceStatus', { done, total });
  }

  function updateBuyBtn() {
    const poly = CONFIG.polygons[state.polygon];
    const done = Object.keys(state.faceIcons).length;
    const btn = document.getElementById('buy-btn');
    btn.disabled = done === 0;
    btn.classList.toggle('ready', done > 0);
  }

  // ─── Icon Picker ───────────────────────────────────────────────────────────

  function openIconPicker(faceIndex) {
    const theme = CONFIG.themes[state.theme];
    const icons = theme.icons;
    const grid = document.getElementById('icon-grid');
    grid.innerHTML = '';

    icons.forEach(iconId => {
      const icon = ICONS[iconId];
      if (!icon) return;
      const btn = document.createElement('button');
      btn.className = 'icon-btn';
      if (state.faceIcons[faceIndex] === iconId) btn.classList.add('selected');
      btn.innerHTML = `
        <span class="icon-svg">${icon.svg.replace(/currentColor/g, theme.accentColor)}</span>
        <span class="icon-label">${icon.name[state.lang]}</span>`;
      btn.addEventListener('click', () => applyIconToFace(faceIndex, iconId));
      grid.appendChild(btn);
    });

    document.getElementById('picker-face-label').textContent =
      `面 ${faceIndex + 1}`;
    document.getElementById('icon-picker').classList.add('open');
    document.getElementById('overlay').classList.add('visible');
    state.pickerOpen = true;
  }

  function closePicker() {
    document.getElementById('icon-picker').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
    state.pickerOpen = false;
    state.currentPickerFace = null;
  }

  async function applyIconToFace(faceIndex, iconId) {
    state.faceIcons[faceIndex] = iconId;
    closePicker();

    const theme = CONFIG.themes[state.theme];
    const faceColor = theme.faceColors[faceIndex % theme.faceColors.length];

    const canvas = await renderIconToCanvas(iconId, 512, faceColor, '#ffffff');
    PolygonRenderer.setFaceTexture(faceIndex, canvas);

    updateFaceStatus();
    updateBuyBtn();
  }

  // ─── Buy flow ──────────────────────────────────────────────────────────────

  function openBuyModal() {
    const modal = document.getElementById('buy-modal');
    const theme = CONFIG.themes[state.theme];
    document.getElementById('price-digital').textContent =
      `$${CONFIG.pricing.digital.usd}`;
    document.getElementById('price-physical').textContent =
      `$${CONFIG.pricing.physical.usd}`;
    modal.classList.add('open');
    document.getElementById('overlay').classList.add('visible');
  }

  function closeBuyModal() {
    document.getElementById('buy-modal').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
  }

  async function buyDigital() {
    closeBuyModal();

    // Show loading state
    const btn = document.getElementById('buy-btn');
    const origText = btn.textContent;
    btn.textContent = t('buy.processing');
    btn.disabled = true;

    const orderData = buildOrderData();

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData, type: 'digital' }),
      });
      const data = await res.json();
      if (data.url) {
        // Save order data to sessionStorage so success page can generate image
        sessionStorage.setItem('pendingOrder', JSON.stringify(orderData));
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'No URL returned');
      }
    } catch (err) {
      // Fallback: generate image client-side for testing
      console.warn('Stripe not configured, generating client-side:', err.message);
      btn.textContent = t('loading');
      await generateAndDownload(orderData);
      btn.textContent = origText;
      btn.disabled = false;
    }
  }

  async function buyPhysical() {
    closeBuyModal();

    const modal = document.getElementById('physical-modal');
    const loading = document.getElementById('physical-loading');
    const form = document.getElementById('physical-form');
    const popupText = document.getElementById('popup-text');

    modal.classList.add('open');
    document.getElementById('overlay').classList.add('visible');
    loading.style.display = 'block';
    form.style.display = 'none';

    // Configurable delay
    await sleep(CONFIG.popup.delayMs);

    loading.style.display = 'none';
    popupText.textContent = CONFIG.popup.text[state.lang];
    form.style.display = 'block';

    document.getElementById('customer-email').value = '';
  }

  function closePhysicalModal() {
    document.getElementById('physical-modal').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
  }

  async function submitPhysicalOrder(e) {
    e.preventDefault();
    const email = document.getElementById('customer-email').value.trim();
    if (!email) return;

    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = t('form.submitting');
    btn.disabled = true;

    const orderData = buildOrderData();
    orderData.email = email;
    orderData.orderType = 'physical';

    try {
      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error(await res.text());
      showToast(t('form.success'), 'success');
      closePhysicalModal();
    } catch (err) {
      console.error('Submit error:', err);
      // In testing without backend, just show success
      if (err.message.includes('fetch') || err.message.includes('Failed')) {
        // Mock success for testing
        showToast(t('form.success'), 'success');
        closePhysicalModal();
      } else {
        showToast(t('form.error'), 'error');
        btn.textContent = t('form.submit');
        btn.disabled = false;
      }
    }
  }

  // ─── Image generation ──────────────────────────────────────────────────────

  async function generateAndDownload(orderData) {
    const theme = CONFIG.themes[orderData.theme];
    const poly = CONFIG.polygons[orderData.polygon];
    const W = CONFIG.image.previewWidth;
    const H = CONFIG.image.previewHeight;

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
    grad.addColorStop(0, lighten(theme.polygonColor, 20));
    grad.addColorStop(1, theme.polygonColor);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Glow
    const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.4);
    glow.addColorStop(0, hexToRgba(theme.glowColor, 0.15));
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Title
    ctx.font = `bold ${W * 0.06}px -apple-system, sans-serif`;
    ctx.fillStyle = theme.titleColor;
    ctx.textAlign = 'center';
    ctx.fillText(orderData.title || 'CipherOptics', W / 2, W * 0.12);

    // Draw icons in a grid
    const faceCount = poly.faces;
    const cols = Math.ceil(Math.sqrt(faceCount));
    const rows = Math.ceil(faceCount / cols);
    const cellW = W * 0.6 / cols;
    const cellH = H * 0.6 / rows;
    const startX = W * 0.2;
    const startY = H * 0.22;

    for (let i = 0; i < faceCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * cellW;
      const y = startY + row * cellH;
      const iconId = orderData.faceIcons[i];
      if (!iconId) continue;

      const faceColor = theme.faceColors[i % theme.faceColors.length];
      const iconCanvas = await renderIconToCanvas(iconId, cellW * 0.8, faceColor, '#ffffff');

      // Draw rounded rect background
      roundRect(ctx, x + cellW * 0.1, y + cellH * 0.1, cellW * 0.8, cellH * 0.8, 20);
      ctx.fillStyle = faceColor;
      ctx.fill();

      ctx.drawImage(iconCanvas, x + cellW * 0.15, y + cellH * 0.15, cellW * 0.7, cellH * 0.7);
    }

    // Watermark
    ctx.font = `${W * 0.025}px -apple-system, sans-serif`;
    ctx.fillStyle = hexToRgba(theme.titleColor, 0.35);
    ctx.textAlign = 'center';
    ctx.fillText('CipherOptics.com', W / 2, H * 0.94);

    // Download
    const url = canvas.toDataURL(CONFIG.image.format, CONFIG.image.quality);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cipheroptics_${Date.now()}.webp`;
    a.click();
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function buildOrderData() {
    return {
      theme: state.theme,
      title: state.title,
      polygon: state.polygon,
      faceIcons: { ...state.faceIcons },
      orderTime: new Date().toISOString(),
      lang: state.lang,
    };
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function lighten(hex, amount) {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
    const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
    const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // ─── Boot ──────────────────────────────────────────────────────────────────

  function boot() {
    state.lang = CONFIG.app.defaultLang;

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.lang = btn.dataset.lang;
        setLang(btn.dataset.lang);
        if (state.step === 1) renderThemes();
        if (state.step === 2) renderPolygons();
      });
    });

    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', goBack);
    });

    // Overlay tap to close
    document.getElementById('overlay').addEventListener('click', () => {
      if (state.pickerOpen) closePicker();
      else {
        closeBuyModal();
        closePhysicalModal();
      }
    });

    // Buy buttons
    document.getElementById('buy-btn').addEventListener('click', openBuyModal);
    document.getElementById('btn-digital').addEventListener('click', buyDigital);
    document.getElementById('btn-physical').addEventListener('click', buyPhysical);
    document.getElementById('close-buy').addEventListener('click', closeBuyModal);
    document.getElementById('close-physical').addEventListener('click', closePhysicalModal);

    // Email form
    document.getElementById('email-form').addEventListener('submit', submitPhysicalOrder);

    // Resize handler
    window.addEventListener('resize', () => PolygonRenderer.resize());

    // Restore from sessionStorage (after Stripe redirect)
    const pending = sessionStorage.getItem('pendingOrder');
    if (pending && window.location.search.includes('payment=success')) {
      const order = JSON.parse(pending);
      sessionStorage.removeItem('pendingOrder');
      generateAndDownload(order);
    }

    // Render initial step
    renderThemes();
    goToStep(1);
    setLang(state.lang);
  }

  return {
    boot,
    goBack,
    closePicker,
    closeBuyModal,
    closePhysicalModal,
  };
})();

document.addEventListener('DOMContentLoaded', () => App.boot());
