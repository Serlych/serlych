"use client";

import { useState } from "react";

import Panel from "~/components/Panel";

type ResumePdfFormat = "one-page" | "full";

const optionCopy: Record<
  ResumePdfFormat,
  { fileName: string; title: string; description: string }
> = {
  "one-page": {
    fileName: "isaac-chavoya-resume-summary.pdf",
    title: "1 pager",
    description: "Highlights, executive summary, core strengths, primary stack.",
  },
  full: {
    fileName: "isaac-chavoya-full-cv.pdf",
    title: "Full CV",
    description: "Full experience, achievements, technical expertise, education.",
  },
};

export default function ResumeDownloadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<ResumePdfFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function downloadResume(format: ResumePdfFormat) {
    try {
      setDownloadingFormat(format);
      setError(null);

      const response = await fetch(`/api/resume-pdf?format=${format}`);
      if (!response.ok) {
        throw new Error(`Failed to generate ${format} resume PDF.`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = optionCopy[format].fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
      setIsOpen(false);
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "Failed to download resume.");
    } finally {
      setDownloadingFormat(null);
    }
  }

  return (
    <div className="relative flex flex-col items-start gap-4">
      <button
        type="button"
        className="rounded-lg border border-violet-300 bg-white/70 px-5 py-3 text-lg font-semibold text-violet-900 backdrop-blur-sm transition hover:bg-violet-100 dark:bg-white/10 dark:text-violet-200 dark:hover:bg-white/15 sm:text-xl"
        onClick={() => setIsOpen((value) => !value)}
      >
        Download resume
      </button>
      {isOpen ? (
        <Panel className="flex w-full max-w-xl flex-col gap-4 p-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/60">
              Export PDF
            </span>
            <p className="text-sm text-slate-700 dark:text-white/75 sm:text-base">
              Choose concise summary or full CV. Both files are generated from `src/data/resume.ts`.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["one-page", "full"] as const).map((format) => (
              <button
                key={format}
                type="button"
                className="flex flex-col items-start gap-2 rounded-lg border border-slate-300 bg-white/70 px-4 py-4 text-left transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
                disabled={downloadingFormat !== null}
                onClick={() => void downloadResume(format)}
              >
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {downloadingFormat === format ? "Generating..." : optionCopy[format].title}
                </span>
                <span className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
                  {optionCopy[format].description}
                </span>
              </button>
            ))}
          </div>
          {error ? <p className="text-sm text-red-500 dark:text-red-300">{error}</p> : null}
        </Panel>
      ) : null}
    </div>
  );
}
