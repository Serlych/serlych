import type { NextApiRequest, NextApiResponse } from "next";

import { buildResumePdf, type ResumePdfFormat } from "~/server/services/resume/resumePdf";

function parseFormat(value: string | string[] | undefined): ResumePdfFormat {
  if (value === "one-page") {
    return "one-page";
  }

  return "full";
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const format = parseFormat(req.query.format);
  const pdf = buildResumePdf(format);
  const fileName =
    format === "one-page" ? "isaac-chavoya-resume-summary.pdf" : "isaac-chavoya-full-cv.pdf";

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Length", pdf.byteLength);
  res.status(200).send(pdf);
}
