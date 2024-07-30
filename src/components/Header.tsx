import Image from "next/image";
import Link from "next/link";

import linkedInLogo from "~/assets/linkedin.png";
import gitHubLogo from "~/assets/github.svg";
import ThemeToggle from "~/components/ThemeToggle";
import { THEME_BACKGROUND } from "~/constants";

export default function Header() {
  return (
    <header
      className={`fixed left-0 top-0 z-10 flex w-full items-center justify-between rounded-t-none border-t-0 p-5 backdrop-blur-xl ${THEME_BACKGROUND}`}
    >
      <Link
        href="/"
        className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-black text-4xl font-extrabold dark:border-white"
      >
        IC
      </Link>
      <div className="ml-40 flex items-center gap-10">
        <Link href="/resume" className="text-xl">
          Resume
        </Link>
        {/*<Link href="/blog" className="text-xl">*/}
        {/*  Blog*/}
        {/*</Link>*/}
        {/*<Link href="/contact" className="text-xl">*/}
        {/*  Contact*/}
        {/*</Link>*/}
      </div>
      <div className="flex gap-3">
        <ThemeToggle />
        <Link href="https://www.linkedin.com/in/joelchavoya/" target="_blank">
          <Image
            src={linkedInLogo}
            alt="LinkedIn Logo"
            className="h-14 w-14 dark:brightness-0 dark:invert"
          />
        </Link>
        <Link href="https://github.com/Serlych" target="_blank">
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={gitHubLogo}
            alt="GitHub Logo"
            className="white-img h-14 w-14 dark:brightness-0 dark:invert"
          />
        </Link>
      </div>
    </header>
  );
}
