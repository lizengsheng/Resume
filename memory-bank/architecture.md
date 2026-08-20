# 架构地图

- `src/config.ts`：姓名、描述、头像路径、统计、链接、关于内容与页面文字的集中配置入口。
- `src/pages/`：博客同源视觉的连续作品集首页、全部项目页、中文 404 和项目静态详情路由。
- `src/components/`：导航、通用项目卡、主题切换与公共页脚。
- `src/content/projects/`：可自由增删的项目 Markdown/MDX；文件名可自动作为 slug。
- `src/content/projects/_project-template.md.example`：不会参与构建的项目复制模板。
- `src/content.config.ts`：宽松的通用项目内容 Schema，仅标题和摘要必填。
- `src/lib/projects.ts`：项目 slug 推导和稳定排序。
- `src/styles/global.css`：与在线博客同源的明暗设计令牌、窄栏响应式布局、通用 Markdown 正文和无障碍规则。
- `public/profile.jpg`：网站和 PDF 生成器共用的可替换头像。
- `public/resume.pdf`：隐私安全的公开简历。
- `public/project-covers/`：两个原创 SVG 项目封面；`public/social-card.svg` 提供分享预览。
- `scripts/build_resume_pdf.py`：从已确认事实生成公开简历，默认读取 `public/profile.jpg`，输出不包含手机号。
- `scripts/check_site_links.mjs`：递归检查站内 HTML、资源、锚点和外部链接；邮箱链接只做格式检查。
- `.github/workflows/deploy.yml`：GitHub Pages 构建部署。
- `UPDATE_GUIDE.md`：项目、配置、链接、头像、PDF、提交、推送和 Pages 验证的日常操作手册。
- `memory-bank/`：设计、技术、实施、进度和架构的长期记录。
