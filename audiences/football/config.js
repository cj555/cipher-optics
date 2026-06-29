// Audience config: Football / 球迷
// Loaded dynamically by lp/app-lp.js — runs after config.js is loaded

var AUDIENCE = {
  id: 'football',
  defaultLang: 'zh',
  defaultLayout: 'polygon',
  defaultThemePack: 'stadium',
  defaultIconPack: 'sports',
  layouts: ['polygon'],

  // ─── Theme Packs ────────────────────────────────────────────────────────────
  theme_packs: {
    stadium: {
      name: { zh: '主场之夜', en: 'Stadium Night', fr: 'Nuit du Stade', de: 'Stadionnacht' },
      themes: {
        home: {
          id: 'home',
          name: { zh: '主场蓝', en: 'Home Blue', fr: 'Bleu Domicile', de: 'Heimblau' },
          polygonColor: '#040f1f',
          faceColors: ['#071a38', '#0a2448', '#06152e', '#091e40', '#051228', '#0b2550'],
          accentColor: '#00aaff',
          titleColor: '#cceeff',
          glowColor: '#0077cc',
        },
        away: {
          id: 'away',
          name: { zh: '客场红', en: 'Away Red', fr: 'Rouge Extérieur', de: 'Auswärtsrot' },
          polygonColor: '#1f0404',
          faceColors: ['#3a0a0a', '#480e0e', '#2e0606', '#401010', '#280505', '#501212'],
          accentColor: '#ff3333',
          titleColor: '#ffcccc',
          glowColor: '#cc0000',
        },
        turf: {
          id: 'turf',
          name: { zh: '绿茵草坪', en: 'Green Turf', fr: 'Pelouse Verte', de: 'Grüner Rasen' },
          polygonColor: '#030f03',
          faceColors: ['#071a07', '#0a280a', '#051505', '#082008', '#041204', '#0b2a0b'],
          accentColor: '#44dd44',
          titleColor: '#ccffcc',
          glowColor: '#22aa22',
        },
        gold: {
          id: 'gold',
          name: { zh: '金杯荣耀', en: 'Trophy Gold', fr: 'Or du Trophée', de: 'Pokal-Gold' },
          polygonColor: '#1a1200',
          faceColors: ['#2e2000', '#3a2800', '#261a00', '#342400', '#1e1600', '#402c00'],
          accentColor: '#ffcc00',
          titleColor: '#fff5cc',
          glowColor: '#cc9900',
        },
      },
    },
    retro_kit: {
      name: { zh: '复古球衣', en: 'Retro Kit', fr: 'Maillot Rétro', de: 'Retro-Trikot' },
      themes: {
        classic: {
          id: 'classic',
          name: { zh: '经典黑白', en: 'Classic B&W', fr: 'Classique N&B', de: 'Klassisch S&W' },
          polygonColor: '#0a0a0a',
          faceColors: ['#1a1a1a', '#222222', '#141414', '#1e1e1e', '#0f0f0f', '#252525'],
          accentColor: '#eeeeee',
          titleColor: '#ffffff',
          glowColor: '#aaaaaa',
        },
        vintage_red: {
          id: 'vintage_red',
          name: { zh: '复古暗红', en: 'Vintage Red', fr: 'Rouge Vintage', de: 'Vintage-Rot' },
          polygonColor: '#150303',
          faceColors: ['#280606', '#300808', '#200404', '#2c0707', '#1a0303', '#340909'],
          accentColor: '#cc4422',
          titleColor: '#ffd0c0',
          glowColor: '#992211',
        },
        pitch_green: {
          id: 'pitch_green',
          name: { zh: '复古深绿', en: 'Pitch Green', fr: 'Vert Terrain', de: 'Dunkelgrün' },
          polygonColor: '#021002',
          faceColors: ['#041e04', '#052505', '#031503', '#041f04', '#020d02', '#062806'],
          accentColor: '#33aa33',
          titleColor: '#ccffcc',
          glowColor: '#116611',
        },
        amber: {
          id: 'amber',
          name: { zh: '琥珀橙', en: 'Amber', fr: 'Ambre', de: 'Bernstein' },
          polygonColor: '#160a00',
          faceColors: ['#2a1400', '#331900', '#220f00', '#2e1600', '#1a0c00', '#3a1c00'],
          accentColor: '#ff9900',
          titleColor: '#ffeecc',
          glowColor: '#cc6600',
        },
      },
    },
  },

  // ─── Icon Packs ─────────────────────────────────────────────────────────────
  icon_packs: {
    sports: {
      name: { zh: '运动系列', en: 'Sports', fr: 'Sports', de: 'Sport' },
      // SVG icons inline; raster icons reference /public/assets/icons/football/
      // Replace type:'raster' entries with actual WebP files when available
      icons: [
        {
          id: 'ft_ball', type: 'svg',
          name: { zh: '足球', en: 'Ball', fr: 'Ballon', de: 'Ball' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="4"/><polygon points="50,14 62,38 90,38 68,55 77,80 50,65 23,80 32,55 10,38 38,38" fill="currentColor" opacity="0.15"/><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="3"/><path d="M50,10 L62,36 L90,36" fill="none" stroke="currentColor" stroke-width="3"/><path d="M90,36 L75,58" fill="none" stroke="currentColor" stroke-width="3"/><path d="M75,58 L50,66" fill="none" stroke="currentColor" stroke-width="3"/><path d="M50,66 L25,58" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25,58 L10,36" fill="none" stroke="currentColor" stroke-width="3"/><path d="M10,36 L38,36" fill="none" stroke="currentColor" stroke-width="3"/><path d="M38,36 L50,10" fill="none" stroke="currentColor" stroke-width="3"/><path d="M62,36 L75,58" fill="none" stroke="currentColor" stroke-width="2"/><path d="M38,36 L25,58" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
        },
        {
          id: 'ft_trophy', type: 'svg',
          name: { zh: '奖杯', en: 'Trophy', fr: 'Trophée', de: 'Pokal' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="36" y="74" width="28" height="8" rx="2" fill="currentColor"/><rect x="30" y="82" width="40" height="6" rx="3" fill="currentColor"/><path d="M30,20 L30,52 Q30,68 50,68 Q70,68 70,52 L70,20 Z" fill="currentColor" opacity="0.85"/><path d="M30,26 Q16,26 16,40 Q16,54 30,54" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M70,26 Q84,26 84,40 Q84,54 70,54" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="36" y="68" width="28" height="8" fill="currentColor"/><rect x="28" y="18" width="44" height="6" rx="2" fill="currentColor"/></svg>`,
        },
        {
          id: 'ft_jersey', type: 'svg',
          name: { zh: '球衣', en: 'Jersey', fr: 'Maillot', de: 'Trikot' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20,20 L8,42 L28,48 L28,86 L72,86 L72,48 L92,42 L80,20 Q68,30 50,30 Q32,30 20,20 Z" fill="currentColor"/><path d="M38,20 Q50,34 62,20" fill="none" stroke="currentColor" stroke-width="3" opacity="0.4"/></svg>`,
        },
        {
          id: 'ft_boot', type: 'svg',
          name: { zh: '球鞋', en: 'Boot', fr: 'Chaussure', de: 'Schuh' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15,72 L15,40 Q15,24 30,22 L55,22 L55,42 L70,42 Q85,42 87,56 L87,72 Z" fill="currentColor"/><rect x="13" y="72" width="76" height="10" rx="5" fill="currentColor" opacity="0.7"/><line x1="30" y1="72" x2="30" y2="82" stroke="currentColor" stroke-width="2" opacity="0.5"/><line x1="46" y1="72" x2="46" y2="82" stroke="currentColor" stroke-width="2" opacity="0.5"/><line x1="62" y1="72" x2="62" y2="82" stroke="currentColor" stroke-width="2" opacity="0.5"/><line x1="78" y1="72" x2="78" y2="82" stroke="currentColor" stroke-width="2" opacity="0.5"/></svg>`,
        },
        {
          id: 'ft_whistle', type: 'svg',
          name: { zh: '哨子', en: 'Whistle', fr: 'Sifflet', de: 'Pfeife' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="38" cy="52" r="22" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="38" cy="52" r="10" fill="currentColor" opacity="0.3"/><rect x="56" y="44" width="34" height="16" rx="8" fill="currentColor"/><rect x="44" y="38" width="16" height="10" rx="4" fill="currentColor"/></svg>`,
        },
        {
          id: 'ft_flag', type: 'svg',
          name: { zh: '旗帜', en: 'Flag', fr: 'Drapeau', de: 'Fahne' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="12" width="5" height="76" rx="2" fill="currentColor"/><path d="M29,14 L80,28 L80,58 L29,58 Z" fill="currentColor" opacity="0.85"/></svg>`,
        },
        {
          id: 'ft_medal', type: 'svg',
          name: { zh: '奖牌', en: 'Medal', fr: 'Médaille', de: 'Medaille' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M38,10 L50,8 L62,10 L56,34 L44,34 Z" fill="currentColor"/><circle cx="50" cy="62" r="28" fill="currentColor" opacity="0.9"/><circle cx="50" cy="62" r="20" fill="currentColor" opacity="0.4"/><text x="50" y="68" text-anchor="middle" font-size="18" fill="currentColor" font-weight="bold">1</text></svg>`,
        },
        {
          id: 'ft_stadium', type: 'svg',
          name: { zh: '球场', en: 'Stadium', fr: 'Stade', de: 'Stadion' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="55" rx="42" ry="28" fill="none" stroke="currentColor" stroke-width="5"/><ellipse cx="50" cy="55" rx="24" ry="16" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="27" x2="50" y2="83" stroke="currentColor" stroke-width="3"/><rect x="8" y="30" width="84" height="8" rx="0" fill="currentColor" opacity="0.2"/></svg>`,
        },
      ],
    },
    minimal: {
      name: { zh: '简约系列', en: 'Minimal', fr: 'Minimaliste', de: 'Minimal' },
      icons: [
        {
          id: 'ft_star_min', type: 'svg',
          name: { zh: '星', en: 'Star', fr: 'Étoile', de: 'Stern' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 61,37 90,37 68,57 77,84 50,66 23,84 32,57 10,37 39,37" fill="none" stroke="currentColor" stroke-width="4"/></svg>`,
        },
        {
          id: 'ft_circle_min', type: 'svg',
          name: { zh: '圆', en: 'Circle', fr: 'Cercle', de: 'Kreis' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.3"/></svg>`,
        },
        {
          id: 'ft_num10', type: 'svg',
          name: { zh: '10号', en: 'No.10', fr: 'N°10', de: 'Nr.10' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50" y="70" text-anchor="middle" font-size="52" font-weight="900" fill="currentColor" font-family="sans-serif">10</text></svg>`,
        },
        {
          id: 'ft_lightning', type: 'svg',
          name: { zh: '闪电', en: 'Lightning', fr: 'Éclair', de: 'Blitz' },
          svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M58,10 L28,54 L48,54 L42,90 L72,46 L52,46 Z" fill="currentColor"/></svg>`,
        },
      ],
    },
  },

  // ─── Audience-specific popup text ───────────────────────────────────────────
  popup: {
    zh: `球迷专属！本周的印花通道已被球迷们挤爆了！🏆\n\n不过我们不会让你精心定制的"专属球迷版"就这样消失！\n\n留下你的邮箱，我们会第一时间为你发送专属通道链接，还有一张隐藏的球迷专属9折优惠券！`,
    en: `Fan exclusive! This week's print channel got slammed by fans! 🏆\n\nWe won't let your carefully crafted "fan edition" disappear though!\n\nDrop your email and we'll send you an exclusive access link — plus a hidden fan-only 10% off voucher!`,
    fr: `Exclusivité fans ! Le canal d'impression de cette semaine a été envahi par les fans ! 🏆\n\nNous ne laisserons pas disparaître votre "édition fan" soigneusement créée !\n\nLaissez votre email et nous vous enverrons un lien d'accès exclusif — plus un bon de réduction caché de 10% réservé aux fans !`,
    de: `Fan-Exklusiv! Der Druckkanal dieser Woche wurde von Fans überwältigt! 🏆\n\nWir lassen deine sorgfältig gestaltete "Fan-Edition" nicht verschwinden!\n\nHinterlasse deine E-Mail und wir schicken dir einen exklusiven Zugangslink — plus einen versteckten Fan-Rabuttgutschein über 10%!`,
  },
};

// ─── Merge into global CONFIG ──────────────────────────────────────────────────
// Called by app-lp.js after selecting theme_pack and icon_pack from URL
