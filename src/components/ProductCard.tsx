import { formatPrice, nextIssue, type Product } from "../data/catalog";
import { useStore } from "../store";
import { cn } from "../utils/cn";
import { Cover, CoverArt } from "./Cover";
import { BookIcon, CheckIcon, MailIcon, PlusIcon } from "./Icons";

const cardClass =
  "aero-item group grid h-full w-full grid-cols-[112px_minmax(0,1fr)] gap-x-4 p-3 sm:flex sm:flex-col sm:gap-0 sm:p-3.5";

export function ProductCard({ product }: { product: Product }) {
  const { inBag, toggle, openPreview } = useStore();
  const selected = inBag(product.id);

  return (
    <article data-selected={selected} className={cardClass}>
      <div className="sm:w-full">
        <button
          type="button"
          onClick={() => openPreview(product.id)}
          aria-label={`Preview ${product.kicker}: ${product.title}`}
          className="cover-lift relative block w-full rounded-md"
        >
          <Cover product={product} />
          <span aria-hidden="true" className="flip-hint">
            <BookIcon size={14} />
            {product.preview ? "Flip through" : "Look inside"}
          </span>
          {selected && (
            <span aria-hidden="true" className="check-badge">
              <CheckIcon size={16} strokeWidth={3} />
            </span>
          )}
        </button>
        {/* Cover Flow-style reflection */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-0.5 hidden h-7 overflow-hidden [mask-image:linear-gradient(to_bottom,rgba(0,0,0,.3),transparent_90%)] sm:block"
        >
          <div className="relative aspect-[3/4] w-full -scale-y-100 overflow-hidden rounded-md">
            <CoverArt product={product} />
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-col sm:flex-1">
        <p className="label flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-soft">
          {product.meta}
          {product.badge && (
            <span className="rounded-full border border-sun-600 bg-[linear-gradient(180deg,#fff0b8,#ffc94a)] px-2 py-px font-display text-[11px] font-extrabold normal-case tracking-normal text-[#4a2500]">
              {product.badge}
            </span>
          )}
        </p>
        <h3 className="mt-1.5 font-display text-[1.2rem] font-bold leading-tight tracking-[-0.01em]">{product.title}</h3>
        <p className="mt-1 text-[0.97rem] leading-snug text-ink-soft">{product.tagline}</p>

        <div className="mt-auto flex flex-wrap items-end gap-2 pt-3">
          <p className="mr-auto flex flex-col leading-none">
            {product.compareAt && (
              <s className="mb-1 text-sm text-ink-soft">
                <span className="sr-only">Was </span>
                {formatPrice(product.compareAt)}
              </s>
            )}
            <span className="font-display text-[1.6rem] font-extrabold tracking-[-0.02em]">{formatPrice(product.price)}</span>
          </p>
          <button
            type="button"
            onClick={() => openPreview(product.id)}
            className="gel gel-glass gel-icon hidden sm:inline-flex"
            aria-label={`Look inside ${product.title}`}
            title="Look inside"
          >
            <BookIcon size={19} />
          </button>
          <button
            type="button"
            onClick={() => toggle(product.id)}
            aria-pressed={selected}
            className={cn("gel w-full sm:w-auto sm:min-w-[7.5rem] sm:px-4", selected ? "gel-glass" : "gel-green")}
          >
            {selected ? (
              <CheckIcon size={18} strokeWidth={3} />
            ) : (
              <PlusIcon size={18} strokeWidth={2.5} className="sm:hidden" />
            )}
            {selected ? "In bag" : "Add to bag"}
          </button>
        </div>
      </div>
    </article>
  );
}

/** The issue that is still being made: a frosted cover with a Vista-green progress bar. */
export function TeaserCard() {
  return (
    <article className={cardClass}>
      <div className="sm:w-full">
        <div className="@container relative isolate aspect-[3/4] w-full overflow-hidden rounded-md bg-[linear-gradient(160deg,#e6f8ff_0%,#8fd6fb_48%,#b6ec6f_100%)] cover-shadow">
          <div aria-hidden="true" className="absolute -left-[20%] top-[8%] size-[85%] rounded-full bg-white/70 blur-2xl" />
          <p
            aria-hidden="true"
            className="absolute inset-x-0 top-0 p-[6.5cqw] font-display text-[length:13.5cqw] font-extrabold lowercase leading-[0.9] tracking-[-0.035em] text-ink/80"
          >
            dewpoint
          </p>
          <p
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center font-display text-[length:46cqw] font-extrabold leading-none tracking-[-0.06em] text-white [text-shadow:0_1cqw_5cqw_rgba(11,92,184,.55)]"
          >
            {nextIssue.number}
          </p>
          <div className="absolute inset-x-[7cqw] bottom-[7cqw]">
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
          </div>
          <div aria-hidden="true" className="cover-gloss absolute inset-0" />
        </div>
        <div aria-hidden="true" className="mt-0.5 hidden h-7 sm:block" />
      </div>

      <div className="flex min-w-0 flex-col sm:flex-1">
        <p className="label text-ink-soft">Issue {nextIssue.number} · in production</p>
        <h3 className="mt-1.5 font-display text-[1.2rem] font-bold leading-tight tracking-[-0.01em]">{nextIssue.title}</h3>
        <p className="mt-1 text-[0.97rem] leading-snug text-ink-soft">{nextIssue.blurb}</p>

        <div className="mt-auto flex flex-wrap items-end gap-2 pt-3">
          <p className="mr-auto flex flex-col leading-none">
            <span className="mb-1 text-sm text-ink-soft">Rendering</span>
            <span className="font-display text-[1.6rem] font-extrabold tracking-[-0.02em]">{nextIssue.progress}%</span>
          </p>
          <a href="#forecast" className="gel gel-glass w-full sm:w-auto">
            <MailIcon size={18} />
            Notify me
          </a>
        </div>
      </div>
    </article>
  );
}
