import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { formatPrice, getProduct, type Product } from "../data/catalog";
import { useDialog, useMediaQuery, useSafeId } from "../hooks";
import { useStore } from "../store";
import { cn } from "../utils/cn";
import { Cover } from "./Cover";
import { GlossIcon } from "./GlossIcon";
import { BookIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, DownloadIcon, PlusIcon, XIcon } from "./Icons";
import { LogoOrb } from "./Logo";

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------ Sample pages ------------------------------ */

function Folio({ page }: { page: number }) {
  return (
    <p className="mt-auto flex justify-between pt-[3cqw] font-tech text-[length:3cqw] uppercase leading-none tracking-[0.14em] text-ink-soft">
      <span>dewpoint</span>
      <span>{pad(page)}</span>
    </p>
  );
}

function ContentsPage({ product }: { product: Product }) {
  const preview = product.preview!;
  return (
    <div className="flex h-full flex-col p-[8cqw]">
      <p className="font-tech text-[length:3cqw] uppercase leading-none tracking-[0.14em]" style={{ color: product.accent[0] }}>
        {product.kicker} · {product.season}
      </p>
      <p className="mt-[3cqw] font-display text-[length:12cqw] font-light leading-none tracking-[-0.03em]">Contents</p>
      <ol className="mt-[5cqw]">
        {preview.contents.map((c) => (
          <li key={c.page} className="flex items-baseline gap-[4cqw] border-t border-azure-200 py-[3cqw]">
            <span
              className="w-[11cqw] shrink-0 font-display text-[length:7cqw] font-extrabold leading-none tracking-[-0.03em]"
              style={{ color: product.accent[0] }}
            >
              {pad(c.page)}
            </span>
            <span className="text-[length:4.7cqw] font-semibold leading-tight">{c.title}</span>
          </li>
        ))}
      </ol>
      <Folio page={2} />
    </div>
  );
}

function FeaturePage({ product }: { product: Product }) {
  const { feature } = product.preview!;
  return (
    <div className="absolute inset-0">
      {product.art.type === "image" && (
        <img
          src={product.art.src}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full scale-[1.4] object-cover object-[50%_55%]"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${product.accent[1]} 6%, ${product.accent[1]}e6 36%, ${product.accent[1]}00 78%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-[8cqw] text-white">
        <p className="font-tech text-[length:3cqw] uppercase leading-none tracking-[0.14em]">
          {feature.kicker} · page {pad(feature.page)}
        </p>
        <p className="mt-[3cqw] font-display text-[length:12cqw] font-extrabold leading-[0.95] tracking-[-0.035em]">{feature.title}</p>
        <p className="mt-[3.5cqw] text-[length:4.6cqw] leading-snug">{feature.standfirst}</p>
      </div>
    </div>
  );
}

function ArticlePage({ product }: { product: Product }) {
  const preview = product.preview!;
  const facts = [
    { value: String(product.pages ?? 0), label: "pages" },
    { value: String(preview.contents.length), label: "features" },
    { value: "0", label: "adverts" },
  ];
  return (
    <div className="flex h-full flex-col p-[8cqw]">
      <p className="font-tech text-[length:3cqw] uppercase leading-none tracking-[0.14em]" style={{ color: product.accent[0] }}>
        {preview.feature.title}
      </p>
      <div className="mt-[4.5cqw] text-[length:4.5cqw] leading-[1.42]">
        {preview.feature.body.map((para, i) => (
          <p
            key={i}
            className={cn(
              i === 0 &&
                "first-letter:float-left first-letter:mr-[1.6cqw] first-letter:font-display first-letter:text-[length:15.5cqw] first-letter:font-extrabold first-letter:leading-[0.82] first-letter:text-azure-600",
              i > 0 && "mt-[2.6cqw]"
            )}
          >
            {para}
          </p>
        ))}
      </div>
      <dl className="mt-auto grid grid-cols-3 gap-[2cqw] border-t border-azure-200 pt-[3.5cqw]">
        {facts.map((f) => (
          <div key={f.label}>
            <dd className="font-display text-[length:9cqw] font-extrabold leading-none tracking-[-0.03em]" style={{ color: product.accent[0] }}>
              {f.value}
            </dd>
            <dt className="mt-[1cqw] text-[length:3.6cqw] leading-none text-ink-soft">{f.label}</dt>
          </div>
        ))}
      </dl>
      <Folio page={preview.feature.page + 1} />
    </div>
  );
}

function QuotePage({ product }: { product: Product }) {
  const preview = product.preview!;
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center overflow-hidden p-[9cqw] text-white"
      style={{ background: `linear-gradient(160deg, ${product.accent[0]}, ${product.accent[1]})` }}
    >
      <span aria-hidden="true" className="bubble absolute -right-[8cqw] top-[7cqw] size-[34cqw] opacity-80" />
      <span aria-hidden="true" className="bubble absolute bottom-[10cqw] left-[8cqw] size-[13cqw] opacity-70" />
      <span aria-hidden="true" className="bubble absolute bottom-[26cqw] right-[12cqw] size-[7cqw] opacity-70" />
      <p aria-hidden="true" className="font-display text-[length:30cqw] font-extrabold leading-[0.5] opacity-60">
        “
      </p>
      <p className="relative font-display text-[length:9cqw] font-light leading-[1.12] tracking-[-0.02em]">{preview.quote}</p>
      <p className="relative mt-[5cqw] font-tech text-[length:3cqw] uppercase leading-snug tracking-[0.14em]">
        From “{preview.feature.title}”
      </p>
    </div>
  );
}

function EndPage({ product }: { product: Product }) {
  const { inBag, toggle } = useStore();
  const selected = inBag(product.id);
  const remaining = Math.max(0, (product.pages ?? 6) - 6);
  return (
    <div className="flex h-full flex-col items-center justify-center p-[8cqw] text-center">
      <GlossIcon tone="azure" className="size-[18cqw]">
        <BookIcon />
      </GlossIcon>
      <p className="mt-[5cqw] font-display text-[length:9.5cqw] font-light leading-[1.05] tracking-[-0.03em]">
        <strong className="font-extrabold">{remaining} more pages</strong> where that came from.
      </p>
      <p className="mt-[3cqw] text-[length:4.6cqw] leading-snug text-ink-soft">PDF and web edition, yours to keep.</p>
      <button
        type="button"
        onClick={() => toggle(product.id)}
        aria-pressed={selected}
        className={cn("gel mt-[6cqw]", selected ? "gel-glass" : "gel-green")}
      >
        {selected ? <CheckIcon size={18} strokeWidth={3} /> : <PlusIcon size={18} strokeWidth={2.5} />}
        {selected ? "In your bag" : `Add for ${formatPrice(product.price)}`}
      </button>
    </div>
  );
}

/* --------------------------------- Reader --------------------------------- */

function Reader({ product }: { product: Product }) {
  const twoUp = useMediaQuery("(min-width: 640px)");
  const per = twoUp ? 2 : 1;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const touchX = useRef<number | null>(null);

  const pages = useMemo<{ name: string; node: ReactNode }[]>(
    () => [
      { name: "Cover", node: <Cover product={product} className="rounded-none shadow-none" /> },
      { name: "Contents", node: <ContentsPage product={product} /> },
      { name: "Feature opener", node: <FeaturePage product={product} /> },
      { name: "Feature", node: <ArticlePage product={product} /> },
      { name: "Pull quote", node: <QuotePage product={product} /> },
      { name: "Last page", node: <EndPage product={product} /> },
    ],
    [product]
  );

  const steps = Math.ceil(pages.length / per);
  const safeIndex = Math.min(index, steps - 1);

  const go = useCallback(
    (delta: 1 | -1) => {
      setDir(delta);
      setIndex((i) => Math.min(steps - 1, Math.max(0, Math.min(i, steps - 1) + delta)));
    },
    [steps]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  const start = safeIndex * per;
  const visible = pages.slice(start, start + per);
  const label =
    per === 2 ? `Pages ${start + 1}–${start + visible.length} of ${pages.length}` : `Page ${start + 1} of ${pages.length}`;

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <div
        key={`${safeIndex}-${per}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          "spread grid w-full rounded-md",
          per === 2 ? "max-w-[700px] grid-cols-2" : "max-w-[320px] grid-cols-1",
          dir > 0 ? "flip-next" : "flip-prev"
        )}
      >
        {visible.map((page, i) => (
          <div
            key={page.name}
            role="group"
            aria-label={`${page.name}, page ${start + i + 1}`}
            className={cn(
              "@container relative aspect-[3/4] overflow-hidden bg-[#fbfdff] text-ink",
              per === 2 ? (i === 0 ? "page-left rounded-l-md" : "page-right rounded-r-md") : "rounded-md"
            )}
          >
            {page.node}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="gel gel-glass gel-icon"
          onClick={() => go(-1)}
          disabled={safeIndex === 0}
          aria-label="Previous pages"
        >
          <ChevronLeftIcon />
        </button>
        <p
          aria-live="polite"
          className="min-w-[9.5rem] text-center text-[0.97rem] font-semibold text-white [text-shadow:0_1px_2px_rgba(4,30,71,.7)]"
        >
          {label}
        </p>
        <button
          type="button"
          className="gel gel-glass gel-icon"
          onClick={() => go(1)}
          disabled={safeIndex >= steps - 1}
          aria-label="Next pages"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </>
  );
}

/* ---------------------------------- Modal ---------------------------------- */

export function PreviewModal() {
  const { previewId, closePreview, inBag, toggle, openBag } = useStore();
  const product = previewId ? getProduct(previewId) : undefined;
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useSafeId("preview");
  useDialog(!!product, closePreview, ref);

  if (!product) return null;
  const selected = inBag(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-5">
      <div aria-hidden="true" className="backdrop-in absolute inset-0 bg-azure-950/60 backdrop-blur-sm" onClick={closePreview} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="modal-in glass-bright relative flex max-h-[calc(100dvh-0.75rem)] w-full max-w-[1200px] flex-col overflow-hidden rounded-t-[24px] outline-none sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[24px]"
      >
        <div className="aero-titlebar flex shrink-0 items-center gap-2.5 py-2 pl-4 pr-2">
          <LogoOrb size={22} />
          <p className="glow-text min-w-0 flex-1 truncate font-display text-[15px] font-bold">
            {product.preview ? "Flip through" : "Look inside"}: {product.kicker}
          </p>
          <button type="button" className="aero-close" onClick={closePreview} aria-label="Close preview">
            <XIcon size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:overflow-hidden">
          <div className="reader-stage flex flex-col items-center justify-center gap-5 px-4 py-6 sm:px-6 sm:py-8">
            {product.preview ? (
              <Reader key={product.id} product={product} />
            ) : (
              <div className="w-full max-w-[300px]">
                <Cover product={product} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 p-5 sm:p-7 lg:overflow-y-auto">
            <p className="label text-azure-700">
              {product.kicker} · {product.season}
            </p>
            <h2 id={titleId} className="-mt-1 font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em]">
              {product.title}
            </h2>
            <p className="text-ink-soft">{product.description}</p>

            {product.specs.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-5 gap-y-3 rounded-2xl border border-azure-200 bg-white/70 p-4">
                {product.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="label text-ink-soft">{s.label}</dt>
                    <dd className="mt-0.5 font-semibold">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.includes && (
              <div>
                <p className="font-display font-bold">What’s included</p>
                <ul className="mt-2 grid gap-1.5 text-[0.97rem]">
                  {product.includes.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckIcon size={17} strokeWidth={3} className="mt-1 shrink-0 text-leaf-700" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto flex flex-wrap items-end gap-3 border-t border-azure-200 pt-4">
              <p className="mr-auto flex flex-col leading-none">
                {product.compareAt && (
                  <s className="mb-1 text-sm text-ink-soft">
                    <span className="sr-only">Was </span>
                    {formatPrice(product.compareAt)}
                  </s>
                )}
                <span className="font-display text-[2.25rem] font-extrabold tracking-[-0.03em]">{formatPrice(product.price)}</span>
              </p>
              {selected && (
                <button type="button" className="gel gel-blue" onClick={openBag}>
                  Open bag
                </button>
              )}
              <button
                type="button"
                onClick={() => toggle(product.id)}
                aria-pressed={selected}
                className={cn("gel", selected ? "gel-glass" : "gel-green gel-lg")}
              >
                {selected ? <CheckIcon size={18} strokeWidth={3} /> : <PlusIcon size={20} strokeWidth={2.5} />}
                {selected ? "In your bag" : "Add to bag"}
              </button>
            </div>
            <p className="flex items-center gap-2 text-sm text-ink-soft">
              <DownloadIcon size={16} className="shrink-0" />
              Instant download, no DRM, free updates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
