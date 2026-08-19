/**
 * 作品集的可编辑内容入口。
 *
 * 日常更新个人信息时只需要修改此文件；网站头像直接替换
 * public/profile.jpg，项目则在 src/content/projects/ 中增删 Markdown/MDX。
 */
export const siteConfig = {
  site: {
    brand: "Portfolio",
    title: "Li Zengsheng 的个人作品集",
    description: "Li Zengsheng 的大模型算法、Agent 与强化学习个人作品集。",
    socialImage: "/social-card.svg",
  },
  profile: {
    name: "Li Zengsheng",
    headline: "大模型算法 · Agent · 强化学习",
    intro: "聚焦大模型后训练、检索增强与多 Agent 系统，持续记录项目实践与技术思考。",
    avatar: "/profile.jpg",
    avatarAlt: "Li Zengsheng 个人照片",
    facts: [
      { value: "2027", label: "硕士毕业" },
      { value: "", label: "公开项目", source: "projectCount" },
      { value: "Agent", label: "关注方向" },
    ],
  },
  links: {
    email: "1910853272@qq.com",
    github: "https://github.com/lizengsheng",
    blog: "https://lizengsheng.github.io/Blog/",
    resume: "/resume.pdf",
  },
  home: {
    projectsTab: "作品",
    aboutTab: "关于",
    projectsTitle: "项目",
    projectsDescription: "这里展示当前最具代表性的项目。增删项目只需维护项目 Markdown 文件。",
    allProjectsLabel: "查看全部项目",
    maxFeaturedProjects: 4,
  },
  about: {
    title: "关于我",
    paragraphs: [
      "2027 届电子信息硕士，人工智能本科背景，关注大模型后训练、强化学习、知识检索与 Agent 系统。",
      "这个网站用于集中展示我的项目、技术积累和公开简历；项目内容会随着实践持续更新。",
    ],
    skillGroups: [
      {
        title: "模型训练",
        items: ["SFT", "DPO", "PPO", "GRPO", "RLHF", "奖励设计"],
      },
      {
        title: "Agent 与检索",
        items: ["LangGraph", "RAG", "GraphRAG", "DeepSearch", "CoE", "证据链"],
      },
      {
        title: "工程工具",
        items: ["Python", "PyTorch", "VeRL", "vLLM", "向量检索", "多级缓存"],
      },
    ],
    education: [
      {
        school: "中国科学院大学",
        detail: "光电学院 · 电子信息专业 · 硕士",
        period: "2024.09 - 2027.07",
      },
      {
        school: "南昌大学（211）",
        detail: "信息工程学院 · 人工智能专业 · 本科",
        period: "2019.09 - 2023.07",
      },
    ],
  },
  footer: {
    text: "用 Astro 构建 · 持续更新中",
  },
} as const;
