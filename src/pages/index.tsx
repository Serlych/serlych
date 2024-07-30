import Head from "next/head";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import asciiCats from "ascii-cats";
import TypeIt from "typeit-react";

import Section from "~/components/Section";
import Button from "~/components/Button";
import Link from "next/link";
import getCurrentYear from "~/lib/getCurrentYear";
import StarBackground from "~/components/StarBackground";

type HomeProps = {
  asciiCat: string;
};

export default function Home({ asciiCat }: HomeProps) {
  const currentYear = getCurrentYear();

  return (
    <>
      <Head>
        <title>Isaac Chavoya</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StarBackground />
      <Section className="h-svh flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-10 pt-10">
          <h1 className=" text-7xl font-extrabold ">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Serlych{" "}
            </span>
            🚀
          </h1>
          <h2 className="text-3xl">
            Here you can find some of my projects and learn more about me.
          </h2>
          <div>
            <Button placement="left">
              <Link href="/resume">Check my resume</Link>
            </Button>
            <Button placement="center">
              <Link href="/blog">Read my blog</Link>
            </Button>
            <Button placement="right">
              <Link href="/contact">Contact me</Link>
            </Button>
          </div>
          <span className="font-semibold">Isaac Chavoya, {currentYear}.</span>
        </div>
        <TypeIt
          as="pre"
          options={{ speed: 10 }}
          className="w-fit text-black backdrop-blur-sm dark:text-white"
        >
          <code className="font-bold">{asciiCat}</code>
        </TypeIt>
      </Section>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export async function getStaticProps(_) {
  const asciiCat = asciiCats();

  return {
    props: {
      asciiCat,
    },
  };
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();
//
//   const hello = api.post.hello.useQuery({ text: "from tRPC" });
//   const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );
//
//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <p className="text-2xl text-black">
//         {hello.data ? hello.data.greeting : "Loading tRPC query..."}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
