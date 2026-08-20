/**
 * 作品集的可编辑内容入口。
 *
 * 日常更新个人信息时只需要修改此文件；网站头像直接替换
 * public/profile.jpg，项目则在 src/content/projects/ 中增删 Markdown/MDX。
 */
export const siteConfig = {
  site: {
    brand: "Li Zengsheng",
    title: "Li Zengsheng's Resume",
    description: "Li Zengsheng 的大模型后训练、Agent 与 Agentic RL 个人作品集。",
    socialImage: "/social-card.svg",
  },
  profile: {
    name: "Li Zengsheng",
    headline: "大模型后训练 · Agent · Agentic RL",
    intro: "聚焦大模型后训练、Agent 与 Agentic RL，持续记录项目实践与技术思考。",
    avatar: "/profile.jpg",
    avatarAlt: "Li Zengsheng 个人照片",
  },
  links: {
    email: "1910853272@qq.com",
    github: "https://github.com/lizengsheng",
    blog: "https://lizengsheng.github.io/Blog/",
    resume: "/resume.pdf",
  },
  home: {
    resumeLabel: "下载公开简历",
    contactLabel: "联系我",
    projectsTab: "项目",
    aboutTab: "关于",
    allProjectsLabel: "查看全部项目",
    maxFeaturedProjects: 4,
  },
  about: {
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
} as const;
