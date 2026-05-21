import Section from "~/components/Section";
import { resumeData } from "~/data/resume";
import ResumeDownloadButton from "~/pages/resume/components/ResumeDownloadButton";

export default function Hero() {
  return (
    <Section className="flex-col gap-8 pb-16 pt-56 sm:gap-10 sm:pb-20 sm:pt-64 lg:flex-col lg:gap-14 lg:pt-72">
      <h1 className="break-words bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text pb-2 font-mono text-4xl leading-[1.05] text-transparent sm:text-6xl lg:text-9xl">
        {resumeData.hero.title}
      </h1>
      <div className="flex flex-col gap-2 text-left text-xl sm:text-2xl lg:text-4xl">
        <p>{resumeData.hero.intro}</p>
        <p>{resumeData.hero.tagline}</p>
      </div>
      {/*<div>*/}
      {/*  <Button placement="left">Contact me</Button>*/}
      {/*  <Button placement="right">Download resume</Button>*/}
      {/*</div>*/}
    </Section>
  );
}
