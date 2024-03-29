import type { HTMLAttributes, PropsWithChildren } from 'react';

export default function Section({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={`flex gap-10 py-10 ${className} relative z-1`}>
      {children}
    </section>
  )
}
