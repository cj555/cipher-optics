// All configurable settings for the app
const CONFIG = {
  // ─── Themes ───────────────────────────────────────────────────────────────
  themes: {
    cosmic: {
      id: 'cosmic',
      name: { zh: '宇宙星辰', en: 'Cosmic' },
      polygonColor: '#0d0d2b',
      faceColors: ['#1a1a4e', '#2d1b6e', '#0d2b4e', '#1e3a5f', '#0a1a3d', '#2a1550'],
      accentColor: '#7c3aed',
      titleColor: '#e0d7ff',
      glowColor: '#7c3aed',
      icons: ['star', 'moon', 'planet', 'comet', 'galaxy', 'nebula', 'telescope', 'rocket'],
    },
    forest: {
      id: 'forest',
      name: { zh: '森林精灵', en: 'Forest' },
      polygonColor: '#0a1f0a',
      faceColors: ['#14321e', '#1a4228', '#0f2d18', '#163824', '#112b15', '#1c3f22'],
      accentColor: '#22c55e',
      titleColor: '#d1fae5',
      glowColor: '#22c55e',
      icons: ['tree', 'leaf', 'mushroom', 'deer', 'owl', 'flower', 'butterfly', 'river'],
    },
    ocean: {
      id: 'ocean',
      name: { zh: '深海幻境', en: 'Ocean' },
      polygonColor: '#020c18',
      faceColors: ['#0c2344', '#0e2f5a', '#071e3d', '#0a2a50', '#061830', '#0d2a4d'],
      accentColor: '#0ea5e9',
      titleColor: '#bae6fd',
      glowColor: '#0ea5e9',
      icons: ['wave', 'fish', 'coral', 'anchor', 'whale', 'shell', 'lighthouse', 'jellyfish'],
    },
    retro: {
      id: 'retro',
      name: { zh: '复古霓虹', en: 'Retro' },
      polygonColor: '#1a0a2e',
      faceColors: ['#2d0a3d', '#3d0a2d', '#2a0f3a', '#350d35', '#280a38', '#3a0f30'],
      accentColor: '#f59e0b',
      titleColor: '#fef3c7',
      glowColor: '#ec4899',
      icons: ['diamond', 'crown', 'lightning', 'fire', 'crystal', 'rose', 'shield', 'gem'],
    },
  },

  // ─── Polygons ─────────────────────────────────────────────────────────────
  polygons: {
    cube: {
      id: 'cube',
      name: { zh: '正方体', en: 'Cube' },
      faces: 6,
      emoji: '⬛',
      desc: { zh: '6个面，稳重大方', en: '6 faces, bold & balanced' },
    },
    tetrahedron: {
      id: 'tetrahedron',
      name: { zh: '四面体', en: 'Tetrahedron' },
      faces: 4,
      emoji: '🔺',
      desc: { zh: '4个面，简约锐利', en: '4 faces, sharp & minimal' },
    },
    octahedron: {
      id: 'octahedron',
      name: { zh: '八面体', en: 'Octahedron' },
      faces: 8,
      emoji: '💎',
      desc: { zh: '8个面，璀璨如钻', en: '8 faces, brilliant like a gem' },
    },
  },

  // ─── Pricing ──────────────────────────────────────────────────────────────
  pricing: {
    digital: { usd: 9.99, cny: 72 },
    physical: { usd: 29.99, cny: 218 },
  },

  // ─── Physical Order Popup ─────────────────────────────────────────────────
  popup: {
    delayMs: 1800,
    text: {
      zh: `Oh No! 本周的印花服务器已被开黑玩家彻底挤爆了！🤯\n\n我们不得不暂时关闭了即时结账通道。但是，我们不能让你刚刚花费心血制作的"专属说明书"在数据库里白白蒸发！\n\n请在下方留下你的真实 Email。一旦周五深夜的云端排队通道为你腾出空间，我们将免费为您合成高清大图，并专门为您发放一封专属通道链接，顺便附赠一张隐藏的 9 折补偿代金券！`,
      en: `Oh No! This week's print servers got completely slammed by a flood of orders! 🤯\n\nWe've had to temporarily close the instant checkout channel. But we can't let the "custom masterpiece" you just crafted disappear into the void!\n\nDrop your real Email below. Once our Friday night cloud queue opens a slot for you, we'll synthesize your HD image for free and send you a private channel link — plus a hidden 10% off voucher as compensation!`,
    },
  },

  // ─── Image Generation ─────────────────────────────────────────────────────
  image: {
    width: 5000,
    height: 5000,
    dpi: 300,
    format: 'image/webp',
    quality: 0.92,
    // For testing, generate at lower resolution
    previewWidth: 1200,
    previewHeight: 1200,
  },

  // ─── App Meta ─────────────────────────────────────────────────────────────
  app: {
    name: 'CipherOptics',
    defaultLang: 'zh',
    supportedLangs: ['zh', 'en'],
  },
};

if (typeof module !== 'undefined') module.exports = CONFIG;
