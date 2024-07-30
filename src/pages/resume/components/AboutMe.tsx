import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark.css";

import Section from "~/components/Section";
import Panel from "~/components/Panel";

hljs.registerLanguage("typescript", typescript);

function getAge() {
  const today = new Date();
  const birthDate = new Date("1995-03-30");
  const m = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

const code = `const Isaac = {
  name: "Isaac Chavoya",
  pronouns: ["he", "him"],
  age: ${getAge()},
  role: Roles.FullStackDeveloper,
  isCatDad: true,
  outsideWork: [
    "Skating 🛹",
    "Piano 🎹",
    "Reading 📖",
    "Fitness 🏋️",
    "Airsoft 🔫"
  ]
};
`;

export default function AboutMe() {
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <Section className="items-center justify-between gap-7">
      <p className="w-2/3 text-justify text-2xl">
        I'm not just an engineer – I'm a person who{" "}
        <b>thrives on transformation and innovation</b>. My journey is fueled by
        a boundless <b>appetite for knowledge</b> and a positive,{" "}
        <b>can-do attitude</b>. As an <b>adaptable problem-solver</b>, I dive
        headfirst into challenges, thinking outside the box to craft{" "}
        <b>creative solutions</b>. <b>Communication</b> is my superpower,
        allowing me to connect ideas and people. In the world of teamwork, I
        shine, collaborating while making <b>decisive, impactful choices</b>.{" "}
        <b>Assertive yet open-minded</b>, I tackle each project with a{" "}
        <b>critical eye</b> and a heart full of motivation. With me, it’s not
        just about getting the job done; it’s about <b>owning it</b> and doing
        it with an <b>attitude that inspires</b>!
      </p>
      <Panel className="w-1/3">
        <pre>
          <code className="language-typescript">{code}</code>
        </pre>
      </Panel>
    </Section>
  );
}
