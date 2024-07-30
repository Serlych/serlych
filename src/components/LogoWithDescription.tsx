import type { StaticImageData } from "next/image";
import Image from "next/image";
import { THEME_BACKGROUND } from "~/constants";

type LogoWithDescriptionProps = {
  logoSrc: StaticImageData;
  description: string;
};

export default function LogoWithDescription({
  logoSrc,
  description,
}: LogoWithDescriptionProps) {
  return (
    <div
      className={`flex h-32 w-32 flex-col items-center justify-center gap-3 ${THEME_BACKGROUND}`}
    >
      <Image
        src={logoSrc}
        alt={`${description} logo`}
        className="h-20 drop-shadow-xl"
      />
      <span className="font-mono font-bold">{description}</span>
    </div>
  );
}
