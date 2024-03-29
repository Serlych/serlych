import type { HTMLAttributes, PropsWithChildren } from 'react';

export default function Panel({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`backdrop-blur-sm bg-white bg-opacity-15 p-5 border border-violet-100 border-opacity-30 rounded-lg ${className}`}>
      {children}
    </div>
  )
}
