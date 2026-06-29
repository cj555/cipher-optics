# 新增人群落地页 Checklist

复制本文件，将 `SLUG` 替换为新人群的英文标识（如 `office`、`gamer`、`anime`）。

---

## 第一步：创建人群配置

- [ ] 复制 `audiences/football/config.js` → `audiences/SLUG/config.js`
- [ ] 修改 `AUDIENCE.id` = `'SLUG'`
- [ ] 修改 `AUDIENCE.defaultLang`（目标语言，如 `'zh'`）
- [ ] 修改 `AUDIENCE.defaultThemePack`（默认主题包名）
- [ ] 修改 `AUDIENCE.defaultIconPack`（默认 icon 包名）
- [ ] 编写 `theme_packs`：
  - [ ] 至少 2 个主题包，每包 4 套配色
  - [ ] 每套配色填写：`polygonColor` / `faceColors` / `accentColor` / `titleColor` / `glowColor`
  - [ ] 每套配色的 `name` 字段填写 zh / en / fr / de 四语言
- [ ] 编写 `icon_packs`：
  - [ ] 至少 1 个 icon 包，每包 6–8 个 icon
  - [ ] SVG icon：直接写 `svg` 字段（用 `currentColor` 代替颜色）
  - [ ] Raster icon：写 `type: 'raster'`，`src` 指向 `/public/assets/icons/SLUG/xxx.webp`
  - [ ] 每个 icon 填写 `name`：zh / en / fr / de
- [ ] 编写人群专属 `popup` 文案（zh / en / fr / de）

---

## 第二步：准备图标资源（如有 raster icon）

- [ ] 创建目录 `public/assets/icons/SLUG/`
- [ ] 放入 WebP 图标文件（建议 512×512，透明背景）
- [ ] 在 `config.js` 的 icon 定义中确认 `src` 路径正确

---

## 第三步：注册路由

- [ ] 打开 `vercel.json`
- [ ] 在 `/lp/app-lp\.js` 规则之后，`/(.*)`规则之前，确认通配路由已覆盖（当前的正则已自动支持，无需新增条目）
- [ ] 打开 `lp/app-lp.js`
- [ ] 在 `KNOWN_AUDIENCES` 数组中添加 `'SLUG'`

---

## 第四步：注册到调试面板

- [ ] 打开 `debug/registry.js`
- [ ] 添加一条记录（参考现有格式）：
  ```js
  {
    audience: 'SLUG', audienceLabel: '🎯 人群名称',
    layout: 'polygon', themePack: 'default_pack', iconPack: 'default_icons',
    langs: ['zh', 'en'],   // 已准备好的语言
    status: 'dev',         // 上线前用 'dev'，上线后改为 'live'
    note: '简短备注',
  },
  ```

---

## 第五步：本地验证

- [ ] 启动 `vercel dev`（`npm start` 若已配置）
- [ ] 访问 `http://localhost:3000/debug/index.html` 确认新条目出现
- [ ] 点击链接跳转，确认落地页正常加载
- [ ] 检查主题配色正确
- [ ] 检查 icon 正确显示（包括 raster icon）
- [ ] 点击主题 → 选多面体 → 点击面选 icon，确认流程通畅
- [ ] 检查 popup 文案正确
- [ ] 测试所有已配置的语言版本（逐一访问对应 URL）

---

## 第六步：上线

- [ ] 将 `debug/registry.js` 中该条目的 `status` 改为 `'live'`
- [ ] 提交所有文件到 git
- [ ] 推送到 Vercel（`git push`）
- [ ] 在生产环境访问完整 URL 再次验证

---

## URL 格式参考

```
/lp/SLUG/zh/polygon/THEME_PACK/ICON_PACK/
/lp/SLUG/en/polygon/THEME_PACK/ICON_PACK/
/lp/SLUG/fr/polygon/THEME_PACK/ICON_PACK/
/lp/SLUG/de/polygon/THEME_PACK/ICON_PACK/
```

---

## 文件改动汇总

| 文件 | 操作 |
|------|------|
| `audiences/SLUG/config.js` | 新建 |
| `public/assets/icons/SLUG/` | 新建目录 + 图标文件 |
| `lp/app-lp.js` | 在 `KNOWN_AUDIENCES` 加一项 |
| `debug/registry.js` | 加一条记录 |
