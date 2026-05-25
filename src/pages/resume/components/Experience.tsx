import { useState } from "react";
import Section from "~/components/Section";
import Panel from "~/components/Panel";
import { resumeData, type ResumeJobId } from "~/data/resume";

export default function Experience() {
  const [activeJob, setActiveJob] = useState<ResumeJobId | null>(null);
  const selectedJob = resumeData.experience.jobs.find((job) => job.id === activeJob);

  return (
    <Section className="flex-col lg:flex-row">
      <div className="flex w-full flex-col">
        {resumeData.experience.jobs.map((job, index) => {
          const isSelected = activeJob === job.id;
          const hasNextJob = index < resumeData.experience.jobs.length - 1;

          return (
            <div key={job.id} className={`${hasNextJob ? "pb-4" : ""} grid grid-cols-[2.75rem_1fr]`}>
              <div
                className="relative flex justify-center"
              >
                <span
                  className={`mt-5 h-4 w-4 rounded-full border-2 transition ${
                    isSelected
                      ? "border-sky-200 bg-indigo-400 shadow-[0_0_0_4px_rgba(99,102,241,0.25)] dark:border-sky-100"
                      : "border-indigo-700 bg-indigo-600 dark:border-white dark:bg-white"
                  }`}
                />
                {hasNextJob ? (
                  <span
                    className="absolute left-1/2 top-9 bottom-[-1rem] w-[3px] -translate-x-1/2 bg-indigo-600 dark:bg-white"
                  />
                ) : null}
              </div>
              <div
                className={`cursor-pointer rounded-lg px-2 py-1 transition ${
                  isSelected
                    ? "bg-indigo-400 bg-opacity-20 ring-1 ring-indigo-400/60"
                    : "hover:bg-indigo-400 hover:bg-opacity-15"
                }`}
                onClick={() => setActiveJob(job.id)}
              >
                <div className="flex flex-col">
                  <span
                    className={`bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl ${
                      isSelected
                        ? "from-violet-200 via-fuchsia-200 to-sky-200"
                        : "from-violet-300 to-indigo-300"
                    }`}
                  >
                    {job.role} at
                    <a
                      className={`ml-2 break-words font-bold underline ${
                        isSelected
                          ? "text-indigo-900 dark:text-sky-100"
                          : "text-indigo-950 dark:text-white"
                      }`}
                      href={job.companyUrl}
                      target="_blank"
                    >
                      {job.company}
                    </a>
                  </span>
                  <span
                    className={`font-bold ${
                      isSelected
                        ? "text-indigo-800 dark:text-sky-100/90"
                        : "text-slate-700 dark:text-white"
                    }`}
                  >
                    {job.period}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Panel className="flex w-full flex-col items-center justify-center gap-5">
        <h2 className="text-2xl font-bold">{resumeData.experience.title}</h2>
        <ul className="exp-list">
          {selectedJob ? (
            <>
              {selectedJob.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </>
          ) : (
            <>{resumeData.experience.emptyState}</>
          )}
        </ul>
      </Panel>
    </Section>
  );
}
