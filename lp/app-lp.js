// Landing-page bootstrap — reads URL path, loads audience config, boots app
// URL format: /lp/{audience}/{lang}/{layout}/{theme_pack}/{icon_pack}/

(function () {
  const SUPPORTED_LANGS = ['zh', 'en', 'fr', 'de'];
  const SUPPORTED_LAYOUTS = ['polygon', 'bag', 'comic', 'grid'];

  // Parse URL path segments
  // Vercel: /lp/football/zh/polygon/...  → parts = ['football','zh',...]
  // Local dev direct file: /lp/index.html → strip .html filename, use defaults
  const raw = location.pathname.replace(/^\/lp\/?/, '').replace(/\/$/, '').replace(/index\.html$/, '');
  const parts = raw ? raw.split('/').filter(Boolean) : [];

  const KNOWN_AUDIENCES = ['football', 'office', 'gamer', 'anime'];
  const firstPart = parts[0] || '';
  const audience = KNOWN_AUDIENCES.includes(firstPart) ? firstPart : 'football';
  const lang       = SUPPORTED_LANGS.includes(parts[1]) ? parts[1] : null;
  const layout     = SUPPORTED_LAYOUTS.includes(parts[2]) ? parts[2] : null;
  const themePack  = parts[3] || null;
  const iconPack   = parts[4] || null;

  // Load audience config script, then boot
  const script = document.createElement('script');
  script.src = `/audiences/${audience}/config.js`;
  script.onerror = () => {
    console.warn(`[LP] Audience config not found: ${audience}, using defaults`);
    applyAndBoot(null, lang, layout, themePack, iconPack);
  };
  script.onload = () => {
    try {
      applyAndBoot(window.AUDIENCE || null, lang, layout, themePack, iconPack);
    } catch(e) {
      console.error('[LP] applyAndBoot failed:', e.message, e.stack);
      // Fallback: boot with defaults
      App.boot();
    }
  };
  document.head.appendChild(script);

  function applyAndBoot(audienceCfg, lang, layout, themePack, iconPack) {
    if (audienceCfg) {
      // Resolve defaults from audience config
      const resolvedLang      = lang      || audienceCfg.defaultLang      || 'zh';
      const resolvedLayout    = layout    || audienceCfg.defaultLayout    || 'polygon';
      const resolvedThemePack = themePack || audienceCfg.defaultThemePack || Object.keys(audienceCfg.theme_packs || {})[0];
      const resolvedIconPack  = iconPack  || audienceCfg.defaultIconPack  || Object.keys(audienceCfg.icon_packs || {})[0];

      // Apply language
      CONFIG.app.defaultLang = resolvedLang;

      // Inject audience themes into CONFIG
      const pack = (audienceCfg.theme_packs || {})[resolvedThemePack];
      if (pack && pack.themes) {
        CONFIG.themes = pack.themes;
      }

      // Inject icon pack icons into ICONS global and attach to each theme
      const ipData = (audienceCfg.icon_packs || {})[resolvedIconPack];
      if (ipData && ipData.icons) {
        const iconIds = [];
        ipData.icons.forEach(iconDef => {
          ICONS[iconDef.id] = iconDef;
          iconIds.push(iconDef.id);
        });
        // Give every theme the same icon list from the selected pack
        Object.values(CONFIG.themes).forEach(theme => {
          theme.icons = iconIds;
        });
      }

      // Override popup text if audience has custom copy
      if (audienceCfg.popup) {
        CONFIG.popup.text = audienceCfg.popup;
      }

      // Store resolved params for debug/analytics
      window.LP_PARAMS = {
        audience,
        lang: resolvedLang,
        layout: resolvedLayout,
        themePack: resolvedThemePack,
        iconPack: resolvedIconPack,
      };

      // Update lang switcher buttons to reflect resolved lang
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === resolvedLang);
      });
    }

    // Boot the app (App is already defined by app.js)
    App.boot();
  }
})();
