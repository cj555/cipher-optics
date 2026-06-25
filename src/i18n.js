// Internationalization — zh / en
const I18N = {
  zh: {
    'app.title': 'CipherOptics',
    'app.subtitle': '定制你的专属多面体',
    'step1.label': '选择主题',
    'step1.subtitle': '选择一个主题风格',
    'step2.label': '选择形状',
    'step2.title': '选择多面体',
    'step3.label': '定制设计',
    'step3.title': '定制你的作品',
    'step3.titleHint': '输入标题（最多15字）',
    'step3.hint': '点击多面体的面来选择图标',
    'step3.faceStatus': '已选 {done}/{total} 个面',
    'picker.title': '选择图标',
    'picker.close': '完成',
    'buy.button': '立即购买',
    'buy.title': '选择购买方式',
    'buy.digital': '数字高清图',
    'buy.digital.desc': '即时下载 · 5000×5000 WebP · 300DPI',
    'buy.physical': '实物印花',
    'buy.physical.desc': '定制印刷 · 邮寄到家',
    'buy.processing': '正在跳转支付...',
    'form.emailPlaceholder': '输入你的 Email',
    'form.submit': '预约我的专属位置 →',
    'form.submitting': '提交中...',
    'form.success': '✓ 已收到！我们会尽快联系你',
    'form.error': '提交失败，请重试',
    'back': '← 返回',
    'loading': '生成中...',
    'download': '下载高清图片',
    'rotate.hint': '拖动旋转 · 点击选面',
  },
  en: {
    'app.title': 'CipherOptics',
    'app.subtitle': 'Craft your unique polyhedron',
    'step1.label': 'Theme',
    'step1.subtitle': 'Choose a theme',
    'step2.label': 'Shape',
    'step2.title': 'Choose a polyhedron',
    'step3.label': 'Customize',
    'step3.title': 'Customize your piece',
    'step3.titleHint': 'Enter a title (max 15 chars)',
    'step3.hint': 'Tap a face to choose its icon',
    'step3.faceStatus': '{done}/{total} faces chosen',
    'picker.title': 'Choose an Icon',
    'picker.close': 'Done',
    'buy.button': 'Buy Now',
    'buy.title': 'Choose your purchase',
    'buy.digital': 'Digital HD Image',
    'buy.digital.desc': 'Instant download · 5000×5000 WebP · 300DPI',
    'buy.physical': 'Physical Print',
    'buy.physical.desc': 'Custom printed · Shipped to you',
    'buy.processing': 'Redirecting to payment...',
    'form.emailPlaceholder': 'Your email address',
    'form.submit': 'Reserve my spot →',
    'form.submitting': 'Submitting...',
    'form.success': '✓ Got it! We\'ll reach out soon',
    'form.error': 'Submission failed, please retry',
    'back': '← Back',
    'loading': 'Generating...',
    'download': 'Download HD Image',
    'rotate.hint': 'Drag to rotate · Tap to pick',
  },
};

let currentLang = 'zh';

function t(key, vars) {
  let str = (I18N[currentLang] || I18N.zh)[key] || key;
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.replace(`{${k}}`, vars[k]); });
  }
  return str;
}

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Notify app to re-render dynamic content
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function getLang() { return currentLang; }

if (typeof module !== 'undefined') module.exports = { t, setLang, getLang, I18N };
