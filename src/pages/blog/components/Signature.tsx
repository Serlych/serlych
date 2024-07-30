import formatDate from "~/lib/formatDate";
import { api } from "~/utils/api";
import Image from "next/image";

type SignatureProps = {
  createdBy: string | null;
  createdAt: Date | null;
};

export default function Signature({ createdBy, createdAt }: SignatureProps) {
  if (!createdBy || !createdAt) {
    return null;
  }

  const formattedDate = formatDate(createdAt);

  const { data: user, error } = api.user.getById.useQuery({
    id: createdBy,
  });

  if (!user) {
    return null;
  }

  if (error) {
    return <div>Failed to load user: {error.message}</div>;
  }

  return (
    <div className="flex gap-3">
      <img
        src={user.imageUrl!}
        width={80}
        height={80}
        alt="User picture"
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-xl">{user.name}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
