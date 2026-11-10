import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export type GlossTone = "azure" | "leaf" | "sun" | "aqua" | "violet" | "rose";

const tones: Record<GlossTone, string> = {
  azure: "gloss-azure",
  leaf: "gloss-leaf",
  sun: "gloss-sun",
  aqua: "gloss-aqua",
  violet: "gloss-violet",
  rose: "gloss-rose",
};

/** A shiny rounded icon tile, the kind every 2007 desktop was covered in. */
export function GlossIcon({ tone = "azure", className, children }: { tone?: GlossTone; className?: string; children: ReactNode }) {
  return (
    <span aria-hidden="true" className={cn("gloss-icon", tones[tone], className)}>
      {children}
    </span>
  );
}
