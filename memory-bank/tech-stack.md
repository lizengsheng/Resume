# 技术栈

- 应用框架：Astro 7 静态输出，Node.js 22.19+。
- 组件与内容：Astro 组件、TypeScript、MDX 内容集合；不加载未使用的客户端 UI 框架。
- 样式：轻量全局 CSS 与 CSS 变量，自托管系统中文字体栈，无 Tailwind、无远程字体。
- 后端、存储、认证：无。
- 资源：`public/profile.jpg` 作为可直接覆盖的头像；项目封面使用 `public/` 静态资源，字段可省略。
- 简历：ReportLab 生成公开 PDF，Poppler/渲染工具做逐页视觉验证。
- 部署：GitHub Actions + GitHub Pages，站点基路径 `/Resume`。
- 验证：`npm audit`、`astro check`、`astro build`、构建产物链接/隐私检查、桌面与移动端截图检查。
