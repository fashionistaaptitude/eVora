import { useState } from "react";
import { formatPrice, nextIssue, passId, passPlans, type Billing } from "../data/catalog";
import { Reveal, useSafeId } from "../hooks";
import { useStore } from "../store";
import { cn } from "../utils/cn";
import { RisingBubbles, Surface } from "./Decor";
import { GlossIcon } from "./GlossIcon";
import { BookIcon, CheckIcon, PlusIcon, StarIcon } from "./Icons";

function WeatherGlyph() {
  const id = useSafeId("wx");
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 96 80" className="h-[72px] w-[86px] shrink-0">
      <defs>
        <radialGradient id={`${id}s`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset=".55" stopColor="#ffc94a" />
          <stop offset="1" stopColor="#f08c00" />
        </radialGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bfe6fb" />
        </linearGradient>
      </defs>
      <circle cx="62" cy="28" r="26" fill="#ffe08a" opacity=".45" />
      <circle cx="62" cy="28" r="18" fill={`url(#${id}s)`} stroke="#d97f00" strokeWidth="1" />
      <ellipse cx="57" cy="20" rx="10" ry="6" fill="#fff" opacity=".6" />
      <path
        d="M24 72a15 15 0 0 1-2.500-29.800A20 20 0 0 1 60 38.500 17 17 0 0 1 62 72H24Z"
        fill={`url(#${id}c)`}
        stroke="#5aa7dc"
        strokeWidth="1.200"
      />
      <path d="M22 48a13 13 0 0 1 12-6 18 18 0 0 1 24-3" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9" />
    </svg>
  );
}

export function SeasonPass() {
  const { inBag, toggle } = useStore();
  const [billing, setBilling] = useState<Billing>("yearly");
  const days = nextIssue.daysLeft;

  return (
    <section id="pass" className="water-1 relative isolate scroll-mt-10 overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-44">
      <div aria-hidden="true" className="rays" />
      <RisingBubbles count={12} seed={1} />
      <Surface />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="max-w-2xl">
            <p className="label text-azure-900">Season Pass</p>
            <h2 className="glow-text mt-3 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-light leading-[1.05] tracking-[-0.03em]">
              Four issues a year, <strong className="font-extrabold">delivered like weather.</strong>
            </h2>
            <p className="mt-4 text-lg">
              A new Dewpoint lands every season. With a pass it simply appears in your library, and you never think about checkout
              again.
            </p>
          </div>

          <div role="group" aria-label="Billing" className="chip gap-1 p-1">
            {(
              [
                { id: "yearly", label: "Pay yearly" },
                { id: "issue", label: "Pay per issue" },
              ] as { id: Billing; label: string }[]
            ).map((opt) => (
              <button key={opt.id} type="button" className="seg-btn" aria-pressed={billing === opt.id} onClick={() => setBilling(opt.id)}>
                {opt.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.84fr]">
          {passPlans.map((plan, i) => {
            const id = passId(plan.tier, billing);
            const selected = inBag(id);
            const price = billing === "yearly" ? plan.yearly : plan.perIssue;
            return (
              <Reveal key={plan.tier} delay={i * 90} className="flex">
                <article className="glass-bright relative flex w-full flex-col rounded-[26px] p-6 sm:p-7">
                  {plan.featured && (
                    <p className="absolute -top-3 right-6 rounded-full border border-sun-600 bg-[linear-gradient(180deg,#fff0b8,#ffc94a)] px-3 py-1 font-display text-[13px] font-extrabold text-[#4a2500] shadow-[0_6px_12px_-6px_rgba(140,70,0,.7)]">
                      Most complete
                    </p>
                  )}
                  <div className="flex items-center gap-3.5">
                    <GlossIcon tone={plan.featured ? "leaf" : "azure"} className="size-12">
                      {plan.featured ? <StarIcon /> : <BookIcon />}
                    </GlossIcon>
                    <div>
                      <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em]">{plan.name}</h3>
                      <p className="text-[0.97rem] leading-snug text-ink-soft">{plan.blurb}</p>
                    </div>
                  </div>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.04em]">{formatPrice(price)}</span>
                    <span className="text-ink-soft">{billing === "yearly" ? "a year" : "an issue"}</span>
                  </p>
                  <p className="mt-1.5 text-[0.97rem] text-ink-soft">
                    {billing === "yearly"
                      ? `Works out at ${formatPrice(plan.yearly / 4)} an issue.`
                      : "Charged only when a new issue ships."}
                  </p>

                  <ul className="mb-8 mt-6 grid gap-2.5">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <CheckIcon size={18} strokeWidth={3} className="mt-1 shrink-0 text-leaf-700" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    aria-pressed={selected}
                    className={cn("gel gel-lg mt-auto w-full", selected ? "gel-glass" : plan.featured ? "gel-green" : "gel-blue")}
                  >
                    {selected ? <CheckIcon size={20} strokeWidth={3} /> : <PlusIcon size={20} strokeWidth={2.5} />}
                    {selected ? "In your bag" : `Add ${plan.name} pass`}
                  </button>
                </article>
              </Reveal>
            );
          })}

          {/* Sidebar-gadget style forecast */}
          <Reveal delay={180} className="flex md:col-span-2 lg:col-span-1">
            <aside aria-label="Next issue forecast" className="glass flex w-full flex-col rounded-[26px] p-6 sm:p-7">
              <p className="label text-azure-900">Forecast</p>
              <div className="mt-4 flex items-center gap-4">
                <WeatherGlyph />
                <p className="leading-tight">
                  <span className="block font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.04em]">{days}</span>
                  {days === 1 ? "day" : "days"} until Issue {nextIssue.number}
                </p>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.01em]">{nextIssue.title}</h3>
              <p className="mt-1 text-[0.97rem] leading-snug">
                {nextIssue.blurb} Due {nextIssue.dateLabel}.
              </p>
              <div className="mt-auto pt-6">
                <div
                  className="aero-progress"
                  role="progressbar"
                  aria-label={`Issue ${nextIssue.number} production progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={nextIssue.progress}
                >
                  <span style={{ width: `${nextIssue.progress}%` }} />
                </div>
                <p className="mt-2 flex justify-between text-[0.94rem]">
                  <span>Rendering and layout</span>
                  <span className="font-semibold">{nextIssue.progress}%</span>
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
