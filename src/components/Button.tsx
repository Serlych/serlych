import type { PropsWithChildren } from "react";
import { THEME_BACKGROUND } from "~/constants";

type ButtonProps = {
  placement: "left" | "right" | "center";
};

function getPlacementClasses(placement: ButtonProps["placement"]) {
  switch (placement) {
    case "left":
      return "rounded-r-none rounded-l-lg";
    case "right":
      return "rounded-l-none rounded-r-lg";
    case "center":
      return "rounded-none";
    default:
      return "";
  }
}

export default function Button({
  placement,
  children,
}: PropsWithChildren<ButtonProps>) {
  const placementClasses = getPlacementClasses(placement);

  return (
    <button
      className={`${placementClasses}
      ${THEME_BACKGROUND}
      cursor-pointer
      border
      px-5 py-4
      text-2xl font-medium
      text-violet-800 backdrop-blur-sm
      transition-colors dark:text-violet-300
      `}
    >
      {children}
    </button>
  );
}
