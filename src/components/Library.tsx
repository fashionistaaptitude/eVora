import { useMemo, useState } from "react";
import { catalog, formatPrice, type Kind, type Product } from "../data/catalog";
import { Reveal } from "../hooks";
import { useStore } from "../store";
import { GlossIcon, type GlossTone } from "./GlossIcon";
import { ChevronDownIcon, ChevronRightIcon, DownloadIcon, HeartIcon, LayersIcon, RefreshIcon, SearchIcon, UnlockIcon } from "./Icons";
import { LogoOrb } from "./Logo";
import { ProductCard, TeaserCard } from "./ProductCard";

type Filter = "all" | Exclude<Kind, "pass">;
type Sort = "featured" | "newest" | "price-asc" | "price-desc" | "title";

const FILTERS: { id: Filter; label: string; folder: string }[] = [
  { id: "all", label: "All", folder: "Everything" },
  { id: "issue", label: "Issues", folder: "Issues" },
  { id: "bundle", label: "Bundles", folder: "Bundles" },
  { id: "extra", label: "Extras", folder: "Extras" },
];

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest first" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "title", label: "Title, A to Z" },
];

const FEATURES: { tone: GlossTone; icon: typeof DownloadIcon; title: string; text: string }[] = [
  { tone: "azure", icon: DownloadIcon, title: "Instant download", text: "PDF and web edition, ready the moment you check out." },
  { tone: "leaf", icon: UnlockIcon, title: "No DRM, ever", text: "Plain files. Read them on anything and keep them for good." },
  { tone: "sun", icon: RefreshIcon, title: "Free updates", text: "Corrections and bonus pages are added to your copy." },
  { tone: "violet", icon: HeartIcon, title: "One-person studio", text: "Every sale pays for the next issue and nothing else." },
];

function searchable(p: Product) {
  return [p.title, p.kicker, p.tagline, p.description, p.season, ...(p.preview?.contents.map((c) => c.title) ?? [])]
    .join(" ")
    .toLowerCase();
}

function sortProducts(list: Product[], sort: Sort) {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.released.localeCompare(a.released));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "title":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}

export function Library() {
  const { bag, total, openBag } = useStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    const filtered = catalog.filter((p) => (filter === "all" || p.kind === filter) && (!q || searchable(p).includes(q)));
    return sortProducts(filtered, sort);
  }, [filter, sort, q]);

  const counts = useMemo(
    () => ({
      all: catalog.length,
      issue: catalog.filter((p) => p.kind === "issue").length,
      bundle: catalog.filter((p) => p.kind === "bundle").length,
      extra: catalog.filter((p) => p.kind === "extra").length,
    }),
    []
  );

  const showTeaser = !q && sort === "featured" && (filter === "all" || filter === "issue");
  const folder = FILTERS.find((f) => f.id === filter)?.folder ?? "Everything";

  return (
    <section id="library" className="meadow relative flow-root scroll-mt-20 pb-24 sm:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-[420px] size-[520px] rounded-full bg-azure-200/50 blur-3xl" />
        <div className="absolute -left-48 top-[900px] size-[560px] rounded-full bg-leaf-200/45 blur-3xl" />
        <div className="absolute -right-32 bottom-10 size-[420px] rounded-full bg-white/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* What you get, sitting on the hills */}
        <ul className="glass relative z-10 -mt-16 grid grid-cols-2 gap-x-4 gap-y-5 rounded-[28px] p-5 sm:-mt-20 sm:gap-x-6 sm:p-6 lg:grid-cols-4">
          {FEATURES.map(({ tone, icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-3.5">
              <GlossIcon tone={tone} className="size-11">
                <Icon />
              </GlossIcon>
              <div>
                <p className="font-display text-[1.02rem] font-bold leading-tight">{title}</p>
                <p className="mt-1 text-[0.94rem] leading-snug text-ink-soft">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 max-w-2xl sm:mt-24">
          <p className="label text-azure-700">The library</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-light leading-[1.05] tracking-[-0.03em]">
            Pick an issue. <strong className="font-extrabold">They all end well.</strong>
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Each issue is a self-contained, ad-free deep dive. Select the ones you want like files on a desktop, then check out
            once.
          </p>
        </Reveal>

        <Reveal className="mt-8 sm:mt-10">
          {/* The pane is nearly opaque, so skip the costly backdrop blur on this very tall window */}
          <div className="glass no-blur overflow-hidden rounded-[22px]">
            {/* Title bar */}
            <div className="aero-titlebar flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2.5 sm:px-4">
              <LogoOrb size={22} />
              <p className="glow-text font-display text-[15px] font-bold">Library</p>
              <p
                aria-label={`Current folder: ${folder}`}
                className="ml-2 hidden h-9 min-w-0 flex-1 items-center gap-1 rounded-lg border border-azure-700/30 bg-white/80 px-3 text-[15px] shadow-[inset_0_1px_2px_rgba(6,48,107,.12)] md:flex"
              >
                <span aria-hidden="true" className="flex min-w-0 items-center gap-1">
                  Dewpoint
                  <ChevronRightIcon size={14} className="text-ink-soft" />
                  Library
                  <ChevronRightIcon size={14} className="text-ink-soft" />
                  <strong className="truncate font-semibold">{folder}</strong>
                </span>
              </p>
              <label className="relative ml-auto block w-full sm:w-64 md:ml-0">
                <span className="sr-only">Search the library</span>
                <SearchIcon size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the library"
                  className="field h-10 pl-10"
                />
              </label>
            </div>

            {/* Command bar */}
            <div className="aero-commandbar flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2 sm:px-4">
              <div role="group" aria-label="Filter by type" className="-m-1 flex gap-1 overflow-x-auto p-1">
                {FILTERS.map((f) => (
                  <button key={f.id} type="button" className="seg-btn" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                    {f.label}
                    <span className="seg-count hidden sm:inline">{counts[f.id]}</span>
                  </button>
                ))}
              </div>
              <label className="ml-auto flex items-center gap-2.5 text-[15px]">
                <span className="font-semibold text-ink-soft">Sort</span>
                <span className="relative block">
                  <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field h-10 w-auto text-[15px]">
                    {SORTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                </span>
              </label>
            </div>

            {/* Items */}
            <div className="bg-white/90 p-2 sm:p-4">
              {visible.length > 0 ? (
                <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visible.map((p) => (
                    <li key={p.id} className="flex">
                      <ProductCard product={p} />
                    </li>
                  ))}
                  {showTeaser && (
                    <li className="flex">
                      <TeaserCard />
                    </li>
                  )}
                </ul>
              ) : (
                <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
                  <span aria-hidden="true" className="bubble block size-20" />
                  <h3 className="mt-5 font-display text-2xl font-bold">Nothing matches “{query.trim()}”</h3>
                  <p className="mt-2 text-ink-soft">Try a topic like glass, cities or wallpapers, or clear the search to see everything.</p>
                  <button
                    type="button"
                    className="gel gel-blue mt-6"
                    onClick={() => {
                      setQuery("");
                      setFilter("all");
                    }}
                  >
                    Show everything
                  </button>
                </div>
              )}
            </div>

            {/* Details pane */}
            <div className="aero-details flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
              <GlossIcon tone="azure" className="size-10">
                <LayersIcon />
              </GlossIcon>
              <p className="min-w-0 flex-1 text-[0.97rem] leading-snug" aria-live="polite">
                <strong className="font-semibold">
                  {visible.length} {visible.length === 1 ? "item" : "items"}
                </strong>
                {q ? ` matching “${query.trim()}”` : ` in ${folder}`}
                <span className="block text-ink-soft">
                  {bag.length > 0
                    ? `${bag.length} selected for your bag · ${formatPrice(total)}`
                    : "Nothing selected yet. Add an issue to start your bag."}
                </span>
              </p>
              {bag.length > 0 && (
                <button type="button" className="gel gel-blue" onClick={openBag}>
                  Open bag
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
