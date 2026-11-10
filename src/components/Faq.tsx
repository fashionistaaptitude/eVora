import { useState } from "react";
import { Reveal, useSafeId } from "../hooks";
import { cn } from "../utils/cn";
import { RisingBubbles } from "./Decor";
import { ChevronDownIcon } from "./Icons";

const QUESTIONS = [
  {
    q: "What do I actually get?",
    a: "Each issue comes as a high-resolution PDF plus a link to the web edition, which opens in any modern browser. Both are yours to keep, and both arrive by email seconds after checkout.",
  },
  {
    q: "Will it work on my tablet or phone?",
    a: "Yes. The PDF is laid out at tablet size, so it reads well on an iPad, an Android tablet or a laptop. On a phone, the web edition reflows into a single column.",
  },
  {
    q: "Is there any DRM?",
    a: "No. The files are plain PDFs with no app and no login. Your order email is printed quietly on the last page, and that’s the only lock.",
  },
  {
    q: "Can I use the wallpapers and icons in my own work?",
    a: "Personal use is always fine. The Gloss Icon Set includes a commercial licence, so you can ship it in client projects. Wallpapers are for personal use only.",
  },
  {
    q: "What if I don’t like it?",
    a: "Email within 14 days and I’ll refund you. There’s no form to fill in, and you can keep the file.",
  },
  {
    q: "Is there a print edition?",
    a: "Not yet. Dewpoint is designed for glowing screens, and the gloss doesn’t survive paper. If that changes, Season Pass holders will hear first.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useSafeId("faq");

  return (
    <section id="faq" className="water-3 relative isolate scroll-mt-10 overflow-hidden py-20 text-white sm:py-28">
      <RisingBubbles count={10} seed={3} />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-8">
        <Reveal>
          <p className="label">Questions</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-light leading-[1.05] tracking-[-0.03em]">
            Clear answers, <strong className="font-extrabold">no fine print.</strong>
          </h2>
          <p className="mt-4 max-w-md text-lg">
            Still unsure about something? Write to{" "}
            <a
              href="mailto:hello@dewpoint.example"
              className="font-semibold underline decoration-2 underline-offset-4 hover:decoration-leaf-300"
            >
              hello@dewpoint.example
            </a>{" "}
            and I’ll reply myself, usually within a day.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="grid gap-3">
            {QUESTIONS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="glass-dark rounded-[20px]">
                  <h3>
                    <button
                      type="button"
                      id={`${base}-q${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${base}-a${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 rounded-[20px] px-5 py-4 text-left font-display text-[1.1rem] font-bold leading-snug"
                    >
                      {item.q}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-full border border-white/40 bg-white/15 transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                      >
                        <ChevronDownIcon size={18} />
                      </span>
                    </button>
                  </h3>
                  <div id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`} data-open={isOpen} className="faq-panel">
                    <div>
                      <p className="max-w-[62ch] px-5 pb-5">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
