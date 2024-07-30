import type { HTMLAttributes, PropsWithChildren } from "react";

export default function Section({
  children,
  className,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={`z-1 relative flex gap-10 py-10 ${className ? className : ""}`}
    >
      {children}
    </section>
  );
}
