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
      className={`flex h-28 w-full max-w-[10rem] flex-col items-center justify-center gap-3 sm:h-32 sm:w-32 ${THEME_BACKGROUND}`}
    >
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={`${description} logo`}
          className="h-16 w-16 object-contain drop-shadow-xl sm:h-20 sm:w-20"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 text-center font-mono text-[10px] font-bold leading-tight sm:h-20 sm:w-20 sm:text-xs">
          {description}
        </div>
      )}
      <span className="text-center font-mono text-sm font-bold sm:text-base">{description}</span>
    </div>
  );
}
