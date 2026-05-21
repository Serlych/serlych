import { resumeData } from "~/data/resume";

export type ResumePdfFormat = "one-page" | "full";

type RGB = readonly [number, number, number];
type FontKey = "regular" | "bold" | "italic";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const PAGE_MARGIN = 48;

const COLORS = {
  ink: [0.11, 0.15, 0.22] as RGB,
  muted: [0.36, 0.41, 0.5] as RGB,
  accent: [0.19, 0.31, 0.69] as RGB,
  accentSoft: [0.9, 0.94, 1] as RGB,
  accentMid: [0.59, 0.7, 0.95] as RGB,
  darkBand: [0.08, 0.11, 0.18] as RGB,
  white: [1, 1, 1] as RGB,
  border: [0.84, 0.87, 0.93] as RGB,
  bullet: [0.29, 0.39, 0.78] as RGB,
} as const;

function sanitizePdfText(value: string) {
  return value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .normalize("NFKD")
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code === 0x09 || code === 0x0a || code === 0x0d || (code >= 0x20 && code <= 0x7e);
    })
    .join("")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapePdfString(value: string) {
  return sanitizePdfText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function colorToPdf(color: RGB) {
  return color.map((value) => value.toFixed(3)).join(" ");
}

function charWidth(char: string) {
  if (char === " ") return 0.28;
  if ("ilI.,'`!:;|[]()".includes(char)) return 0.25;
  if ("fjrt".includes(char)) return 0.34;
  if ("mwMW@#%&QG".includes(char)) return 0.82;
  if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)) return 0.68;
  if ("0123456789".includes(char)) return 0.56;
  return 0.53;
}

function measureText(text: string, fontSize: number) {
  return [...sanitizePdfText(text)].reduce((sum, char) => sum + charWidth(char), 0) * fontSize;
}

function breakLongWord(word: string, width: number, fontSize: number) {
  const parts: string[] = [];
  let current = "";

  for (const char of word) {
    const candidate = current + char;
    if (!current || measureText(candidate, fontSize) <= width) {
      current = candidate;
      continue;
    }

    parts.push(current);
    current = char;
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}

function wrapText(text: string, width: number, fontSize: number) {
  const paragraphs = sanitizePdfText(text).split("\n");
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }

    let currentLine = "";
    const words = paragraph.split(/\s+/);

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;

      if (measureText(candidate, fontSize) <= width) {
        currentLine = candidate;
        continue;
      }

      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }

      if (measureText(word, fontSize) <= width) {
        currentLine = word;
        continue;
      }

      const segments = breakLongWord(word, width, fontSize);
      lines.push(...segments.slice(0, -1));
      currentLine = segments[segments.length - 1] ?? "";
    }

    if (currentLine) {
      lines.push(currentLine);
    }
  }

  while (lines[lines.length - 1] === "") {
    lines.pop();
  }

  return lines;
}

function summaryText() {
  return resumeData.about.summary.map((segment) => segment.text).join("");
}

function strongestSkills() {
  return resumeData.technicalExpertise.sections[0].items.map((item) => item.label);
}

function supportingSkills() {
  return resumeData.technicalExpertise.sections[1].items.map((item) => item.label);
}

function onePageHighlights() {
  const jobs = resumeData.experience.jobs;

  return [
    `${jobs[0]?.company}: ${jobs[0]?.achievements[0] ?? ""}`,
    `${jobs[0]?.company}: ${jobs[0]?.achievements[2] ?? ""}`,
    `${jobs[1]?.company}: ${jobs[1]?.achievements[0] ?? ""}`,
    `${jobs[1]?.company}: ${jobs[1]?.achievements[5] ?? ""}`,
    `${jobs[2]?.company}: ${jobs[2]?.achievements[2] ?? ""}`,
  ].filter(Boolean);
}

function educationLines() {
  return resumeData.education.schools.map(
    (school) => `${school.title} in ${school.focus} - ${school.institution}`,
  );
}

function languageLine() {
  return resumeData.education.languages
    .map((language) => `${language.id.toUpperCase()}: ${language.description}`)
    .join("  |  ");
}

function availabilityLine() {
  return [`Located in ${resumeData.footer.location}`, ...resumeData.footer.facts].join("  |  ");
}

class PdfCanvas {
  private readonly pages: string[] = [];

  addPage() {
    this.pages.push("");
  }

  private push(command: string) {
    const pageIndex = this.pages.length - 1;
    this.pages[pageIndex] += `${command}\n`;
  }

  drawRect(x: number, top: number, width: number, height: number, fill: RGB, stroke?: RGB) {
    const pdfY = PAGE_HEIGHT - top - height;
    const fillColor = colorToPdf(fill);

    if (stroke) {
      this.push(
        `q ${fillColor} rg ${colorToPdf(stroke)} RG 1 w ${x.toFixed(2)} ${pdfY.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re B Q`,
      );
      return;
    }

    this.push(
      `q ${fillColor} rg ${x.toFixed(2)} ${pdfY.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re f Q`,
    );
  }

  drawLine(x1: number, top1: number, x2: number, top2: number, color: RGB, width = 1) {
    const pdfY1 = PAGE_HEIGHT - top1;
    const pdfY2 = PAGE_HEIGHT - top2;

    this.push(
      `q ${colorToPdf(color)} RG ${width.toFixed(2)} w ${x1.toFixed(2)} ${pdfY1.toFixed(2)} m ${x2.toFixed(2)} ${pdfY2.toFixed(2)} l S Q`,
    );
  }

  drawText(
    x: number,
    top: number,
    text: string,
    options: { color: RGB; font: FontKey; fontSize: number },
  ) {
    const cleaned = escapePdfString(text);

    if (!cleaned) {
      return;
    }

    const fontName = options.font === "bold" ? "F2" : options.font === "italic" ? "F3" : "F1";
    const pdfY = PAGE_HEIGHT - top - options.fontSize;

    this.push(
      `BT ${colorToPdf(options.color)} rg /${fontName} ${options.fontSize.toFixed(2)} Tf 1 0 0 1 ${x.toFixed(2)} ${pdfY.toFixed(2)} Tm (${cleaned}) Tj ET`,
    );
  }

  build() {
    const pageObjectIds: number[] = [];
    const contentObjectIds: number[] = [];

    let nextObjectId = 6;
    for (let i = 0; i < this.pages.length; i++) {
      pageObjectIds.push(nextObjectId++);
      contentObjectIds.push(nextObjectId++);
    }

    const objects: string[] = [];

    const kids = pageObjectIds.map((id) => `${id} 0 R`).join(" ");
    objects[0] = `<< /Type /Catalog /Pages 2 0 R >>`;
    objects[1] = `<< /Type /Pages /Count ${this.pages.length} /Kids [${kids}] >>`;
    objects[2] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
    objects[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
    objects[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>`;

    for (let i = 0; i < this.pages.length; i++) {
      const content = this.pages[i] ?? "";
      const contentObjectId = contentObjectIds[i];
      const pageObjectId = pageObjectIds[i];

      if (!contentObjectId || !pageObjectId) {
        continue;
      }

      const contentObjectIndex = contentObjectId - 1;
      const pageObjectIndex = pageObjectId - 1;

      objects[contentObjectIndex] = `<< /Length ${Buffer.byteLength(content, "ascii")} >>\nstream\n${content}endstream`;
      objects[pageObjectIndex] =
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +
        `/Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> ` +
        `/Contents ${contentObjectId} 0 R >>`;
    }

    let output = "%PDF-1.4\n%\xFF\xFF\xFF\xFF\n";
    const offsets = [0];

    for (let i = 0; i < objects.length; i++) {
      offsets.push(Buffer.byteLength(output, "binary"));
      output += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(output, "binary");
    output += `xref\n0 ${objects.length + 1}\n`;
    output += "0000000000 65535 f \n";

    for (let i = 1; i < offsets.length; i++) {
      output += `${offsets[i]?.toString().padStart(10, "0")} 00000 n \n`;
    }

    output += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
    output += `startxref\n${xrefOffset}\n%%EOF`;

    return Buffer.from(output, "binary");
  }
}

class ResumePdfLayout {
  private readonly pdf = new PdfCanvas();
  private y = 0;
  private pageCount = 0;

  constructor(private readonly format: ResumePdfFormat) {
    this.startPage(true);
  }

  private startPage(firstPage: boolean) {
    this.pdf.addPage();
    this.pageCount += 1;

    if (firstPage) {
      this.pdf.drawRect(0, 0, PAGE_WIDTH, 112, COLORS.darkBand);
      this.pdf.drawText(PAGE_MARGIN, 28, resumeData.hero.title, {
        color: COLORS.white,
        font: "bold",
        fontSize: 28,
      });
      this.pdf.drawText(PAGE_MARGIN, 62, resumeData.hero.intro, {
        color: COLORS.accentMid,
        font: "bold",
        fontSize: 12,
      });

      const taglineLines = wrapText(resumeData.hero.tagline, PAGE_WIDTH - PAGE_MARGIN * 2 - 110, 10.5);
      let taglineTop = 82;
      for (const line of taglineLines) {
        this.pdf.drawText(PAGE_MARGIN, taglineTop, line, {
          color: COLORS.white,
          font: "regular",
          fontSize: 10.5,
        });
        taglineTop += 13;
      }

      this.pdf.drawText(PAGE_WIDTH - PAGE_MARGIN - 110, 34, this.format === "one-page" ? "ONE PAGE RESUME" : "FULL CV", {
        color: COLORS.accentMid,
        font: "bold",
        fontSize: 10,
      });

      const metaLines = wrapText(availabilityLine(), PAGE_WIDTH - PAGE_MARGIN * 2, 9.2);
      let metaTop = 118;
      for (const line of metaLines) {
        this.pdf.drawText(PAGE_MARGIN, metaTop, line, {
          color: COLORS.muted,
          font: "regular",
          fontSize: 9.2,
        });
        metaTop += 12;
      }
      this.y = metaTop + 18;
      return;
    }

    this.pdf.drawRect(0, 0, PAGE_WIDTH, 42, COLORS.darkBand);
    this.pdf.drawText(PAGE_MARGIN, 15, resumeData.hero.title, {
      color: COLORS.white,
      font: "bold",
      fontSize: 14,
    });
    this.pdf.drawText(PAGE_WIDTH - PAGE_MARGIN - 90, 15, this.format === "one-page" ? "SUMMARY" : "FULL CV", {
      color: COLORS.accentMid,
      font: "bold",
      fontSize: 9,
    });
    this.y = 66;
  }

  private ensureSpace(height: number) {
    if (this.y + height <= PAGE_HEIGHT - PAGE_MARGIN) {
      return;
    }

    this.startPage(false);
  }

  section(title: string) {
    this.ensureSpace(28);
    this.pdf.drawText(PAGE_MARGIN, this.y, title.toUpperCase(), {
      color: COLORS.accent,
      font: "bold",
      fontSize: 11,
    });
    this.pdf.drawLine(PAGE_MARGIN, this.y + 16, PAGE_WIDTH - PAGE_MARGIN, this.y + 16, COLORS.border, 1);
    this.y += 28;
  }

  paragraph(text: string, options?: { fontSize?: number; lineHeight?: number; color?: RGB }) {
    const fontSize = options?.fontSize ?? 10.5;
    const lineHeight = options?.lineHeight ?? fontSize + 3.5;
    const color = options?.color ?? COLORS.ink;
    const lines = wrapText(text, PAGE_WIDTH - PAGE_MARGIN * 2, fontSize);

    for (const line of lines) {
      if (!line) {
        this.y += lineHeight * 0.55;
        continue;
      }

      this.ensureSpace(lineHeight);
      this.pdf.drawText(PAGE_MARGIN, this.y, line, {
        color,
        font: "regular",
        fontSize,
      });
      this.y += lineHeight;
    }

    this.y += 6;
  }

  bulletList(
    items: readonly string[],
    options?: { fontSize?: number; lineHeight?: number; gap?: number; width?: number; x?: number },
  ) {
    const fontSize = options?.fontSize ?? 10.2;
    const lineHeight = options?.lineHeight ?? fontSize + 3.4;
    const gap = options?.gap ?? 5;
    const x = options?.x ?? PAGE_MARGIN;
    const width = options?.width ?? PAGE_WIDTH - PAGE_MARGIN * 2;

    for (const item of items) {
      const lines = wrapText(item, width - 16, fontSize);
      let lineIndex = 0;

      for (const line of lines) {
        this.ensureSpace(lineHeight);

        if (lineIndex === 0) {
          this.pdf.drawRect(x, this.y + 4.5, 5, 5, COLORS.bullet);
        }

        this.pdf.drawText(x + 14, this.y, line, {
          color: COLORS.ink,
          font: "regular",
          fontSize,
        });
        this.y += lineHeight;
        lineIndex += 1;
      }

      this.y += gap;
    }
  }

  strengthGrid(items: readonly string[]) {
    const gap = 14;
    const cardWidth = (PAGE_WIDTH - PAGE_MARGIN * 2 - gap) / 2;
    const cardHeight = 54;

    for (let index = 0; index < items.length; index += 2) {
      this.ensureSpace(cardHeight + gap);

      const row = [items[index], items[index + 1]].filter(
        (item): item is string => typeof item === "string",
      );

      row.forEach((item, rowIndex) => {
        const x = PAGE_MARGIN + rowIndex * (cardWidth + gap);
        this.pdf.drawRect(x, this.y, cardWidth, cardHeight, COLORS.accentSoft, COLORS.border);

        const lines = wrapText(item, cardWidth - 20, 10.5);
        let textTop = this.y + 15;

        for (const line of lines) {
          this.pdf.drawText(x + 10, textTop, line, {
            color: COLORS.ink,
            font: "bold",
            fontSize: 10.5,
          });
          textTop += 13;
        }
      });

      this.y += cardHeight + gap;
    }
  }

  subheading(label: string) {
    this.ensureSpace(16);
    this.pdf.drawText(PAGE_MARGIN, this.y, label, {
      color: COLORS.muted,
      font: "bold",
      fontSize: 9.5,
    });
    this.y += 16;
  }

  experienceJob(job: (typeof resumeData.experience.jobs)[number]) {
    this.ensureSpace(38);
    this.pdf.drawText(PAGE_MARGIN, this.y, `${job.role} | ${job.company}`, {
      color: COLORS.ink,
      font: "bold",
      fontSize: 13,
    });
    this.y += 16;
    this.pdf.drawText(PAGE_MARGIN, this.y, job.period, {
      color: COLORS.muted,
      font: "italic",
      fontSize: 9.5,
    });
    this.y += 16;
    this.bulletList(job.achievements, {
      fontSize: 9.6,
      lineHeight: 12.8,
      gap: 3,
      x: PAGE_MARGIN + 2,
      width: PAGE_WIDTH - PAGE_MARGIN * 2 - 2,
    });
    this.y += 4;
  }

  renderOnePage() {
    this.section("Executive Summary");
    this.paragraph(summaryText(), {
      fontSize: 10.4,
      lineHeight: 14.1,
    });

    this.section("Core Strengths");
    this.strengthGrid(resumeData.superpowers.items);

    this.section("Selected Impact");
    this.bulletList(onePageHighlights(), {
      fontSize: 9.3,
      lineHeight: 12.4,
      gap: 4,
    });

    this.section("Primary Stack");
    this.paragraph(strongestSkills().join("  |  "), {
      fontSize: 9.8,
      lineHeight: 13.2,
    });

    this.section("Education, Languages & Availability");
    this.bulletList(
      [
        ...educationLines(),
        `Languages: ${languageLine()}`,
        availabilityLine(),
      ],
      {
        fontSize: 9.1,
        lineHeight: 12.2,
        gap: 3,
      },
    );
  }

  renderFull() {
    this.section("Profile");
    this.paragraph(summaryText(), {
      fontSize: 10.6,
      lineHeight: 14.4,
    });

    this.section("Core Strengths");
    this.strengthGrid(resumeData.superpowers.items);

    this.section("Professional Experience");
    for (const job of resumeData.experience.jobs) {
      this.experienceJob(job);
    }

    this.section("Technical Expertise");
    this.subheading("Most experienced with");
    this.paragraph(strongestSkills().join(", "), {
      fontSize: 10,
      lineHeight: 13.8,
    });
    this.subheading("Additional tools and platforms");
    this.paragraph(supportingSkills().join(", "), {
      fontSize: 9.8,
      lineHeight: 13.4,
    });

    this.section("Education");
    this.bulletList(educationLines(), {
      fontSize: 9.8,
      lineHeight: 13.2,
      gap: 3,
    });

    this.section("Languages & Availability");
    this.bulletList(
      [
        `Languages: ${languageLine()}`,
        availabilityLine(),
      ],
      {
        fontSize: 9.6,
        lineHeight: 13,
        gap: 3,
      },
    );
  }

  build() {
    if (this.format === "one-page") {
      this.renderOnePage();
    } else {
      this.renderFull();
    }

    return this.pdf.build();
  }
}

export function buildResumePdf(format: ResumePdfFormat) {
  return new ResumePdfLayout(format).build();
}
