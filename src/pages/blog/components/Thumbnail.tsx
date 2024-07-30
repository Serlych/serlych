import Link from "next/link";

import Panel from "~/components/Panel";
import Tag from "~/pages/blog/components/Tag";
import Signature from "~/pages/blog/components/Signature";

type ThumbnailProps = {
  id: string | null;
  title: string | null;
  summary: string | null;
  tags: string | null;
  createdAt: Date | null;
  createdBy: string | null;
};

export default function Thumbnail({
  id,
  title,
  summary,
  tags,
  createdAt,
  createdBy,
}: ThumbnailProps) {
  if (!id) {
    return null;
  }

  return (
    <Link href={`/blog/${id}`}>
      <div className="z-1 relative w-fit max-w-2xl cursor-pointer transition-transform hover:scale-105 hover:brightness-110 hover:backdrop-blur-md">
        <img
          src="https://cdn.pixabay.com/photo/2021/07/13/11/34/cat-6463284_640.jpg"
          alt="Next.js and Tailwind CSS"
          width={700}
          height={300}
          className="rounded-t-lg border-l border-r border-t border-violet-100 border-opacity-30
          "
        />
        <Panel className="flex flex-col gap-5 rounded-t-none">
          <div className="flex gap-5">
            {tags
              ?.split(",")
              .map((tag, i) => <Tag key={`${id}-${i}`} tag={tag} />)}
          </div>
          <h3 className="text-2xl">{title}</h3>
          <p>{summary}</p>
          <Signature createdBy={createdBy} createdAt={createdAt} />
        </Panel>
      </div>
    </Link>
  );
}
