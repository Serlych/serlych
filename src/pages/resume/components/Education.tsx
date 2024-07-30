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

export default function Education() {
  return (
    <Section className="flex-col ">
      <h2 className="bg-gradient-to-bl from-violet-400 to-sky-300 bg-clip-text text-center text-4xl font-bold text-transparent">
        Education & Languages
      </h2>
      <div className="flex justify-evenly">
        <Panel className="flex min-w-80 max-w-80 items-center gap-5">
          <Image
            src={iteso}
            alt="ITESO logo"
            className="h-20 w-20 drop-shadow-xl"
          />
          <div className="flex flex-col">
            <b>Masters Degree</b>
            <span>Computer Systems</span>
            <span>ITESO, 2021-2024</span>
          </div>
        </Panel>

        <Panel className="flex min-w-80 max-w-80 items-center gap-5">
          <Image
            src={umg}
            alt="UMG logo"
            className="h-20 w-20 drop-shadow-lg"
          />
          <div className="flex flex-col">
            <b>Bachelors Degree</b>
            <span>Videogame Development</span>
            <span>UMG, 2014-2018</span>
          </div>
        </Panel>

        <Panel className="flex min-w-80 max-w-80 items-center gap-5">
          <Image
            src={bedu}
            alt="BEDU logo"
            className="h-20 w-20 drop-shadow-lg"
          />
          <div className="flex flex-col">
            <b>Bootcamp</b>
            <span>JavaScript Development</span>
            <span>Bedu Tech, 2018</span>
          </div>
        </Panel>
      </div>
      <div className="flex justify-center gap-5">
        <LogoWithDescription logoSrc={spanish} description="Native" />
        <LogoWithDescription logoSrc={english} description="Bilingual" />
        <LogoWithDescription logoSrc={french} description="B1" />
      </div>
    </Section>
  );
}
