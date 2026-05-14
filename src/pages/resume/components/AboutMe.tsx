import { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark.css";

import Section from "~/components/Section";
import Panel from "~/components/Panel";
import { resumeData } from "~/data/resume";

hljs.registerLanguage("typescript", typescript);

function getAge(birthDateValue: string) {
  const today = new Date();
  const birthDate = new Date(birthDateValue);
  const m = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

const code = `const Isaac = {
  name: "${resumeData.about.profile.name}",
  pronouns: ${JSON.stringify(resumeData.about.profile.pronouns)},
  age: ${getAge(resumeData.about.profile.birthDate)},
  role: Roles.${resumeData.about.profile.role},
  isCatDad: ${resumeData.about.profile.isCatDad},
  outsideWork: ${JSON.stringify(resumeData.about.profile.outsideWork, null, 2)}
};
`;

export default function AboutMe() {
  useEffect(() => {
    hljs.highlightAll();
  });

  return (
    <Section className="items-center justify-between gap-7">
      <p className="w-2/3 text-justify text-2xl">
        {resumeData.about.summary.map((segment, index) =>
          "bold" in segment && segment.bold ? (
            <b key={index}>{segment.text}</b>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
      <Panel className="w-1/3">
        <pre>
          <code className="language-typescript">{code}</code>
        </pre>
      </Panel>
    </Section>
  );
}
