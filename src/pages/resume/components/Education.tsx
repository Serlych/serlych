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
    <Section className="flex-col ">
      <h2 className="bg-gradient-to-bl from-violet-400 to-sky-300 bg-clip-text text-center text-4xl font-bold text-transparent">
        {resumeData.education.title}
      </h2>
      <div className="flex justify-evenly">
        {resumeData.education.schools.map((school) => (
          <Panel key={school.id} className="flex min-w-80 max-w-80 items-center gap-5">
            <Image
              src={schoolImageMap[school.id]}
              alt={school.imageAlt}
              className={`h-20 w-20 ${school.id === "iteso" ? "drop-shadow-xl" : "drop-shadow-lg"}`}
            />
            <div className="flex flex-col">
              <b>{school.title}</b>
              <span>{school.focus}</span>
              <span>{school.institution}</span>
            </div>
          </Panel>
        ))}
      </div>
      <div className="flex justify-center gap-5">
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
