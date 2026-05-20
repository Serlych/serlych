import Image from "next/image";
import Link from "next/link";

import dailyDevLogo from "~/assets/dailydev.svg";
import linkedInLogo from "~/assets/linkedin.png";
import gitHubLogo from "~/assets/github.svg";
import ThemeToggle from "~/components/ThemeToggle";
import { THEME_BACKGROUND } from "~/constants";

export default function Header() {
  return (
    <header
      className={`fixed left-0 top-0 z-10 w-full rounded-t-none border-t-0 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-5 ${THEME_BACKGROUND}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
        <Link
          href="/"
          className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-black text-2xl font-extrabold dark:border-white sm:h-16 sm:w-16 sm:text-3xl lg:h-20 lg:w-20 lg:text-4xl"
        >
          IC
        </Link>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 text-base sm:text-lg lg:w-auto lg:gap-10 lg:text-xl">
          <Link href="/resume">Resume</Link>
          {/*<Link href="/blog" className="text-xl">*/}
          {/*  Blog*/}
          {/*</Link>*/}
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3 lg:w-auto">
          <ThemeToggle />
          <Link href="https://app.daily.dev/serlych" target="_blank" rel="noreferrer">
            <Image src={dailyDevLogo} alt="daily.dev Logo" className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
          </Link>
          <Link href="https://www.linkedin.com/in/joelchavoya/" target="_blank">
            <Image
              src={linkedInLogo}
              alt="LinkedIn Logo"
              className="h-10 w-10 dark:brightness-0 dark:invert sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
          </Link>
          <Link href="https://github.com/Serlych" target="_blank">
            <Image
              src={gitHubLogo}
              alt="GitHub Logo"
              className="white-img h-10 w-10 dark:brightness-0 dark:invert sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
