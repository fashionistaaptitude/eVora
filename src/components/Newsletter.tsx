import { useRef, useState, type FormEvent } from "react";
import { Reveal, useSafeId } from "../hooks";
import { RisingBubbles } from "./Decor";
import { GlossIcon } from "./GlossIcon";
import { CheckIcon, MailIcon } from "./Icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const ids = useSafeId("forecast");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError("That doesn’t look like an email address yet. Try name@example.com.");
      input.current?.focus();
      return;
    }
    setDone(true);
  };

  return (
    <section id="forecast" className="water-4 relative isolate scroll-mt-10 overflow-hidden py-20 sm:py-28">
      <RisingBubbles count={9} seed={4} />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-bright grid items-center gap-8 rounded-[30px] p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <div>
              <p className="label text-azure-700">The Forecast</p>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-light leading-[1.06] tracking-[-0.03em]">
                One email a month. <strong className="font-extrabold">One free wallpaper.</strong>
              </h2>
              <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
                A short letter about what I’m rendering and reading, with a wallpaper attached. It’s also where new issues are
                announced first.
              </p>
            </div>

            {done ? (
              <div role="status" className="flex items-start gap-4 rounded-3xl border border-leaf-500 bg-leaf-100/80 p-5">
                <GlossIcon tone="leaf" className="size-12 rounded-full">
                  <CheckIcon strokeWidth={3} />
                </GlossIcon>
                <div>
                  <p className="font-display text-xl font-bold">You’re on the list.</p>
                  <p className="mt-1 text-ink-soft">
                    The next Forecast goes to{" "}
                    <strong className="font-semibold text-ink [overflow-wrap:anywhere]">{email.trim()}</strong>. This demo
                    doesn’t send real email.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <label htmlFor={`${ids}-email`} className="font-display font-bold">
                  Your email address
                </label>
                <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <MailIcon size={19} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
                    <input
                      id={`${ids}-email`}
                      ref={input}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      aria-invalid={!!error}
                      aria-describedby={`${ids}-hint`}
                      placeholder="name@example.com"
                      className="field h-[3.25rem] rounded-full pl-11"
                    />
                  </div>
                  <button type="submit" className="gel gel-green gel-lg">
                    Send me the Forecast
                  </button>
                </div>
                <p id={`${ids}-hint`} className="mt-2.5 text-[0.94rem]" role={error ? "alert" : undefined}>
                  {error ? (
                    <span className="font-semibold text-[#a01a0a]">{error}</span>
                  ) : (
                    <span className="text-ink-soft">Monthly at most. Unsubscribe with one click.</span>
                  )}
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
