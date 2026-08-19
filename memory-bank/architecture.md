# 架构地图

- `src/config.ts`：姓名、描述、头像路径、统计、链接、关于内容与页面文字的集中配置入口。
- `src/pages/`：参考站式首页、全部项目页、中文 404 和项目静态详情路由。
- `src/components/`：导航、通用项目卡、主题切换与公共页脚。
- `src/content/projects/`：可自由增删的项目 Markdown/MDX；文件名可自动作为 slug。
- `src/content.config.ts`：宽松的通用项目内容 Schema，仅标题和摘要必填。
- `src/lib/projects.ts`：项目 slug 推导和稳定排序。
- `src/styles/global.css`：设计令牌、响应式布局和打印/无障碍规则。
- `public/profile.jpg`：网站和 PDF 生成器共用的可替换头像。
- `public/resume.pdf`：隐私安全的公开简历。
- `public/project-covers/`：两个原创 SVG 项目封面；`public/social-card.svg` 提供分享预览。
- `scripts/build_resume_pdf.py`：从已确认事实生成公开简历，默认读取 `public/profile.jpg`，输出不包含手机号。
- `.github/workflows/deploy.yml`：GitHub Pages 构建部署。
- `memory-bank/`：设计、技术、实施、进度和架构的长期记录。
