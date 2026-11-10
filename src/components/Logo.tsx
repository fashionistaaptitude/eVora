import { useSafeId } from "../hooks";
import { cn } from "../utils/cn";

export function LogoOrb({ size = 36, className }: { size?: number; className?: string }) {
  const id = useSafeId("orb");
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={cn("shrink-0", className)}>
      <defs>
        <radialGradient id={`${id}a`} cx="50%" cy="88%" r="82%">
          <stop offset="0" stopColor="#a6f0ff" />
          <stop offset=".45" stopColor="#2a9bf0" />
          <stop offset="1" stopColor="#0a4a9a" />
        </radialGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e4ffb0" />
          <stop offset="1" stopColor="#6cc722" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill={`url(#${id}a)`} stroke="#073f88" strokeWidth="1" />
      <path
        d="M20 9.500c4.500 5.200 7 8.700 7 12.200a7 7 0 0 1-14 0c0-3.500 2.500-7 7-12.200Z"
        fill={`url(#${id}b)`}
        stroke="#fff"
        strokeOpacity=".9"
        strokeWidth="1.200"
      />
      <ellipse cx="20" cy="11.500" rx="13" ry="7.500" fill={`url(#${id}c)`} />
    </svg>
  );
}

export function Logo({ light = false, size = 36 }: { light?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5">
      <LogoOrb size={size} className="max-[379px]:size-8" />
      <span
        className={cn(
          "font-display text-[1.3rem] font-extrabold lowercase leading-none tracking-[-0.03em] min-[380px]:text-[1.45rem]",
          light ? "text-white" : "text-ink"
        )}
      >
        dewpoint
      </span>
    </span>
  );
}
