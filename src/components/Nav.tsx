import { useEffect, useState } from "react";
import { useStore } from "../store";
import { cn } from "../utils/cn";
import { BagIcon, MenuIcon, XIcon } from "./Icons";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#library", label: "Library" },
  { href: "#pass", label: "Season Pass" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const { bag, openBag, bump } = useStore();
  const [open, setOpen] = useState(false);
  const count = bag.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="glass mx-auto flex h-[60px] max-w-[1240px] items-center gap-1.5 rounded-full pl-3 pr-2 sm:gap-2 sm:pl-4">
        <a href="#top" aria-label="Dewpoint, back to the top" className="shrink-0 rounded-full py-1 pr-1 sm:pr-2">
          <Logo />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-3.5 py-2 font-display text-[15px] font-bold text-ink transition hover:border-azure-400 hover:bg-white/80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={openBag}
          className="gel gel-green ml-auto max-[379px]:px-3 md:ml-2"
          aria-label={`Open your bag, ${count} ${count === 1 ? "item" : "items"}`}
        >
          <BagIcon size={18} />
          <span className="hidden min-[380px]:inline">Bag</span>
          <span
            key={bump}
            className={cn(
              "grid h-6 min-w-6 place-items-center rounded-full bg-leaf-900 px-1.5 font-sans text-[13px] font-semibold text-white [text-shadow:none]",
              bump > 0 && "bump"
            )}
          >
            {count}
          </span>
        </button>

        <button
          type="button"
          className="gel gel-glass gel-icon md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {open && (
        <nav aria-label="Primary" className="glass modal-in mx-auto mt-2 max-w-[1240px] rounded-3xl p-2 md:hidden">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-2xl px-4 font-display text-lg font-bold text-ink hover:bg-white/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
