import type { HTMLAttributes, PropsWithChildren } from "react";
import { THEME_BACKGROUND } from "~/constants";

export default function Panel({
  children,
  className,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`PANEL-- backdrop-blur-sm ${THEME_BACKGROUND} ${className}`}
    >
      {children}
    </div>
  );
}
