import Section from "~/components/Section";
import Button from "~/components/Button";
import { resumeData } from "~/data/resume";

export default function Hero() {
  return (
    <Section className="flex-col gap-14 pb-20 pt-72">
      <h1 className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text font-mono text-9xl text-transparent">
        {resumeData.hero.title}
      </h1>
      <p className="text-left text-4xl">
        {resumeData.hero.intro}
        <br />
        {resumeData.hero.tagline}
      </p>
      {/*<div>*/}
      {/*  <Button placement="left">Contact me</Button>*/}
      {/*  <Button placement="right">Download resume</Button>*/}
      {/*</div>*/}
    </Section>
  );
}
