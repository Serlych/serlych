import type { StaticImageData } from 'next/image';
import Image from 'next/image';

type LogoWithDescriptionProps = {
  logoSrc: StaticImageData;
  description: string;
}

export default function LogoWithDescription({ logoSrc, description }: LogoWithDescriptionProps) {
  return (
    <div className="flex flex-col items-center h-32 w-32 justify-center gap-3 bg-white bg-opacity-15 p-5 border border-violet-100 border-opacity-30 rounded-lg">
      <Image src={logoSrc} alt={`${description} logo`} className="h-20 drop-shadow-xl"/>
      <span className="font-bold font-mono">{description}</span>
    </div>
  )
}
