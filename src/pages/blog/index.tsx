import Head from "next/head";

import Header from "~/components/Header";
import { api, type RouterOutputs } from "~/utils/api";
// import { signIn, signOut, useSession } from "next-auth/react";
import Thumbnail from "~/pages/blog/components/Thumbnail";
import StarBackground from "~/components/StarBackground";

type LatestPost = RouterOutputs["post"]["getLatestPosts"][number];

export default function Blog() {
  const { data } = api.post.getLatestPosts.useQuery(undefined);

  return (
    <>
      <Head>
        <title>Isaac Chavoya - Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StarBackground />
      <Header />
      <h1 className="mb-10 pt-72 text-7xl">Blog</h1>
      {data
        ? data.map((post: LatestPost) => (
          <Thumbnail
            key={post.id}
            id={post.id}
            title={post.title}
            summary={post.summary}
            tags={post.tags}
            createdAt={post.createdAt}
            createdBy={post.createdBy}
          />
        ))
        : "Loading posts..."}
    </>
  );
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
//       <p className="text-2x text-center">
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
