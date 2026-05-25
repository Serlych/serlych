import Image from "next/image";
import Section from "~/components/Section";

import gatell from "~/assets/gatell.jpeg";
import { THEME_BACKGROUND } from "~/constants";
import { resumeData } from "~/data/resume";

export default function Closer() {
  return (
    <Section className="items-center overflow-visible">
      <div className="flex max-w-3xl flex-col justify-center gap-5 overflow-visible">
        <h2 className="inline-block break-words bg-gradient-to-l from-sky-400 to-violet-500 bg-clip-text pb-3 text-3xl font-bold leading-[1.18] text-transparent sm:text-4xl lg:text-5xl">
          {resumeData.closer.title}
        </h2>
        <h3 className="text-2xl leading-tight sm:text-3xl">
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
        className={`h-auto w-full shrink-0 self-center object-contain max-w-[26.625rem] drop-shadow-xl ${THEME_BACKGROUND} p-0`}
      />
    </Section>
  );
}
