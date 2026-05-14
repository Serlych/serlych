import { useState } from "react";
import Section from "~/components/Section";
import Panel from "~/components/Panel";
import { resumeData, type ResumeJobId } from "~/data/resume";

export default function Experience() {
  const [activeJob, setActiveJob] = useState<ResumeJobId | null>(null);
  const selectedJob = resumeData.experience.jobs.find((job) => job.id === activeJob);

  return (
    <Section>
      <Panel className="flex w-1/2 flex-col items-center justify-center gap-5">
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
      <div className="flex w-1/2 flex-col">
        {resumeData.experience.jobs.map((job, index) => (
          <div key={job.id}>
            <div
              className="bullet flex cursor-pointer items-center hover:bg-indigo-400 hover:bg-opacity-15"
              onClick={() => setActiveJob(job.id)}
            >
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-4xl font-bold text-transparent">
                  {job.role} at
                  <a
                    className="ml-2 font-bold underline dark:text-white"
                    href={job.companyUrl}
                    target="_blank"
                  >
                    {job.company}
                  </a>
                </span>
                <span className="font-bold">{job.period}</span>
              </div>
            </div>
            {index < resumeData.experience.jobs.length - 1 ? <div className="connector h-0" /> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
