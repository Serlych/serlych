import Link from "next/link";
import { THEME_BACKGROUND } from "~/constants";
import { resumeData } from "~/data/resume";

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
          <h3 className="mb-5 font-bold">{resumeData.footer.sitemapTitle}</h3>
          <ul className="flex list-inside flex-col gap-3">
            {resumeData.footer.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            {/*<li>*/}
            {/*  <Link href="/blog">Blog</Link>*/}
            {/*</li>*/}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 font-bold">{resumeData.footer.additionalInfoTitle}</h3>
          <ul className="list-inside list-disc">
            <li>Located in {resumeData.footer.location}</li>
            {resumeData.footer.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>
      <h3>{resumeData.footer.signatureName}, {currentYear}.</h3>
    </footer>
  );
}
