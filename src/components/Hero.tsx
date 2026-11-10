import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import clouds from "../assets/raw/clouds.png";
import { formatPrice, getProduct } from "../data/catalog";
import { useSafeId } from "../hooks";
import { PROMO_CODE, useStore } from "../store";
import { cn } from "../utils/cn";
import { Cover } from "./Cover";
import { ArrowRightIcon, BookIcon, CheckIcon } from "./Icons";

type BubbleState = "idle" | "pop" | "gone";

const GOAL = 5;

const BUBBLES = [
  { id: 1, x: 3, y: 17, s: 56, d: 7.5, delay: 0, sway: 10, wide: false },
  { id: 2, x: 43, y: 12, s: 34, d: 6, delay: -2, sway: -8, wide: true },
  { id: 3, x: 50, y: 60, s: 76, d: 9, delay: -4, sway: 12, wide: true },
  { id: 4, x: 88, y: 15, s: 62, d: 8, delay: -1, sway: -10, wide: false },
  { id: 5, x: 93, y: 56, s: 40, d: 6.5, delay: -3, sway: 6, wide: true },
  { id: 6, x: 60, y: 27, s: 26, d: 5.5, delay: -2.5, sway: -6, wide: false },
  { id: 7, x: 30, y: 73, s: 44, d: 7, delay: -5, sway: 9, wide: true },
  { id: 8, x: 8, y: 62, s: 30, d: 6, delay: -1.5, sway: -7, wide: false },
  { id: 9, x: 76, y: 70, s: 54, d: 8.5, delay: -3.5, sway: 8, wide: false },
  { id: 10, x: 22, y: 40, s: 22, d: 5, delay: -0.5, sway: 5, wide: false },
];

function Hills() {
  const id = useSafeId("hill");
  const back = "M0 150C220 70 430 95 700 150S1180 90 1440 130V300H0Z";
  const mid = "M0 205C240 130 470 215 760 180S1230 215 1440 170V300H0Z";
  const front = "M0 250C300 190 580 280 880 240S1300 265 1440 235V300H0Z";
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      className="absolute inset-x-0 -bottom-px z-0 h-[clamp(130px,17vw,250px)] w-full"
    >
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b4ec6c" />
          <stop offset="1" stopColor="#86d83c" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86de35" />
          <stop offset="1" stopColor="#52b816" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5fc81e" />
          <stop offset=".45" stopColor="#93dc50" />
          <stop offset="1" stopColor="#d9f3bf" />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset=".22" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={back} fill={`url(#${id}a)`} />
      <path d={back} fill={`url(#${id}g)`} />
      <path d={mid} fill={`url(#${id}b)`} />
      <path d={mid} fill={`url(#${id}g)`} opacity=".8" />
      <path d={front} fill={`url(#${id}c)`} />
      <path d={front} fill={`url(#${id}g)`} opacity=".55" />
    </svg>
  );
}

function Swooshes() {
  const id = useSafeId("swoosh");
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 700"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".45" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#d8f6a8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".3" />
          <stop offset="1" stopColor="#b6ec6f" stopOpacity=".05" />
        </linearGradient>
      </defs>
      <path
        d="M-40 540C260 400 520 620 820 450S1260 380 1500 240V310C1260 430 1080 370 820 505S260 455-40 600Z"
        fill={`url(#${id}b)`}
      />
      <path d="M-40 540C260 400 520 620 820 450S1260 380 1500 240" fill="none" stroke={`url(#${id}a)`} strokeWidth="2.500" />
      <path d="M-40 585C300 450 560 650 860 490S1280 420 1500 300" fill="none" stroke={`url(#${id}a)`} strokeWidth="1.200" opacity=".7" />
    </svg>
  );
}

function FeaturedCover({ onOpen }: { onOpen: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const latest = getProduct("issue-07");
  const behindLeft = getProduct("issue-06");
  const behindRight = getProduct("issue-05");

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    el.style.setProperty("--ry", `${((px - 0.5) * 18).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - py) * 14).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
    el.style.setProperty("--glare", "1");
  };

  const onLeave = () => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--glare", "0");
  };

  if (!latest || !behindLeft || !behindRight) return null;

  return (
    <div
      ref={stage}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-[min(60vw,270px)] sm:w-[300px] lg:w-[clamp(290px,27vw,372px)]"
    >
      <div className="float-slow tilt-stage">
        <div className="tilt-inner relative">
          <div aria-hidden="true" className="absolute inset-0 [transform:translate3d(-25%,5%,-70px)_rotate(-10deg)_scale(.9)]">
            <Cover product={behindLeft} />
          </div>
          <div aria-hidden="true" className="absolute inset-0 [transform:translate3d(27%,7%,-110px)_rotate(9deg)_scale(.86)]">
            <Cover product={behindRight} />
          </div>
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Flip through ${latest.kicker}: ${latest.title}`}
            className="relative block w-full rounded-md text-left"
          >
            <Cover product={latest} />
            <span aria-hidden="true" className="tilt-glare absolute inset-0" />
          </button>
          <span
            aria-hidden="true"
            className="new-badge -right-8 bottom-[7%] size-[84px] text-center font-display leading-none [transform:translateZ(60px)_rotate(10deg)]"
          >
            <span>
              <span className="block font-tech text-[10px] tracking-[0.14em]">NEW</span>
              <span className="mt-1 block text-[26px] font-extrabold tracking-[-0.03em]">{formatPrice(latest.price)}</span>
            </span>
          </span>
        </div>
      </div>
      <div aria-hidden="true" className="mx-auto mt-7 h-5 w-[72%] rounded-[50%] bg-azure-950/30 blur-md" />
    </div>
  );
}

export function Hero() {
  const { openPreview, promoUnlocked, unlockPromo, promo, applyPromo } = useStore();
  const [popped, setPopped] = useState(0);
  const [states, setStates] = useState<Record<number, BubbleState>>({});
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    if (popped >= GOAL && !promoUnlocked) unlockPromo();
  }, [popped, promoUnlocked, unlockPromo]);

  const pop = (id: number) => {
    if ((states[id] ?? "idle") !== "idle") return;
    setStates((s) => ({ ...s, [id]: "pop" }));
    setPopped((n) => n + 1);
    timers.current.push(
      window.setTimeout(() => setStates((s) => ({ ...s, [id]: "gone" })), 280),
      window.setTimeout(() => setStates((s) => ({ ...s, [id]: "idle" })), 5200)
    );
  };

  const popRandom = () => {
    const idle = BUBBLES.filter((b) => (states[b.id] ?? "idle") === "idle");
    if (idle.length) pop(idle[Math.floor(Math.random() * idle.length)].id);
  };

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Atmosphere. The sky lives in this layer so the clouds can screen-blend against it. */}
      <div aria-hidden="true" className="sky pointer-events-none absolute inset-0 -z-10">
        <div className="sun-flare" />
        <span className="flare-ghost right-[24%] top-[34%] size-16 border border-white/50 bg-leaf-300/25" />
        <span className="flare-ghost right-[31%] top-[47%] size-7 bg-white/50" />
        <span className="flare-ghost right-[40%] top-[62%] size-24 border border-white/40 bg-azure-200/25" />
        <img src={clouds} alt="" className="clouds clouds-a" />
        <img src={clouds} alt="" className="clouds clouds-b" />
        <Swooshes />
      </div>

      <Hills />

      {/* Bubbles you can pop */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {BUBBLES.map((b) => {
          const state = states[b.id] ?? "idle";
          return (
            <span
              key={b.id}
              className={cn("bubble-float pointer-events-auto", b.wide && "hidden sm:block")}
              style={
                {
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: b.s,
                  height: b.s,
                  "--dur": `${b.d}s`,
                  "--delay": `${b.delay}s`,
                  "--sway": `${b.sway}px`,
                } as CSSProperties
              }
            >
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => pop(b.id)}
                className={cn("bubble bubble-btn", state === "pop" && "is-pop", state === "gone" && "is-gone")}
              />
            </span>
          );
        })}
      </div>

      <div className="pointer-events-none relative z-10 mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-[clamp(200px,23vw,320px)] pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8 lg:px-8 lg:pt-36">
        <div className="pointer-events-auto max-w-[640px]">
          <p className="chip rise-in">
            <span className="status-dot" />
            <span className="label text-ink">Issue 07 out now</span>
          </p>

          <h1
            className="glow-text rise-in mt-5 font-display text-[clamp(2.6rem,6.3vw,5rem)] font-light leading-[1.03] tracking-[-0.03em]"
            style={{ "--d": "80ms" } as CSSProperties}
          >
            Magazines from the <strong className="font-extrabold">future</strong> we were promised.
          </h1>

          <p
            className="glow-text rise-in mt-5 max-w-[34rem] text-[1.1875rem] leading-relaxed"
            style={{ "--d": "160ms" } as CSSProperties}
          >
            Dewpoint is an independent digital magazine about glossy interfaces, clean-air cities and optimistic technology.
            Read it in your browser or keep the PDF.
          </p>

          <div className="rise-in mt-8 flex flex-wrap gap-3" style={{ "--d": "240ms" } as CSSProperties}>
            <a href="#library" className="gel gel-blue gel-lg">
              Browse the library
              <ArrowRightIcon size={20} />
            </a>
            <button type="button" className="gel gel-glass gel-lg" onClick={() => openPreview("issue-07")}>
              <BookIcon size={20} />
              Flip through Issue 07
            </button>
          </div>

          <div
            className="chip rise-in mt-7 flex-wrap rounded-2xl py-2 text-[0.97rem]"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <span aria-hidden="true" className="bubble inline-block size-6 shrink-0" />
            {promoUnlocked ? (
              <>
                <span>
                  Code <strong className="font-semibold">{PROMO_CODE}</strong> unlocked: 15% off
                </span>
                {promo ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-leaf-800">
                    <CheckIcon size={16} strokeWidth={3} />
                    Applied
                  </span>
                ) : (
                  <button type="button" className="link-btn" onClick={() => applyPromo(PROMO_CODE)}>
                    Apply to my bag
                  </button>
                )}
              </>
            ) : (
              <>
                <span aria-live="polite">
                  Pop five bubbles for a discount: <strong className="font-semibold">{Math.min(popped, GOAL)} of 5</strong>
                </span>
                <button type="button" className="link-btn" onClick={popRandom}>
                  Pop one for me
                </button>
              </>
            )}
          </div>
        </div>

        <div className="rise-in pointer-events-auto" style={{ "--d": "200ms" } as CSSProperties}>
          <FeaturedCover onOpen={() => openPreview("issue-07")} />
        </div>
      </div>
    </section>
  );
}
