import Image from "next/image";
import Section from "~/components/Section";
import LogoWithDescription from "~/components/LogoWithDescription";
import Panel from "~/components/Panel";

import iteso from "~/assets/iteso.png";
import umg from "~/assets/umg.png";
import bedu from "~/assets/bedu.png";
import spanish from "~/assets/spanish.png";
import english from "~/assets/english.png";
import french from "~/assets/french.png";
import { resumeData } from "~/data/resume";

const schoolImageMap = {
  iteso,
  umg,
  bedu,
} as const;

const languageImageMap = {
  spanish,
  english,
  french,
} as const;

export default function Education() {
  return (
    <Section className="flex-col lg:flex-col">
      <h2 className="bg-gradient-to-bl from-violet-400 to-sky-300 bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
        {resumeData.education.title}
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {resumeData.education.schools.map((school) => (
          <Panel
            key={school.id}
            className="flex w-full max-w-md flex-col items-center gap-4 text-center sm:flex-row sm:text-left"
          >
            <Image
              src={schoolImageMap[school.id]}
              alt={school.imageAlt}
              className={`h-16 w-16 shrink-0 sm:h-20 sm:w-20 ${school.id === "iteso" ? "drop-shadow-xl" : "drop-shadow-lg"}`}
            />
            <div className="flex flex-col">
              <b>{school.title}</b>
              <span>{school.focus}</span>
              <span>{school.institution}</span>
            </div>
          </Panel>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {resumeData.education.languages.map((language) => (
          <LogoWithDescription
            key={language.id}
            logoSrc={languageImageMap[language.id]}
            description={language.description}
          />
        ))}
      </div>
    </Section>
  );
}
