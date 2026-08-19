from __future__ import annotations

import argparse
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


PAGE_WIDTH, PAGE_HEIGHT = A4
NAVY = colors.HexColor("#173F73")
BLUE = colors.HexColor("#2869B0")
AMBER = colors.HexColor("#F1BD4A")
INK = colors.HexColor("#13233A")
MUTED = colors.HexColor("#52637A")
LINE = colors.HexColor("#DCE3EC")
SOFT = colors.HexColor("#F2F5F9")
WHITE = colors.white


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("MSYH", r"C:\Windows\Fonts\Deng.ttf"))
    pdfmetrics.registerFont(TTFont("MSYH-Bold", r"C:\Windows\Fonts\Dengb.ttf"))
    pdfmetrics.registerFontFamily(
        "MSYH",
        normal="MSYH",
        bold="MSYH-Bold",
        italic="MSYH",
        boldItalic="MSYH-Bold",
    )


BODY = ParagraphStyle(
    "Body",
    fontName="MSYH",
    fontSize=9.2,
    leading=14,
    textColor=MUTED,
    alignment=TA_LEFT,
    spaceAfter=0,
)
BODY_TIGHT = ParagraphStyle(
    "BodyTight",
    parent=BODY,
    fontSize=8.8,
    leading=13.1,
)
SUBHEAD = ParagraphStyle(
    "Subhead",
    parent=BODY,
    fontName="MSYH-Bold",
    fontSize=10.4,
    leading=15,
    textColor=INK,
)
LABEL = ParagraphStyle(
    "Label",
    parent=BODY,
    fontName="MSYH-Bold",
    fontSize=8.1,
    leading=11.8,
    textColor=BLUE,
)


def draw_paragraph(pdf: canvas.Canvas, text: str, style: ParagraphStyle, x: float, y: float, width: float) -> float:
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, PAGE_HEIGHT)
    paragraph.drawOn(pdf, x, y - height)
    return y - height


def draw_section_title(pdf: canvas.Canvas, title: str, x: float, y: float, width: float) -> float:
    pdf.setFillColor(NAVY)
    pdf.setFont("MSYH-Bold", 12)
    pdf.drawString(x, y, title)
    pdf.setStrokeColor(AMBER)
    pdf.setLineWidth(2.2)
    pdf.line(x, y - 6, x + width, y - 6)
    return y - 20


def draw_bullet(pdf: canvas.Canvas, text: str, x: float, y: float, width: float, tight: bool = False) -> float:
    style = BODY_TIGHT if tight else BODY
    return draw_paragraph(pdf, f"- {text}", style, x, y, width) - 4.2


def draw_tag(pdf: canvas.Canvas, text: str, x: float, y: float, width: float) -> None:
    pdf.setFillColor(SOFT)
    pdf.roundRect(x, y - 18, width, 18, 7, stroke=0, fill=1)
    pdf.setFillColor(NAVY)
    pdf.setFont("MSYH-Bold", 7.2)
    pdf.drawCentredString(x + width / 2, y - 12.2, text)


def build_pdf(output_path: Path, portrait_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()

    pdf = canvas.Canvas(str(output_path), pagesize=A4, pageCompression=1)
    pdf.setTitle("Li Zengsheng - 大模型算法公开简历")
    pdf.setAuthor("Li Zengsheng")
    pdf.setSubject("大模型后训练、Agent、Agentic RL 求职简历")
    pdf.setKeywords("大模型后训练, Agent, Agentic RL, SFT, DPO, PPO, GRPO")

    margin = 34
    content_width = PAGE_WIDTH - margin * 2

    # Header
    pdf.setFillColor(SOFT)
    pdf.roundRect(margin, PAGE_HEIGHT - 130, content_width, 98, 18, stroke=0, fill=1)
    pdf.setFillColor(NAVY)
    pdf.setFont("MSYH-Bold", 25)
    pdf.drawString(margin + 20, PAGE_HEIGHT - 66, "Li Zengsheng")
    pdf.setFillColor(BLUE)
    pdf.setFont("MSYH-Bold", 10.5)
    pdf.drawString(margin + 20, PAGE_HEIGHT - 87, "大模型后训练 · Agent · Agentic RL")
    pdf.setFillColor(MUTED)
    pdf.setFont("MSYH", 8.1)
    pdf.drawString(margin + 20, PAGE_HEIGHT - 105, "2027 届硕士 · 大模型算法 · 1910853272@qq.com")
    pdf.drawString(margin + 20, PAGE_HEIGHT - 119, "github.com/lizengsheng")

    photo_width, photo_height = 61, 78
    photo_x = PAGE_WIDTH - margin - photo_width - 18
    photo_y = PAGE_HEIGHT - 120
    pdf.saveState()
    photo = ImageReader(str(portrait_path))
    pdf.drawImage(photo, photo_x, photo_y, photo_width, photo_height, preserveAspectRatio=True, anchor="c", mask="auto")
    pdf.setStrokeColor(LINE)
    pdf.roundRect(photo_x, photo_y, photo_width, photo_height, 9, stroke=1, fill=0)
    pdf.restoreState()

    left_x = margin
    left_width = 164
    gap = 18
    right_x = left_x + left_width + gap
    right_width = content_width - left_width - gap
    start_y = PAGE_HEIGHT - 151

    # Left column
    y = draw_section_title(pdf, "个人概况", left_x, start_y, left_width)
    y = draw_paragraph(
        pdf,
        "2027 届电子信息硕士，人工智能本科背景，聚焦大模型训练数据处理、后训练、RAG 与 Agent 开发。",
        BODY,
        left_x,
        y,
        left_width,
    ) - 13

    y = draw_section_title(pdf, "教育背景", left_x, y, left_width)
    y = draw_paragraph(pdf, "<b>中国科学院大学</b>", SUBHEAD, left_x, y, left_width)
    y = draw_paragraph(pdf, "光电学院 · 电子信息 · 硕士", BODY, left_x, y - 1, left_width)
    y = draw_paragraph(pdf, "2024.09 - 2027.07 · GPA 3.23/4.0", LABEL, left_x, y - 2, left_width) - 8
    y = draw_paragraph(pdf, "<b>南昌大学（211）</b>", SUBHEAD, left_x, y, left_width)
    y = draw_paragraph(pdf, "信息工程学院 · 人工智能 · 本科", BODY, left_x, y - 1, left_width)
    y = draw_paragraph(pdf, "2019.09 - 2023.07 · GPA 2.97/4.0", LABEL, left_x, y - 2, left_width) - 14

    y = draw_section_title(pdf, "核心能力", left_x, y, left_width)
    y = draw_paragraph(pdf, "<b>后训练与强化学习</b>", SUBHEAD, left_x, y, left_width)
    y = draw_paragraph(pdf, "SFT / DPO / PPO / GRPO / RLHF / 奖励设计", BODY_TIGHT, left_x, y - 1, left_width) - 7
    y = draw_paragraph(pdf, "<b>Agent 与检索</b>", SUBHEAD, left_x, y, left_width)
    y = draw_paragraph(pdf, "LangGraph / RAG / GraphRAG / DeepSearch / CoE / 证据链", BODY_TIGHT, left_x, y - 1, left_width) - 7
    y = draw_paragraph(pdf, "<b>工程框架</b>", SUBHEAD, left_x, y, left_width)
    y = draw_paragraph(pdf, "Python / PyTorch / VeRL / vLLM / 向量检索 / 多级缓存", BODY_TIGHT, left_x, y - 1, left_width) - 14

    y = draw_section_title(pdf, "科研与语言", left_x, y, left_width)
    y = draw_paragraph(
        pdf,
        "研究方向为神经形态感内计算、脉冲神经网络，目前有两篇共同第一作者论文在投。",
        BODY,
        left_x,
        y,
        left_width,
    ) - 7
    y = draw_paragraph(pdf, "英语六级 472 · 日语 N5", BODY, left_x, y, left_width) - 15

    y = draw_section_title(pdf, "求职方向", left_x, y, left_width)
    draw_tag(pdf, "大模型后训练", left_x, y, 78)
    draw_tag(pdf, "Agentic RL", left_x + 84, y, 78)
    y -= 25
    draw_tag(pdf, "Multi-Agent", left_x, y, 78)
    draw_tag(pdf, "GraphRAG", left_x + 84, y, 78)
    y -= 27

    # Right column
    yr = draw_section_title(pdf, "项目经历", right_x, start_y, right_width)
    yr = draw_paragraph(pdf, "<b>Medical-Qwen：面向临床诊断的垂直医疗大模型后训练</b>", SUBHEAD, right_x, yr, right_width)
    yr = draw_paragraph(pdf, "2025.12 - 2026.01 · Qwen3-8B-Base / SFT / DPO / PPO / GRPO", LABEL, right_x, yr - 2, right_width) - 4
    yr = draw_bullet(pdf, "召回 20K 高相关样本进行 SFT，医学资格成绩由 72.7% 提升至 81.3%；2K 强负例 DPO 后结构覆盖率由 75% 提升至 82%，医学成绩达到 83.5%。", right_x, yr, right_width, tight=True)
    yr = draw_bullet(pdf, "5K 数据训练医疗问诊分类模型，高危或不确定样本的急症召回率达到 89%。", right_x, yr, right_width, tight=True)
    yr = draw_bullet(pdf, "10K 普通问诊偏好数据进行 PPO：医学成绩 84.2%，病例特征利用率由 68% 提升至 83%，推理错误率由 17% 降至 7%。", right_x, yr, right_width, tight=True)
    yr = draw_bullet(pdf, "20K 急症数据 Construct-SFT + GRPO：无建议措施由 8% 降至 3%，高危未提示由 7% 降至 2%。", right_x, yr, right_width, tight=True) - 7

    yr = draw_paragraph(pdf, "<b>KG-Deepsearch：知识图谱驱动的多 Agent 疾病问诊系统</b>", SUBHEAD, right_x, yr, right_width)
    yr = draw_paragraph(pdf, "2025.09 - 2025.11 · GraphRAG / Qwen3-4B / CoE / LangGraph", LABEL, right_x, yr - 2, right_width) - 4
    yr = draw_bullet(pdf, "字符串召回 + 向量重排进行实体消歧，候选组交并 + LLM 判别进行实体对齐；重复节点由 15% 降至 4%，关系冲突由 8% 降至 2%。", right_x, yr, right_width, tight=True)
    yr = draw_bullet(pdf, "SFT + GRPO 训练 Qwen3-4B 专用抽取模型：关系 F1 由 80.2% 提升至 87.6%，实体 F1 由 86.1% 提升至 89.4%，时延由 3.2s 降至 1s。", right_x, yr, right_width, tight=True)
    yr = draw_bullet(pdf, "结构合法率由 93.8% 提升至 96.5%，真实性由 89.4% 提升至 92.5%。", right_x, yr, right_width, tight=True)
    yr = draw_bullet(pdf, "CoE 逐跳图检索结合动态宽度、证据链跟踪与多级缓存；标答重叠度 F1 由 64% 提升至 72%，推理深度由 58% 提升至 80%。", right_x, yr, right_width, tight=True)
    yr = draw_bullet(pdf, "Plan-Execute-Report 多 Agent 编排：相比 GraphAgent，F1 由 57% 提升至 65%，关系利用率由 44% 提升至 58%；相比 DeepSearchAgent，F1 由 74% 提升至 77%，证据追溯率由 56% 提升至 81%，文档连贯性提升至 92%。", right_x, yr, right_width, tight=True) - 9

    yr = draw_section_title(pdf, "竞赛经历", right_x, yr, right_width)
    yr = draw_paragraph(pdf, "<b>阿里天池 Agent 构建挑战赛</b> · 2026.02 - 2026.03", SUBHEAD, right_x, yr, right_width)
    yr = draw_paragraph(
        pdf,
        "基于 Qwen3.5-Plus 与 IQS 联网搜索工具，使用多轮 DeepSearch 完成结构化分析、检索与证据融合；100 题多跳推理验证集正确率 43.43%，排名前 35%。",
        BODY_TIGHT,
        right_x,
        yr - 2,
        right_width,
    ) - 6

    min_y = min(y, yr)
    if min_y < 39:
        raise RuntimeError(f"Resume content overflowed the page: y={min_y:.1f}")

    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.7)
    pdf.line(margin, 27, PAGE_WIDTH - margin, 27)
    pdf.setFillColor(MUTED)
    pdf.setFont("MSYH", 6.8)
    pdf.drawString(margin, 16, "公开求职简历 · 不含手机号 · 完整项目方法见 lizengsheng.github.io/Resume/")
    pdf.drawRightString(PAGE_WIDTH - margin, 16, "Li Zengsheng")

    pdf.showPage()
    pdf.save()


def main() -> None:
    parser = argparse.ArgumentParser(description="Build the privacy-safe public resume PDF.")
    parser.add_argument("--output", type=Path, default=Path("public/resume.pdf"))
    parser.add_argument("--portrait", type=Path, default=Path("public/profile.jpg"))
    args = parser.parse_args()
    build_pdf(args.output.resolve(), args.portrait.resolve())


if __name__ == "__main__":
    main()
