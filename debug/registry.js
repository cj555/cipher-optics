// Landing page registry — manually maintain this list as new pages go live
// Status: 'live' | 'dev' | 'paused'
// mode: 'digital' | 'pod' | null (null = show modal with both options)

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
  {
    audience: 'football', audienceLabel: '⚽ 球迷',
    layout: 'polygon', themePack: 'stadium', iconPack: 'sports',
    mode: 'digital',
    langs: ['zh', 'en'],
    status: 'dev',
    note: '直购数字版 — 跳过弹窗直连 Stripe',
  },
  {
    audience: 'football', audienceLabel: '⚽ 球迷',
    layout: 'polygon', themePack: 'stadium', iconPack: 'sports',
    mode: 'pod',
    langs: ['zh', 'en'],
    status: 'dev',
    note: '直达邮件表单 — 跳过弹窗',
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
