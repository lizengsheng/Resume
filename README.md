# Li Zengsheng's Resume

基于 `simple-portfolio` 组件基础改造、并以个人[技术博客](https://lizengsheng.github.io/Blog/)为视觉基准的中文求职作品集。首页采用连续可滚动的资料、精选项目与关于章节；项目内容由 Markdown/MDX 自动生成，并提供公开简历 PDF 下载。

在线地址：<https://lizengsheng.github.io/Resume/>。首页顶部导航、首屏和联系区均提供[技术博客](https://lizengsheng.github.io/Blog/)入口。

日常更新项目、页面内容、链接、头像或简历 PDF，请直接参考 [`UPDATE_GUIDE.md`](UPDATE_GUIDE.md)。该文档同时包含本地检查、Git 提交、远程推送和 GitHub Pages 验证步骤。

## 页面

- `/Resume/`：求职首页。
- `/Resume/projects/`：全部项目。
- `/Resume/projects/medical-qwen/`：Medical-Qwen 项目详情。
- `/Resume/projects/kg-deepsearch/`：KG-Deepsearch 项目详情。
- `/Resume/resume.pdf`：不含手机号的公开简历。

## 本地开发

要求 Node.js 22.19.0 或更高版本。Astro 7 及其网络依赖不再支持旧版 Node；建议安装 Node 22 的最新维护版本。

```bash
npm ci
npm run dev
```

访问终端输出的本地地址。生产检查与构建：

```bash
npm run check
npm run build
npm run audit
npm run preview
```

## 最常用的三处修改

### 1. 修改个人信息和页面文字

编辑 `src/config.ts`。姓名、职业描述、个人简介、三项统计、邮箱、GitHub、博客、首页标题、关于内容、技能和教育背景均集中在这里，不需要修改 Astro 页面。

### 2. 替换个人照片

直接用新的 JPG 文件覆盖 `public/profile.jpg`，保持文件名不变即可。网站和 PDF 生成脚本默认共用这张照片。

### 3. 增删项目

在 `src/content/projects/` 中新增、删除或修改 `.md` / `.mdx` 文件。文件名会在未填写 `slug` 时自动成为页面地址，例如 `my-agent.md` 会生成 `/Resume/projects/my-agent/`。

最小项目示例：

```md
---
title: "项目名称"
summary: "一句话说明项目解决的问题。"
tags: [Python, Agent]
featured: true
---

## 项目背景

在这里自由编写 Markdown 正文。
```

可选字段包括 `slug`、`period`、`cover`、`coverAlt`、`metrics`、`featured`、`draft`、`order` 和 `externalUrl`。`cover` 建议指向 `public/` 中的图片，例如 `/project-covers/example.webp`；`draft: true` 的项目不会构建，`featured: false` 的项目只出现在“全部项目”页。

项目 Schema 位于 `src/content.config.ts`，全局样式位于 `src/styles/global.css`。站点只保留实际使用的 Astro、MDX 与 Sitemap 依赖，不依赖 React 或 Tailwind。修改简历事实时，应同时更新网站配置和 PDF 生成器，并确认仓库中没有手机号或微信。

重新生成公开简历：

```powershell
python scripts/build_resume_pdf.py --output public/resume.pdf
```

## GitHub Pages 部署

1. 在 GitHub 创建 `lizengsheng/Resume` 仓库并推送本项目到 `main` 分支。
2. 打开仓库的 **Settings → Pages**。
3. 将 **Build and deployment / Source** 设置为 **GitHub Actions**。
4. 推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建和部署；也可从 Actions 页面手动触发。

Astro 已配置：

- `site: "https://lizengsheng.github.io"`
- `base: "/Resume"`
- `trailingSlash: "always"`

因此站内页面、图片和 PDF 链接都按 GitHub Pages 项目子路径生成。

## 隐私约束

- 源 DOCX 不进入仓库。
- 网页与公开 PDF 不包含手机号、微信或不存在的项目链接。
- 邮箱和 GitHub 是公开联系入口。

## 许可与来源

本项目基于 [vito8916/simple-portfolio](https://github.com/vito8916/simple-portfolio) 改造，保留原项目的 MIT `LICENSE`。当前视觉以 [Li Zengsheng 的技术博客](https://lizengsheng.github.io/Blog/)为基准，统一使用窄栏排版、系统中文字体、细分隔线及同源明暗配色；功能仍是招聘作品集，不包含文章、搜索、标签或归档系统。
