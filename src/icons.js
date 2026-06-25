// SVG icon definitions — viewBox 0 0 100 100
// In production, these are rendered to 5000×5000 WebP at 300 DPI
// currentColor is replaced with white (#fff) when rendering to texture

const ICONS = {
  // ─── Cosmic ───────────────────────────────────────────────────────────────
  star: {
    name: { zh: '星星', en: 'Star' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,8 61,35 92,35 68,54 78,82 50,64 22,82 32,54 8,35 39,35" fill="currentColor"/></svg>`,
  },
  moon: {
    name: { zh: '月亮', en: 'Moon' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M62,12 Q28,22 28,50 Q28,78 62,88 Q18,82 14,50 Q10,18 62,12Z" fill="currentColor"/><circle cx="72" cy="28" r="4" fill="currentColor" opacity="0.6"/><circle cx="78" cy="44" r="3" fill="currentColor" opacity="0.4"/></svg>`,
  },
  planet: {
    name: { zh: '星球', en: 'Planet' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="22" fill="currentColor"/><ellipse cx="50" cy="50" rx="45" ry="12" fill="none" stroke="currentColor" stroke-width="4" opacity="0.7" transform="rotate(-20,50,50)"/><ellipse cx="50" cy="50" rx="38" ry="9" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.4" transform="rotate(-20,50,50)"/></svg>`,
  },
  comet: {
    name: { zh: '彗星', en: 'Comet' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="72" cy="28" r="10" fill="currentColor"/><path d="M64,36 Q40,55 10,75" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.8"/><path d="M60,32 Q32,50 8,65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/><path d="M68,40 Q48,60 15,82" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/></svg>`,
  },
  galaxy: {
    name: { zh: '星系', en: 'Galaxy' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,50 Q70,20 90,30 Q75,50 90,70 Q70,80 50,50Z" fill="currentColor" opacity="0.8"/><path d="M50,50 Q30,80 10,70 Q25,50 10,30 Q30,20 50,50Z" fill="currentColor" opacity="0.8"/><circle cx="50" cy="50" r="6" fill="currentColor"/><circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/></svg>`,
  },
  nebula: {
    name: { zh: '星云', en: 'Nebula' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="40" rx="30" ry="18" fill="currentColor" opacity="0.6"/><ellipse cx="40" cy="58" rx="22" ry="14" fill="currentColor" opacity="0.5"/><ellipse cx="62" cy="62" rx="18" ry="12" fill="currentColor" opacity="0.45"/><circle cx="50" cy="45" r="5" fill="currentColor"/><circle cx="38" cy="38" r="2" fill="currentColor"/><circle cx="64" cy="52" r="2" fill="currentColor"/><circle cx="45" cy="62" r="1.5" fill="currentColor"/></svg>`,
  },
  telescope: {
    name: { zh: '望远镜', en: 'Telescope' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="42" y="55" width="8" height="28" rx="2" fill="currentColor"/><rect x="36" y="68" width="20" height="4" rx="2" fill="currentColor"/><rect x="20" y="30" width="56" height="16" rx="8" fill="currentColor" transform="rotate(-25,50,38)"/><rect x="56" y="22" width="30" height="12" rx="5" fill="currentColor" transform="rotate(-25,50,28)"/><circle cx="24" cy="44" r="7" fill="currentColor"/></svg>`,
  },
  rocket: {
    name: { zh: '火箭', en: 'Rocket' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,10 Q62,18 64,42 L50,48 L36,42 Q38,18 50,10Z" fill="currentColor"/><rect x="42" y="42" width="16" height="22" rx="2" fill="currentColor"/><path d="M36,52 L26,68 L42,64Z" fill="currentColor" opacity="0.8"/><path d="M64,52 L74,68 L58,64Z" fill="currentColor" opacity="0.8"/><circle cx="50" cy="32" r="6" fill="currentColor" opacity="0.4"/><path d="M44,64 Q46,74 50,82 Q54,74 56,64Z" fill="currentColor" opacity="0.7"/></svg>`,
  },

  // ─── Forest ───────────────────────────────────────────────────────────────
  tree: {
    name: { zh: '大树', en: 'Tree' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="44" y="68" width="12" height="22" rx="2" fill="currentColor"/><polygon points="50,8 72,40 62,40 78,62 58,62 72,80 28,80 42,62 22,62 38,40 28,40" fill="currentColor"/></svg>`,
  },
  leaf: {
    name: { zh: '树叶', en: 'Leaf' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,88 Q20,50 35,20 Q50,10 65,20 Q80,50 50,88Z" fill="currentColor"/><path d="M50,88 L50,30" stroke="currentColor" stroke-width="2" opacity="0.4"/><path d="M50,70 Q38,60 35,48" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><path d="M50,55 Q62,45 64,34" stroke="currentColor" stroke-width="1.5" opacity="0.4"/></svg>`,
  },
  mushroom: {
    name: { zh: '蘑菇', en: 'Mushroom' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="55" rx="16" ry="24" fill="currentColor" opacity="0.9"/><path d="M15,52 Q18,18 50,14 Q82,18 85,52Z" fill="currentColor"/><circle cx="36" cy="36" r="6" fill="currentColor" opacity="0.4"/><circle cx="58" cy="28" r="5" fill="currentColor" opacity="0.4"/><circle cx="68" cy="42" r="4" fill="currentColor" opacity="0.4"/></svg>`,
  },
  deer: {
    name: { zh: '小鹿', en: 'Deer' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M38,14 L32,8 M38,14 L42,8 M38,14 Q36,22 40,28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M62,14 L68,8 M62,14 L58,8 M62,14 Q64,22 60,28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><ellipse cx="50" cy="42" rx="16" ry="12" fill="currentColor"/><circle cx="50" cy="28" r="10" fill="currentColor"/><circle cx="46" cy="26" r="2" fill="currentColor" opacity="0.3"/><circle cx="54" cy="26" r="2" fill="currentColor" opacity="0.3"/><path d="M36,54 L30,72 M44,56 L42,74 M56,56 L58,74 M64,54 L70,72" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  },
  owl: {
    name: { zh: '猫头鹰', en: 'Owl' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="56" rx="26" ry="30" fill="currentColor"/><circle cx="38" cy="42" r="10" fill="currentColor"/><circle cx="62" cy="42" r="10" fill="currentColor"/><circle cx="38" cy="42" r="6" fill="currentColor" opacity="0.3"/><circle cx="62" cy="42" r="6" fill="currentColor" opacity="0.3"/><polygon points="50,50 46,56 54,56" fill="currentColor" opacity="0.6"/><path d="M30,20 Q38,26 38,32" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M70,20 Q62,26 62,32" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M36,84 L30,92 M64,84 L70,92" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
  },
  flower: {
    name: { zh: '花朵', en: 'Flower' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="28" rx="10" ry="18" fill="currentColor" opacity="0.8"/><ellipse cx="72" cy="38" rx="10" ry="18" fill="currentColor" opacity="0.8" transform="rotate(60,72,38)"/><ellipse cx="72" cy="62" rx="10" ry="18" fill="currentColor" opacity="0.8" transform="rotate(120,72,62)"/><ellipse cx="50" cy="72" rx="10" ry="18" fill="currentColor" opacity="0.8"/><ellipse cx="28" cy="62" rx="10" ry="18" fill="currentColor" opacity="0.8" transform="rotate(60,28,62)"/><ellipse cx="28" cy="38" rx="10" ry="18" fill="currentColor" opacity="0.8" transform="rotate(120,28,38)"/><circle cx="50" cy="50" r="14" fill="currentColor"/></svg>`,
  },
  butterfly: {
    name: { zh: '蝴蝶', en: 'Butterfly' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,50 Q30,20 10,24 Q8,48 30,60 Q42,64 50,50Z" fill="currentColor" opacity="0.9"/><path d="M50,50 Q70,20 90,24 Q92,48 70,60 Q58,64 50,50Z" fill="currentColor" opacity="0.9"/><path d="M50,50 Q35,65 22,86 Q36,80 50,70 Q64,80 78,86 Q65,65 50,50Z" fill="currentColor" opacity="0.7"/><ellipse cx="50" cy="50" rx="3" ry="22" fill="currentColor"/></svg>`,
  },
  river: {
    name: { zh: '河流', en: 'River' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,20 Q30,28 50,22 Q70,16 90,24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M10,40 Q35,50 50,42 Q65,34 90,44" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M10,62 Q28,70 50,64 Q72,58 90,66" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M10,82 Q32,88 50,84 Q68,80 90,86" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity="0.7"/></svg>`,
  },

  // ─── Ocean ────────────────────────────────────────────────────────────────
  wave: {
    name: { zh: '波浪', en: 'Wave' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M5,40 Q20,24 35,40 Q50,56 65,40 Q80,24 95,40" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M5,62 Q20,46 35,62 Q50,78 65,62 Q80,46 95,62" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.7"/><path d="M5,80 Q20,66 35,80 Q50,94 65,80 Q80,66 95,80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity="0.4"/></svg>`,
  },
  fish: {
    name: { zh: '小鱼', en: 'Fish' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M80,50 L62,50 Q60,38 54,30 Q40,32 30,50 Q40,68 54,70 Q60,62 62,50Z" fill="currentColor"/><path d="M80,50 L90,36 L90,64Z" fill="currentColor"/><circle cx="38" cy="46" r="4" fill="currentColor" opacity="0.35"/></svg>`,
  },
  coral: {
    name: { zh: '珊瑚', en: 'Coral' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,88 L50,52" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M50,72 L38,56" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><path d="M50,60 L62,46" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><path d="M50,64 L34,52" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="48" r="7" fill="currentColor"/><circle cx="38" cy="54" r="6" fill="currentColor"/><circle cx="62" cy="44" r="6" fill="currentColor"/><circle cx="34" cy="50" r="5" fill="currentColor"/><ellipse cx="50" cy="90" rx="18" ry="5" fill="currentColor" opacity="0.5"/></svg>`,
  },
  anchor: {
    name: { zh: '锚', en: 'Anchor' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="22" r="8" fill="none" stroke="currentColor" stroke-width="5"/><line x1="50" y1="30" x2="50" y2="80" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><line x1="28" y1="46" x2="72" y2="46" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M28,80 Q28,92 50,92 Q72,92 72,80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="28" cy="46" r="5" fill="currentColor"/><circle cx="72" cy="46" r="5" fill="currentColor"/></svg>`,
  },
  whale: {
    name: { zh: '鲸鱼', en: 'Whale' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,56 Q20,36 50,38 Q82,40 88,56 Q80,70 50,68 Q20,66 10,56Z" fill="currentColor"/><path d="M10,56 L2,44 L16,50Z" fill="currentColor"/><path d="M88,56 Q94,46 96,36 L82,48Z" fill="currentColor" opacity="0.8"/><circle cx="70" cy="50" r="3.5" fill="currentColor" opacity="0.35"/><path d="M58,38 Q62,28 60,22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/></svg>`,
  },
  shell: {
    name: { zh: '贝壳', en: 'Shell' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,88 Q18,70 18,50 Q18,22 50,14 Q82,22 82,50 Q82,70 50,88Z" fill="currentColor"/><path d="M50,88 Q44,60 40,36" stroke="currentColor" stroke-width="2" opacity="0.4" fill="none"/><path d="M50,88 Q56,60 60,36" stroke="currentColor" stroke-width="2" opacity="0.4" fill="none"/><path d="M50,88 Q50,56 50,28" stroke="currentColor" stroke-width="2" opacity="0.4" fill="none"/><path d="M50,88 Q36,62 26,44" stroke="currentColor" stroke-width="1.5" opacity="0.3" fill="none"/><path d="M50,88 Q64,62 74,44" stroke="currentColor" stroke-width="1.5" opacity="0.3" fill="none"/></svg>`,
  },
  lighthouse: {
    name: { zh: '灯塔', en: 'Lighthouse' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="52" width="20" height="34" rx="2" fill="currentColor"/><polygon points="50,12 38,36 62,36" fill="currentColor"/><rect x="36" y="36" width="28" height="18" rx="2" fill="currentColor"/><rect x="38" y="50" width="24" height="4" fill="currentColor" opacity="0.6"/><path d="M26,22 Q12,28 14,36" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.7"/><path d="M74,22 Q88,28 86,36" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.7"/><path d="M50,12 Q38,8 32,14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/><path d="M50,12 Q62,8 68,14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/></svg>`,
  },
  jellyfish: {
    name: { zh: '水母', en: 'Jellyfish' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15,48 Q18,18 50,16 Q82,18 85,48Z" fill="currentColor"/><path d="M28,48 Q26,66 30,80 Q32,86 36,82 Q40,74 38,62" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M40,48 Q40,68 42,84 Q44,90 48,86 Q50,78 48,66" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M50,48 Q52,68 52,84 Q54,90 56,86" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/><path d="M62,48 Q62,68 60,84 Q58,88 54,84" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"/><path d="M72,48 Q74,64 70,80 Q68,86 64,82" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>`,
  },

  // ─── Retro ────────────────────────────────────────────────────────────────
  diamond: {
    name: { zh: '钻石', en: 'Diamond' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 80,38 50,92 20,38" fill="currentColor"/><polygon points="50,10 80,38 50,38 20,38" fill="currentColor" opacity="0.5"/><line x1="50" y1="38" x2="50" y2="92" stroke="currentColor" stroke-width="0.5" opacity="0.3"/><line x1="20" y1="38" x2="50" y2="92" stroke="currentColor" stroke-width="0.5" opacity="0.3"/><line x1="80" y1="38" x2="50" y2="92" stroke="currentColor" stroke-width="0.5" opacity="0.3"/></svg>`,
  },
  crown: {
    name: { zh: '皇冠', en: 'Crown' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="10,70 10,36 30,56 50,16 70,56 90,36 90,70" fill="currentColor"/><rect x="10" y="70" width="80" height="14" rx="4" fill="currentColor"/><circle cx="50" cy="16" r="7" fill="currentColor"/><circle cx="10" cy="36" r="5.5" fill="currentColor"/><circle cx="90" cy="36" r="5.5" fill="currentColor"/></svg>`,
  },
  lightning: {
    name: { zh: '闪电', en: 'Lightning' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="58,8 22,56 46,56 42,92 78,44 54,44" fill="currentColor"/></svg>`,
  },
  fire: {
    name: { zh: '火焰', en: 'Fire' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,92 Q20,78 22,56 Q24,40 34,32 Q30,50 42,52 Q36,38 42,22 Q48,8 50,8 Q52,20 58,28 Q68,20 66,38 Q76,34 78,52 Q82,72 50,92Z" fill="currentColor"/><path d="M50,92 Q34,80 38,66 Q40,58 46,56 Q44,64 50,66 Q56,64 54,56 Q62,60 62,70 Q64,82 50,92Z" fill="currentColor" opacity="0.5"/></svg>`,
  },
  crystal: {
    name: { zh: '水晶', en: 'Crystal' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,8 72,28 72,72 50,92 28,72 28,28" fill="currentColor"/><polygon points="50,8 72,28 50,28 28,28" fill="currentColor" opacity="0.4"/><polygon points="50,8 72,28 50,60" fill="currentColor" opacity="0.3"/><line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" stroke-width="0.8" opacity="0.25"/><line x1="28" y1="28" x2="72" y2="28" stroke="currentColor" stroke-width="0.8" opacity="0.25"/></svg>`,
  },
  rose: {
    name: { zh: '玫瑰', en: 'Rose' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,52 Q34,46 30,32 Q28,20 40,18 Q46,16 50,22 Q54,16 60,18 Q72,20 70,32 Q66,46 50,52Z" fill="currentColor"/><path d="M50,52 Q44,60 44,68 Q44,80 50,88 Q56,80 56,68 Q56,60 50,52Z" fill="currentColor" opacity="0.85"/><path d="M44,74 L30,80" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><path d="M56,70 L70,76" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><path d="M50,52 Q36,56 30,46" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/><path d="M50,52 Q64,56 70,46" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/></svg>`,
  },
  shield: {
    name: { zh: '盾牌', en: 'Shield' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50,8 L88,24 L88,52 Q88,76 50,92 Q12,76 12,52 L12,24Z" fill="currentColor"/><path d="M50,20 L76,32 L76,52 Q76,68 50,80 Q24,68 24,52 L24,32Z" fill="currentColor" opacity="0.4"/><path d="M38,44 L46,52 L62,36" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.6"/></svg>`,
  },
  gem: {
    name: { zh: '宝石', en: 'Gem' },
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,90 14,50 26,14 74,14 86,50" fill="currentColor"/><polygon points="26,14 74,14 86,50 50,30 14,50" fill="currentColor" opacity="0.5"/><polygon points="26,14 50,14 50,30" fill="currentColor" opacity="0.7"/><polygon points="74,14 50,14 50,30" fill="currentColor" opacity="0.3"/><line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="0.8" opacity="0.3"/></svg>`,
  },
};

// Helper: get icon SVG with color replaced
function getIconSVG(iconId, color = '#ffffff') {
  const icon = ICONS[iconId];
  if (!icon) return null;
  return icon.svg.replace(/currentColor/g, color);
}

// Helper: render icon to canvas at given size
function renderIconToCanvas(iconId, size, bgColor, iconColor) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    const svgStr = getIconSVG(iconId, iconColor || '#ffffff');
    if (!svgStr) { resolve(canvas); return; }

    const padding = size * 0.15;
    const iconSize = size - padding * 2;

    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, padding, padding, iconSize, iconSize);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(canvas); };
    img.src = url;
  });
}

if (typeof module !== 'undefined') module.exports = { ICONS, getIconSVG, renderIconToCanvas };
