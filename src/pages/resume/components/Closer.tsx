import Image from "next/image";
import Section from "~/components/Section";

import gatell from "~/assets/gatell.jpeg";
import { THEME_BACKGROUND } from "~/constants";
import { resumeData } from "~/data/resume";

export default function Closer() {
  return (
    <Section>
      <div className="flex flex-col justify-center gap-5">
        <h2 className="bg-gradient-to-l from-sky-400 to-violet-500 bg-clip-text text-5xl font-bold text-transparent">
          {resumeData.closer.title}
        </h2>
        <h3 className="text-3xl">
          {resumeData.closer.intro}
          <br />
          {resumeData.closer.catLine}
        </h3>
      </div>
      <Image
        src={gatell}
        alt={resumeData.closer.imageAlt}
        width={426}
        height={320}
        className={`drop-shadow-xl ${THEME_BACKGROUND} p-0`}
      />
    </Section>
  );
}
