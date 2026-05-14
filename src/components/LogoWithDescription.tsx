import type { StaticImageData } from "next/image";
import Image from "next/image";
import { THEME_BACKGROUND } from "~/constants";

type LogoWithDescriptionProps = {
  logoSrc?: string | StaticImageData;
  description: string;
};

export default function LogoWithDescription({ logoSrc, description }: LogoWithDescriptionProps) {
  return (
    <div
      className={`flex h-32 w-32 flex-col items-center justify-center gap-3 ${THEME_BACKGROUND}`}
    >
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={`${description} logo`}
          className="h-20 w-20 object-contain drop-shadow-xl"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 text-center font-mono text-xs font-bold leading-tight">
          {description}
        </div>
      )}
      <span className="font-mono font-bold">{description}</span>
    </div>
  );
}
