import type { PropsWithChildren } from 'react';

type TechShowcaseProps = {
  description: string;
};

export default function TechShowcase({ description, children }: PropsWithChildren<TechShowcaseProps>) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">{description}</h2>
      <div className="flex gap-5 flex-wrap justify-center">
        {children}
      </div>
    </div>
    
  );
}
