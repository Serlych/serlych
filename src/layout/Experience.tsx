import { useState } from 'react';
import Section from '~/components/Section';
import Panel from '~/components/Panel';

export default function Experience() {
  const [activeJob, setActiveJob] = useState<string | null>(null);
  
  return (
    <Section>
      <Panel className="flex flex-col justify-center items-center w-1/2 ml-5 gap-5 p-5">
        <h2 className="text-2xl font-bold">Key Achievements 🏆</h2>
        <ul className="text-white exp-list">
          {
            activeJob === 'Roii' ? (
              <>
                <li>Developed the standard CI/CD pipeline and delivery infrastructure for all of the companies' Single-Page Applications</li>
                <li>Implemented company-wide coding standards and best practices</li>
                <li>Created company-wide documentation using Obsidian, centralized and accessible to all employees</li>
                <li>Lead the development of the company's first mobile application</li>
                <li>Crafted an offline solution for a mobile application involving Starlink satellites and a sync mechanism to keep the cloud and the device in sync</li>
                <li>Lead a team of 3 developers to create a custom business application for a client in the fiscal industry</li>
                <li>Implemented issue tracking, project management and a severity triage system for the development team</li>
              </>
            ) : activeJob === 'Wizeline' ? (
              <>
                <li>Helped with the complete rewrite of the main product of a major financial company</li>
                <li>Promoted to Software Engineer II after 1 year</li>
                <li>Standardized the production release process for a client, reducing cognitive load and time-to-release by 20%</li>
                <li>Retained an important client thanks to successful communication and project management</li>
                <li>Developed a custom configuration service that allowed a media-industry client to globally customize content delivery in all of their publications</li>
                <li>Created a production-ready, tested and documented menu component for a major media-streaming company with thousands of users</li>
                <li>Promoted to Software Engineer III after 2 years</li>
              </>
            ) : activeJob === 'iTexico' ? (
              <>
                <li>LAKSJD LKAJSDLK ASJD</li>
                <li>LAKSJD LKAJSDLK ASJD</li>
                <li>LAKSJD LKAJSDLK ASJD</li>
                <li>LAKSJD LKAJSDLK ASJD</li>
                <li>LAKSJD LKAJSDLK ASJD</li>
                <li>LAKSJD LKAJSDLK ASJD</li>
              </>
            ) : (
              <>
                Click on a job to check out the key achievements! 🚀
              </>
            )
          }
        </ul>
      </Panel>
      <div className="flex flex-col w-1/2">
        <div className="bullet flex items-center hover:bg-indigo-400 hover:bg-opacity-15 cursor-pointer" onClick={() => setActiveJob('Roii')}>
          <div className="flex flex-col">
            <span
              className="text-4xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Senior Software Engineer at
              <a className="font-bold text-white underline ml-2" href="https://www.roii.tech" target="_blank">Roii</a>
            </span>
            <span className="font-bold">October 2023 — Present</span>
          </div>
        </div>
        <div className="connector h-0" />
        <div className="bullet flex items-center hover:bg-indigo-400 hover:bg-opacity-15 cursor-pointer" onClick={() => setActiveJob('Wizeline')}>
          <div className="flex flex-col">
            <span
              className="text-4xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Software Engineer III at
              <a className="font-bold text-white underline ml-2" href="https://www.wizeline.com" target="_blank">Wizeline</a>
            </span>
            <span className="font-bold">January 2020 — August 2023</span>
          </div>
        </div>
        <div className="connector h-0" />
        <div className="bullet flex items-center hover:bg-indigo-400 hover:bg-opacity-15 cursor-pointer" onClick={() => setActiveJob('iTexico')}>
            <div className="flex flex-col">
            <span
              className="text-4xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Software Engineer at
              <a className="font-bold text-white underline ml-2" href="https://www.improving.com" target="_blank">Improving</a>
            </span>
              <span className="font-bold">January, 2019 — December 2020</span>
            </div>
          </div>
        </div>
    </Section>
)
}
