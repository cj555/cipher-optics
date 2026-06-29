// Landing page registry — manually maintain this list as new pages go live
// Status: 'live' | 'dev' | 'paused'

const REGISTRY = [
  {
    audience: 'football', audienceLabel: '⚽ 球迷',
    layout: 'polygon', themePack: 'stadium', iconPack: 'sports',
    langs: ['zh', 'en', 'fr', 'de'],
    status: 'live',
    note: '首个上线人群',
  },
  {
    audience: 'football', audienceLabel: '⚽ 球迷',
    layout: 'polygon', themePack: 'retro_kit', iconPack: 'minimal',
    langs: ['zh', 'en'],
    status: 'dev',
    note: '复古球衣 × 简约icon',
  },
  // 新增人群示例（取消注释并填写）:
  // {
  //   audience: 'office', audienceLabel: '💼 打工人',
  //   layout: 'polygon', themePack: 'corporate', iconPack: 'tools',
  //   langs: ['zh', 'en'],
  //   status: 'dev',
  //   note: '',
  // },
];
