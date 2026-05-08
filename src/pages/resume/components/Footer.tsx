import Link from "next/link";
import { THEME_BACKGROUND } from "~/constants";
import { resumeContent } from "~/pages/resume/content";

function getCurrentYear() {
  const today = new Date();
  return today.getFullYear();
}

export default function Footer() {
  const currentYear = getCurrentYear();

  return (
    <footer
      className={`z-1 relative flex w-full items-end justify-between rounded-b-none border-b-0 p-5 backdrop-blur-sm ${THEME_BACKGROUND}`}
    >
      <div className="flex gap-20">
        <div>
          <h3 className="mb-5 font-bold">Sitemap</h3>
          <ul className="flex list-inside flex-col gap-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
            {/*<li>*/}
            {/*  <Link href="/blog">Blog</Link>*/}
            {/*</li>*/}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-bold">Additional information</h3>
          <ul className="list-inside list-disc">
            <li>Located in {resumeContent.footer.location}</li>
            {resumeContent.footer.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
      <h3>Isaac Chavoya, {currentYear}.</h3>
    </footer>
  );
}
