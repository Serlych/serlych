import type { HTMLAttributes, PropsWithChildren } from "react";

export default function Section({
  children,
  className,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={`z-1 relative flex flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:gap-10 lg:px-0 ${className ? className : ""}`}
    >
      {children}
    </section>
  );
}
