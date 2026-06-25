#!/usr/bin/env node
/**
 * Batch HD image generator — reads orders from Supabase, generates 5000×5000 WebP
 *
 * Usage:
 *   node scripts/generate-images.js               # all pending orders
 *   node scripts/generate-images.js --status sent # specific status
 *   node scripts/generate-images.js --id <uuid>   # single order
 *   node scripts/generate-images.js --dry-run     # preview only, no files written
 *
 * Requires:  npm install canvas @supabase/supabase-js dotenv
 * Output:    ./output/<order_id>.webp  (5000×5000, ~300DPI equivalent)
 */

require('dotenv').config({ path: '.env.local' });
const { createCanvas, loadImage, registerFont } = require('canvas');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// ─── Load icon + config definitions from src/ ─────────────────────────────────
// We inline them here so the script is self-contained without a bundler
const CONFIG_THEMES = {
  cosmic: {
    polygonColor: '#0d0d2b', faceColors: ['#1a1a4e','#2d1b6e','#0d2b4e','#1e3a5f','#0a1a3d','#2a1550'],
    accentColor: '#7c3aed', titleColor: '#e0d7ff', glowColor: '#7c3aed',
  },
  forest: {
    polygonColor: '#0a1f0a', faceColors: ['#14321e','#1a4228','#0f2d18','#163824','#112b15','#1c3f22'],
    accentColor: '#22c55e', titleColor: '#d1fae5', glowColor: '#22c55e',
  },
  ocean: {
    polygonColor: '#020c18', faceColors: ['#0c2344','#0e2f5a','#071e3d','#0a2a50','#061830','#0d2a4d'],
    accentColor: '#0ea5e9', titleColor: '#bae6fd', glowColor: '#0ea5e9',
  },
  retro: {
    polygonColor: '#1a0a2e', faceColors: ['#2d0a3d','#3d0a2d','#2a0f3a','#350d35','#280a38','#3a0f30'],
    accentColor: '#f59e0b', titleColor: '#fef3c7', glowColor: '#ec4899',
  },
};

const POLYGON_FACES = { cube: 6, tetrahedron: 4, octahedron: 8 };

// SVG icon paths (subset — same as src/icons.js)
const ICON_SVG = {
  star:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,8 61,35 92,35 68,54 78,82 50,64 22,82 32,54 8,35 39,35" fill="COLOR"/></svg>',
  moon:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M62,12 Q28,22 28,50 Q28,78 62,88 Q18,82 14,50 Q10,18 62,12Z" fill="COLOR"/></svg>',
  planet:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="22" fill="COLOR"/><ellipse cx="50" cy="50" rx="45" ry="12" fill="none" stroke="COLOR" stroke-width="4" opacity="0.7" transform="rotate(-20,50,50)"/></svg>',
  comet:      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="72" cy="28" r="10" fill="COLOR"/><path d="M64,36 Q40,55 10,75" stroke="COLOR" stroke-width="4" stroke-linecap="round" opacity="0.8"/></svg>',
  galaxy:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,50 Q70,20 90,30 Q75,50 90,70 Q70,80 50,50Z" fill="COLOR" opacity="0.8"/><path d="M50,50 Q30,80 10,70 Q25,50 10,30 Q30,20 50,50Z" fill="COLOR" opacity="0.8"/><circle cx="50" cy="50" r="6" fill="COLOR"/></svg>',
  nebula:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="40" rx="30" ry="18" fill="COLOR" opacity="0.6"/><ellipse cx="40" cy="58" rx="22" ry="14" fill="COLOR" opacity="0.5"/><circle cx="50" cy="45" r="5" fill="COLOR"/></svg>',
  telescope:  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="42" y="55" width="8" height="28" rx="2" fill="COLOR"/><rect x="20" y="30" width="56" height="16" rx="8" fill="COLOR" transform="rotate(-25,50,38)"/><circle cx="24" cy="44" r="7" fill="COLOR"/></svg>',
  rocket:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,10 Q62,18 64,42 L50,48 L36,42 Q38,18 50,10Z" fill="COLOR"/><rect x="42" y="42" width="16" height="22" rx="2" fill="COLOR"/><path d="M44,64 Q46,74 50,82 Q54,74 56,64Z" fill="COLOR" opacity="0.7"/></svg>',
  tree:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="44" y="68" width="12" height="22" rx="2" fill="COLOR"/><polygon points="50,8 72,40 62,40 78,62 58,62 72,80 28,80 42,62 22,62 38,40 28,40" fill="COLOR"/></svg>',
  leaf:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,88 Q20,50 35,20 Q50,10 65,20 Q80,50 50,88Z" fill="COLOR"/></svg>',
  mushroom:   '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="55" rx="16" ry="24" fill="COLOR" opacity="0.9"/><path d="M15,52 Q18,18 50,14 Q82,18 85,52Z" fill="COLOR"/></svg>',
  deer:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="42" rx="16" ry="12" fill="COLOR"/><circle cx="50" cy="28" r="10" fill="COLOR"/></svg>',
  owl:        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="56" rx="26" ry="30" fill="COLOR"/><circle cx="38" cy="42" r="10" fill="COLOR"/><circle cx="62" cy="42" r="10" fill="COLOR"/></svg>',
  flower:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="28" rx="10" ry="18" fill="COLOR" opacity="0.8"/><ellipse cx="72" cy="38" rx="10" ry="18" fill="COLOR" opacity="0.8" transform="rotate(60,72,38)"/><ellipse cx="72" cy="62" rx="10" ry="18" fill="COLOR" opacity="0.8" transform="rotate(120,72,62)"/><ellipse cx="50" cy="72" rx="10" ry="18" fill="COLOR" opacity="0.8"/><ellipse cx="28" cy="62" rx="10" ry="18" fill="COLOR" opacity="0.8" transform="rotate(60,28,62)"/><ellipse cx="28" cy="38" rx="10" ry="18" fill="COLOR" opacity="0.8" transform="rotate(120,28,38)"/><circle cx="50" cy="50" r="14" fill="COLOR"/></svg>',
  butterfly:  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,50 Q30,20 10,24 Q8,48 30,60 Q42,64 50,50Z" fill="COLOR" opacity="0.9"/><path d="M50,50 Q70,20 90,24 Q92,48 70,60 Q58,64 50,50Z" fill="COLOR" opacity="0.9"/><ellipse cx="50" cy="50" rx="3" ry="22" fill="COLOR"/></svg>',
  river:      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,40 Q35,50 50,42 Q65,34 90,44" fill="none" stroke="COLOR" stroke-width="6" stroke-linecap="round"/><path d="M10,62 Q28,70 50,64 Q72,58 90,66" fill="none" stroke="COLOR" stroke-width="7" stroke-linecap="round"/></svg>',
  wave:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M5,40 Q20,24 35,40 Q50,56 65,40 Q80,24 95,40" fill="none" stroke="COLOR" stroke-width="7" stroke-linecap="round"/><path d="M5,62 Q20,46 35,62 Q50,78 65,62 Q80,46 95,62" fill="none" stroke="COLOR" stroke-width="6" stroke-linecap="round" opacity="0.7"/></svg>',
  fish:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M80,50 L62,50 Q60,38 54,30 Q40,32 30,50 Q40,68 54,70 Q60,62 62,50Z" fill="COLOR"/><path d="M80,50 L90,36 L90,64Z" fill="COLOR"/></svg>',
  coral:      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,88 L50,52" stroke="COLOR" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="48" r="7" fill="COLOR"/><circle cx="38" cy="54" r="6" fill="COLOR"/><circle cx="62" cy="44" r="6" fill="COLOR"/></svg>',
  anchor:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="22" r="8" fill="none" stroke="COLOR" stroke-width="5"/><line x1="50" y1="30" x2="50" y2="80" stroke="COLOR" stroke-width="5" stroke-linecap="round"/><line x1="28" y1="46" x2="72" y2="46" stroke="COLOR" stroke-width="5" stroke-linecap="round"/><path d="M28,80 Q28,92 50,92 Q72,92 72,80" fill="none" stroke="COLOR" stroke-width="5" stroke-linecap="round"/></svg>',
  whale:      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,56 Q20,36 50,38 Q82,40 88,56 Q80,70 50,68 Q20,66 10,56Z" fill="COLOR"/><path d="M10,56 L2,44 L16,50Z" fill="COLOR"/></svg>',
  shell:      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,88 Q18,70 18,50 Q18,22 50,14 Q82,22 82,50 Q82,70 50,88Z" fill="COLOR"/></svg>',
  lighthouse: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="52" width="20" height="34" rx="2" fill="COLOR"/><polygon points="50,12 38,36 62,36" fill="COLOR"/><rect x="36" y="36" width="28" height="18" rx="2" fill="COLOR"/></svg>',
  jellyfish:  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15,48 Q18,18 50,16 Q82,18 85,48Z" fill="COLOR"/><path d="M28,48 Q26,66 30,80 Q32,86 36,82" stroke="COLOR" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M72,48 Q74,64 70,80 Q68,86 64,82" stroke="COLOR" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>',
  diamond:    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 80,38 50,92 20,38" fill="COLOR"/><polygon points="50,10 80,38 50,38 20,38" fill="COLOR" opacity="0.5"/></svg>',
  crown:      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="10,70 10,36 30,56 50,16 70,56 90,36 90,70" fill="COLOR"/><rect x="10" y="70" width="80" height="14" rx="4" fill="COLOR"/></svg>',
  lightning:  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="58,8 22,56 46,56 42,92 78,44 54,44" fill="COLOR"/></svg>',
  fire:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,92 Q20,78 22,56 Q24,40 34,32 Q30,50 42,52 Q36,38 42,22 Q48,8 50,8 Q52,20 58,28 Q68,20 66,38 Q76,34 78,52 Q82,72 50,92Z" fill="COLOR"/></svg>',
  crystal:    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,8 72,28 72,72 50,92 28,72 28,28" fill="COLOR"/><polygon points="50,8 72,28 50,28 28,28" fill="COLOR" opacity="0.4"/></svg>',
  rose:       '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,52 Q34,46 30,32 Q28,20 40,18 Q46,16 50,22 Q54,16 60,18 Q72,20 70,32 Q66,46 50,52Z" fill="COLOR"/><path d="M50,52 Q44,60 44,68 Q44,80 50,88 Q56,80 56,68 Q56,60 50,52Z" fill="COLOR" opacity="0.85"/></svg>',
  shield:     '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,8 L88,24 L88,52 Q88,76 50,92 Q12,76 12,52 L12,24Z" fill="COLOR"/></svg>',
  gem:        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,90 14,50 26,14 74,14 86,50" fill="COLOR"/><polygon points="26,14 74,14 86,50 50,30 14,50" fill="COLOR" opacity="0.5"/></svg>',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
function lighten(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  const clamp = v => Math.min(255, v + amt);
  return `#${clamp(r).toString(16).padStart(2,'0')}${clamp(g).toString(16).padStart(2,'0')}${clamp(b).toString(16).padStart(2,'0')}`;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r); ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h); ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r); ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y); ctx.closePath();
}

// Render SVG string to a canvas at given size
async function svgToCanvas(svgStr, size) {
  const img = await loadImage(`data:image/svg+xml;base64,${Buffer.from(svgStr).toString('base64')}`);
  const c = createCanvas(size, size);
  c.getContext('2d').drawImage(img, 0, 0, size, size);
  return c;
}

// ─── Core image generator ─────────────────────────────────────────────────────

async function generateOrderImage(order) {
  const SIZE = 5000;
  const theme = CONFIG_THEMES[order.theme];
  if (!theme) throw new Error(`Unknown theme: ${order.theme}`);

  const faceCount = POLYGON_FACES[order.polygon_type] || 6;
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');

  // Background radial gradient
  const grad = ctx.createRadialGradient(SIZE/2, SIZE/2, 0, SIZE/2, SIZE/2, SIZE*0.7);
  grad.addColorStop(0, lighten(theme.polygonColor, 18));
  grad.addColorStop(1, theme.polygonColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Accent glow
  const { r: gr, g: gg, b: gb } = hexToRgb(theme.glowColor);
  const glow = ctx.createRadialGradient(SIZE/2, SIZE/2, 0, SIZE/2, SIZE/2, SIZE*0.38);
  glow.addColorStop(0, `rgba(${gr},${gg},${gb},0.18)`);
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Title
  const titleText = order.title || 'CipherOptics';
  ctx.font = `bold ${Math.round(SIZE * 0.065)}px sans-serif`;
  ctx.fillStyle = theme.titleColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(titleText, SIZE/2, SIZE * 0.09);

  // Polygon label
  const polyLabel = { cube: '正方体', tetrahedron: '四面体', octahedron: '八面体' }[order.polygon_type] || '';
  ctx.font = `${Math.round(SIZE * 0.028)}px sans-serif`;
  const { r: tr, g: tg, b: tb } = hexToRgb(theme.titleColor);
  ctx.fillStyle = `rgba(${tr},${tg},${tb},0.5)`;
  ctx.fillText(polyLabel, SIZE/2, SIZE * 0.145);

  // Face icons grid
  const cols = Math.ceil(Math.sqrt(faceCount));
  const rows = Math.ceil(faceCount / cols);
  const padding = SIZE * 0.025;
  const gridW = SIZE * 0.72;
  const gridH = SIZE * 0.66;
  const startX = (SIZE - gridW) / 2;
  const startY = SIZE * 0.2;
  const cellW = gridW / cols;
  const cellH = gridH / rows;
  const iconSize = Math.floor(Math.min(cellW, cellH) * 0.62);
  const cardRadius = Math.round(SIZE * 0.018);

  // faceIcons may be stored as object with string or number keys
  const faceIcons = typeof order.face_icons === 'string'
    ? JSON.parse(order.face_icons)
    : order.face_icons || {};

  for (let i = 0; i < faceCount; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * cellW;
    const cy = startY + row * cellH;
    const cardW = cellW - padding;
    const cardH = cellH - padding;
    const cardX = cx + padding / 2;
    const cardY = cy + padding / 2;
    const faceColor = theme.faceColors[i % theme.faceColors.length];

    // Card background
    roundRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
    ctx.fillStyle = faceColor;
    ctx.fill();

    // Card border
    ctx.strokeStyle = `rgba(255,255,255,0.1)`;
    ctx.lineWidth = SIZE * 0.002;
    ctx.stroke();

    const iconId = faceIcons[i] || faceIcons[String(i)];
    if (iconId && ICON_SVG[iconId]) {
      const svgStr = ICON_SVG[iconId].replace(/COLOR/g, '#ffffff');
      try {
        const iconCanvas = await svgToCanvas(svgStr, iconSize);
        const iconX = cardX + (cardW - iconSize) / 2;
        const iconY = cardY + (cardH - iconSize) / 2 - cardH * 0.04;
        ctx.drawImage(iconCanvas, iconX, iconY, iconSize, iconSize);
      } catch (e) {
        // Icon render failed — skip silently
        console.warn(`  ⚠  icon render failed for ${iconId}:`, e.message);
      }
    } else {
      // Empty face — draw face number
      ctx.font = `bold ${Math.round(cardH * 0.3)}px sans-serif`;
      ctx.fillStyle = `rgba(255,255,255,0.2)`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), cardX + cardW/2, cardY + cardH/2);
    }
  }

  // Watermark
  ctx.font = `${Math.round(SIZE * 0.022)}px sans-serif`;
  const { r: wr, g: wg, b: wb } = hexToRgb(theme.titleColor);
  ctx.fillStyle = `rgba(${wr},${wg},${wb},0.28)`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CipherOptics.com', SIZE/2, SIZE * 0.955);

  return canvas;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const idFlag = args.indexOf('--id');
  const statusFlag = args.indexOf('--status');
  const targetId = idFlag >= 0 ? args[idFlag + 1] : null;
  const targetStatus = statusFlag >= 0 ? args[statusFlag + 1] : 'pending';

  const outDir = path.join(__dirname, '..', 'output');
  if (!dryRun) fs.mkdirSync(outDir, { recursive: true });

  // Connect to Supabase
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    console.error('❌  Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local');
    process.exit(1);
  }
  const supabase = createClient(url, key);

  // Fetch orders
  let query = supabase.from('orders').select('*');
  if (targetId) {
    query = query.eq('id', targetId);
  } else {
    query = query.eq('status', targetStatus).order('created_at');
  }

  const { data: orders, error } = await query;
  if (error) { console.error('❌  Supabase error:', error.message); process.exit(1); }
  if (!orders.length) { console.log('✓  No orders found.'); return; }

  console.log(`\n🎨  Generating ${orders.length} image(s)  [dry-run=${dryRun}]\n`);

  for (const order of orders) {
    const label = `[${order.id.slice(0,8)}]  ${order.email}  theme=${order.theme}  polygon=${order.polygon_type}`;
    process.stdout.write(`  ${label} … `);

    try {
      const canvas = await generateOrderImage(order);
      const outPath = path.join(outDir, `${order.id}.webp`);

      if (!dryRun) {
        // node-canvas toBuffer with webp
        const buf = canvas.toBuffer('image/png'); // fallback if webp unavailable
        fs.writeFileSync(outPath.replace('.webp', '.png'), buf);
        // Try webp via sharp if installed
        try {
          const sharp = require('sharp');
          await sharp(buf)
            .resize(5000, 5000)
            .webp({ quality: 92 })
            .toFile(outPath);
          fs.unlinkSync(outPath.replace('.webp', '.png'));
          console.log(`✓  ${path.basename(outPath)}  (WebP)`);
        } catch {
          // sharp not installed — keep PNG
          console.log(`✓  ${path.basename(outPath.replace('.webp', '.png'))}  (PNG, install sharp for WebP)`);
        }

        // Mark order as 'sent' in Supabase
        await supabase.from('orders').update({ status: 'sent' }).eq('id', order.id);
      } else {
        console.log('✓  (dry-run, skipped write)');
      }
    } catch (err) {
      console.log(`✗  ERROR: ${err.message}`);
    }
  }

  console.log('\n✅  Done.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
