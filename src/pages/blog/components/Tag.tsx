type TagProps = {
  tag: string;
};

export default function Tag({ tag }: TagProps) {
  return (
    <span className="rounded-full bg-indigo-300 px-4 py-2 font-semibold text-black">
      #{tag}
    </span>
  );
}
