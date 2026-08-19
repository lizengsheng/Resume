# 项目协作约定

- 本项目是部署于 GitHub Pages `/Resume` 子路径的 Astro 静态站点。
- 个人事实只允许来自用户确认的最新版简历，不补造经历、指标、链接或职责。
- 公开产物不得包含手机号、微信或源 DOCX。
- 所有内部链接和 `public/` 资源必须兼容 `import.meta.env.BASE_URL`。
- 保持中文优先、移动端可读、键盘可操作，并在交付前完成生产构建和关键页面视觉检查。
- 完成任何用户授权的本地内容、代码或资源更新后，应在验证通过后提交并推送到 `origin/main`，等待 GitHub Pages 工作流完成，并检查线上页面；只有用户明确要求不推送或远程权限不可用时例外，且必须说明。

## 重要提示

- 每个新的实施轮次首次写代码前，完整阅读 memory-bank/architecture.md 和 memory-bank/design-document.md
- 每完成一个功能批次或里程碑后，集中更新 memory-bank/progress.md
- 仅当重要文件或职责映射发生变化时，更新 memory-bank/architecture.md
