import avatar from "../assets/raw/avatar.png";
import { totals } from "../data/catalog";
import { Reveal } from "../hooks";
import { RisingBubbles } from "./Decor";
import { GlossIcon, type GlossTone } from "./GlossIcon";
import { BookIcon, LayersIcon, MusicIcon, SearchIcon, SunIcon } from "./Icons";

const STATS = [
  { value: String(totals.issues), label: "issues" },
  { value: String(totals.pages), label: "pages" },
  { value: "0", label: "adverts" },
];

const STEPS: { tone: GlossTone; icon: typeof BookIcon; weeks: string; title: string }[] = [
  { tone: "azure", icon: SearchIcon, weeks: "Weeks 1–3", title: "Research" },
  { tone: "violet", icon: BookIcon, weeks: "Weeks 4–6", title: "Writing" },
  { tone: "sun", icon: SunIcon, weeks: "Weeks 7–10", title: "Rendering" },
  { tone: "leaf", icon: LayersIcon, weeks: "Weeks 11–12", title: "Layout" },
];

export function About() {
  return (
    <section id="about" className="water-2 relative isolate scroll-mt-10 overflow-hidden py-20 sm:py-28">
      <RisingBubbles count={12} seed={2} />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-bright grid gap-10 rounded-[30px] p-6 sm:p-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 lg:p-14">
            {/* Messenger-style contact card */}
            <div className="mx-auto w-full max-w-[280px] lg:mx-0">
              <div className="buddy-frame">
                <img
                  src={avatar}
                  alt="Avatar of Linnea Abara, with curly dark hair, round glasses, a lime-green hoodie and teal headphones"
                  width={360}
                  height={360}
                  className="block aspect-square w-full rounded-[14px] object-cover"
                />
              </div>
              <p className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em]">Linnea Abara</p>
              <p className="mt-1.5 flex items-center gap-2 text-[0.97rem] font-semibold text-leaf-800">
                <span className="status-dot" />
                Online: rendering Issue 08
              </p>
              <p className="mt-2 flex items-start gap-2 text-[0.97rem] italic text-ink-soft">
                <MusicIcon size={16} className="mt-1 shrink-0" />
                Listening to rain sounds and old start-up chimes
              </p>
            </div>

            <div>
              <p className="label text-azure-700">About the studio</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-light leading-[1.06] tracking-[-0.03em]">
                Made by one person <strong className="font-extrabold">who never got over 2007.</strong>
              </h2>
              <div className="mt-5 grid max-w-[62ch] gap-4 text-lg">
                <p>
                  Hi, I’m Linnea. I grew up on tropical-fish screensavers and the firm belief that technology was about to make the
                  air cleaner. Dewpoint is where I keep that future switched on.
                </p>
                <p>
                  Each issue takes about three months. I research it, write it, render every image and lay out every page myself.
                  Then I export it, pour a very large tea and start the next one.
                </p>
              </div>

              <dl className="mt-8 grid max-w-[396px] grid-cols-3 gap-3 sm:gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="bubble grid aspect-square w-full place-content-center text-center">
                    <dd className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em]">{s.value}</dd>
                    <dt className="mt-1 text-[0.94rem] leading-none text-ink-soft">{s.label}</dt>
                  </div>
                ))}
              </dl>

              <h3 className="mt-10 font-display text-lg font-bold">How an issue gets made</h3>
              <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
                {STEPS.map(({ tone, icon: Icon, weeks, title }) => (
                  <li key={title} className="flex items-center gap-3">
                    <GlossIcon tone={tone} className="size-11">
                      <Icon />
                    </GlossIcon>
                    <p className="leading-tight">
                      <span className="block text-sm text-ink-soft">{weeks}</span>
                      <span className="font-display font-bold">{title}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
