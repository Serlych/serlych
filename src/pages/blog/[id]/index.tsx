import { useRouter } from "next/router";
import Markdown from "react-markdown";

import Header from "~/components/Header";
import Tag from "~/pages/blog/components/Tag";
import { api } from "~/utils/api";
// import { useTheme } from "next-themes";
import { THEME_BACKGROUND } from "~/constants";
import Image from "next/image";

import cat from "~/assets/cat.jpeg";
import Signature from "~/pages/blog/components/Signature";

const WORDS_PER_MINUTE = 300;

function calculateReadingTimeInMinutes(body: string) {
  const wordCount = body.split(" ").length;
  return Math.round(wordCount / WORDS_PER_MINUTE);
}

export default function BlogPost() {
  // const { setTheme } = useTheme();
  // setTheme("light");

  const router = useRouter();
  const blogPostId = typeof router.query.id === "string" ? router.query.id : undefined;

  if (!blogPostId) {
    return null;
  }

  const { data: blogPost } = api.post.getById.useQuery({
    id: blogPostId,
  });

  if (!blogPost?.body) {
    return null;
  }

  const readingTime = calculateReadingTimeInMinutes(blogPost.body);
  const tags = blogPost.tags?.split(",").filter((tag: string) => tag.length > 0) ?? [];

  return (
    <>
      <Header />
      <div
        className={`mx-auto mb-10 mt-52 flex w-full max-w-6xl items-center justify-between gap-10 ${THEME_BACKGROUND}`}
      >
        <div className="flex flex-col gap-20">
          <div className="flex w-fit flex-col gap-5">
            <div className="flex gap-3">
              {tags.map((tag: string, i: number) => (
                <Tag tag={tag} key={`${blogPost.id}-${tag}-${i}`} />
              ))}
            </div>
            <h2 className="max-w-xl text-4xl">{blogPost.title}</h2>
            <span>{readingTime} minute read</span>
            <p className="text-xl">{blogPost.summary}</p>
          </div>
          <Signature createdBy={blogPost.createdBy} createdAt={blogPost.createdAt} />
        </div>
        <Image
          src={cat}
          alt="cat"
          width={350}
          height={100}
          className={`rounded-lg ${THEME_BACKGROUND} p-0`}
        />
      </div>
      <article className="mx-auto flex max-w-2xl flex-col gap-5 whitespace-pre-line break-words font-serif text-xl leading-8 tracking-wide text-gray-700 subpixel-antialiased dark:text-white">
        <Markdown>{blogPost.body}</Markdown>
      </article>
    </>
  );
}

function breakBodyIntoParagraphs(body: string) {
  return body.split(".").map((paragraph, i) => <p key={`blog-p-${i}`}>{paragraph}</p>);
}
