# 作品集更新与发布指南

本文档适用于更新项目 Markdown、首页文字和链接、个人照片或公开简历 PDF。仓库地址为 <https://github.com/lizengsheng/Resume>，线上地址为 <https://lizengsheng.github.io/Resume/>。

## 一、更新前准备

在 PowerShell 中进入项目目录并同步远端：

```powershell
cd C:\Users\19108\Desktop\lizengsheng\Resume
git pull --ff-only
npm ci
```

要求 Node.js 22.19.0 或更高版本，可先运行 `node --version` 查看。`npm ci` 仅在第一次使用、切换电脑或依赖发生变化时需要执行；它会严格按照 `package-lock.json` 安装已验证版本。

## 二、只用 Markdown 更新项目

项目文件位于 `src/content/projects/`。复制 `_project-template.md.example`，将副本改名为小写英文文件名，例如 `my-agent.md`，然后修改 frontmatter 和正文即可。

最小可用项目：

```md
---
title: "项目名称"
summary: "一句话说明问题、方法和结果。"
---

## 项目背景

在这里自由编写 Markdown 正文。
```

只要提交这个 Markdown 文件，首页、全部项目页和项目详情页就会自动更新，不需要修改 Astro 页面或组件。

### 可选字段

| 字段 | 作用 |
| --- | --- |
| `slug` | 固定详情页地址；省略时自动使用文件名 |
| `period` | 项目时间 |
| `tags` | 技术标签数组 |
| `metrics` | 指标数组，每项包含 `value` 和 `label` |
| `cover` | `public/` 下的封面路径，例如 `/project-covers/my-agent.webp` |
| `coverAlt` | 封面替代文字 |
| `featured` | 是否出现在首页，默认 `true` |
| `draft` | 是否隐藏，默认 `false` |
| `order` | 数字越小排序越靠前 |
| `externalUrl` | 可选的代码仓库或演示地址 |

首页“公开项目”数量会从 Markdown 集合自动计算。没有封面时会自动显示文字占位图，没有指标或标签时页面也能正常生成。

### 替换或删除旧项目

- 替换：删除旧 `.md` / `.mdx`，再添加新文件。
- 暂时隐藏：添加 `draft: true`。
- 只从首页移除：添加 `featured: false`，项目仍保留在全部项目页。
- 重命名文件会改变默认 URL；若希望 URL 不变，请明确填写原来的 `slug`。

## 三、更新首页内容或链接

编辑 `src/config.ts`，可以修改：

- 展示名、职业方向、简介和三项事实；
- 邮箱、GitHub、技术博客和简历路径；
- 首页操作文字、个人介绍、技能和教育背景；
- 页脚文字和分享页面描述。

内部静态资源路径以 `/` 开头即可，页面会自动添加 `/Resume` 基路径。外部链接必须写完整的 `https://...` 地址。

首页采用“个人资料 → 精选项目 → 关于”的连续章节，不再使用需要点击切换的标签页。修改项目 Markdown 后，精选项目区会自动更新；修改个人资料或关于内容时只需编辑配置文件。

## 四、更新头像

用新的 JPG 图片覆盖：

```text
public/profile.jpg
```

保持文件名不变，无需修改页面。建议使用接近正方形、主体居中的照片。

## 五、更新公开简历 PDF

将新 PDF 直接覆盖：

```text
public/resume.pdf
```

覆盖前必须确认：

- 文件名仍为 `resume.pdf`；
- 能正常打开、搜索和打印；
- 没有不希望公开的手机号、微信、住址或身份证信息；
- 中文字体无缺失，页面没有裁切或空白页。

如果使用仓库内生成器，可运行：

```powershell
python scripts/build_resume_pdf.py --output public/resume.pdf
```

生成器默认读取 `public/profile.jpg`。如果你直接提供新的 PDF，则不需要运行生成器。

## 六、本地检查

每次修改后至少运行：

```powershell
npm run check
npm run build
```

如果修改了 `package.json` 或 `package-lock.json`，再运行依赖安全审计：

```powershell
npm run audit
```

需要在浏览器检查本地成品时，先在一个终端运行：

```powershell
npm run preview
```

再在另一个终端检查本地链接，地址以预览命令实际输出为准：

```powershell
npm run check:links:strict -- http://localhost:4321/Resume/
```

`mailto:` 链接只能检查邮箱格式，是否能唤起邮件程序取决于电脑是否配置了默认邮件客户端。

## 七、提交、推送和自动部署

验证通过后必须及时提交并推送：

```powershell
git status
git add --all
git commit -m "content: update portfolio"
git push origin main
```

推送 `main` 会自动触发 `.github/workflows/deploy.yml`。工作流会重新安装依赖、构建 Astro、阻止带有高危依赖的版本发布、部署 GitHub Pages，并检查线上站内链接。

等待并查看最新一次部署：

```powershell
gh run list --repo lizengsheng/Resume --workflow deploy.yml --limit 1
gh run watch --repo lizengsheng/Resume --exit-status
```

如果 `gh run watch` 提示需要运行编号，可先从 `gh run list` 中复制编号，再运行：

```powershell
gh run watch <运行编号> --repo lizengsheng/Resume --exit-status
```

部署成功后检查线上链接：

```powershell
npm run check:links:strict -- https://lizengsheng.github.io/Resume/
```

最后打开 <https://lizengsheng.github.io/Resume/>，检查首页文字、项目卡、详情页、头像、简历下载和外部链接。

## 八、常见问题

### 项目没有出现在首页

确认文件扩展名为 `.md` 或 `.mdx`，frontmatter 至少包含 `title` 和 `summary`，并且没有设置 `draft: true` 或 `featured: false`。

### 页面在本地正常，线上图片或 PDF 404

确认文件位于 `public/`，配置或 Markdown 中使用 `/文件名`，不要手写 `/Resume/文件名`；构建时会自动补上基路径。

### Actions 失败

打开 <https://github.com/lizengsheng/Resume/actions>，查看最新的 `Deploy to GitHub Pages`。先修复报错，再提交并推送；不要手工上传 `dist/`。

### 需要回退

优先使用新的修复提交。若必须撤销某次提交，使用 `git revert <提交哈希>`，然后推送 `main`，避免使用会重写远程历史的强制推送。

## 九、发布完成清单

- [ ] `npm run check` 通过
- [ ] `npm run build` 通过
- [ ] 修改依赖时 `npm run audit` 为 0 个漏洞
- [ ] 新项目或修改内容在本地可见
- [ ] PDF 和头像文件可打开
- [ ] 不含不希望公开的隐私信息
- [ ] 已提交并推送 `origin/main`
- [ ] GitHub Actions 部署成功
- [ ] 线上链接检查通过
- [ ] 手机和桌面页面均正常
