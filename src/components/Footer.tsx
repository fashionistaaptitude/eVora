import { currentYear } from "../data/catalog";
import { RisingBubbles } from "./Decor";
import { ArrowUpIcon } from "./Icons";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "#library", label: "The library" },
      { href: "#pass", label: "Season Pass" },
      { href: "#forecast", label: "The Forecast" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "#about", label: "About Linnea" },
      { href: "#faq", label: "Questions" },
      { href: "mailto:hello@dewpoint.example", label: "hello@dewpoint.example" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="water-5 relative isolate overflow-hidden text-white">
      <RisingBubbles count={7} seed={5} />

      <div className="relative mx-auto max-w-[1240px] px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <Logo light size={40} />
            <p className="mt-4 max-w-sm text-azure-100">
              Digital magazines from the future we were promised. Made under clear skies by one person, four times a year.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="label text-azure-200">{col.title}</p>
              <ul className="mt-3 grid gap-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-9 items-center underline decoration-white/0 underline-offset-4 transition [overflow-wrap:anywhere] hover:decoration-leaf-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6">
          <p className="text-[0.94rem] text-azure-100">
            © {currentYear} Dewpoint Editions. A demo storefront: nothing here is charged or shipped.
          </p>
          <a href="#top" className="gel gel-glass">
            <ArrowUpIcon size={18} />
            Back to the surface
          </a>
        </div>
      </div>
    </footer>
  );
}
