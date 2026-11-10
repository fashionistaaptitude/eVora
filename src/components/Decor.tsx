import { useMemo, type CSSProperties } from "react";

const rand = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/** Decorative bubbles that drift up through an underwater section. */
export function RisingBubbles({ count = 12, seed = 1 }: { count?: number; seed?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const k = seed * 100 + i * 7;
        return {
          x: 2 + rand(k) * 94,
          s: 10 + rand(k + 1) * 34,
          dur: 13 + rand(k + 2) * 14,
          delay: rand(k + 3) * 24,
          sway: -40 + rand(k + 4) * 80,
        };
      }),
    [count, seed]
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble rise-bubble"
          style={
            {
              "--x": `${b.x.toFixed(1)}%`,
              "--s": `${b.s.toFixed(0)}px`,
              "--dur": `${b.dur.toFixed(1)}s`,
              "--delay": `-${b.delay.toFixed(1)}s`,
              "--sway": `${b.sway.toFixed(0)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** The waterline: the pale shore above dips into the water below. */
export function Surface({ fill = "#eaf7ff" }: { fill?: string }) {
  const edge = "M0 0h1440v36c-120 26-240-14-360 4s-240 34-360 12-240-22-360-2S120 68 0 42Z";
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 96"
      preserveAspectRatio="none"
      className="absolute inset-x-0 -top-px h-[64px] w-full sm:h-[96px]"
    >
      <path d={edge} transform="translate(0 20)" fill="#fff" opacity=".35" />
      <path d={edge} transform="translate(0 9)" fill="#fff" opacity=".6" />
      <path d={edge} fill={fill} />
    </svg>
  );
}
