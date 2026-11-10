import { getProduct, type Product } from "../data/catalog";
import { cn } from "../utils/cn";
import { GlossIcon, type GlossTone } from "./GlossIcon";
import { CloudIcon, DropIcon, GlobeIcon, HeartIcon, InfinityIcon, LeafIcon, MailIcon, MusicIcon, StarIcon, SunIcon } from "./Icons";

const ICON_GRID: { tone: GlossTone; icon: typeof CloudIcon }[] = [
  { tone: "azure", icon: CloudIcon },
  { tone: "leaf", icon: LeafIcon },
  { tone: "sun", icon: SunIcon },
  { tone: "aqua", icon: DropIcon },
  { tone: "violet", icon: MusicIcon },
  { tone: "azure", icon: GlobeIcon },
  { tone: "rose", icon: HeartIcon },
  { tone: "sun", icon: StarIcon },
  { tone: "leaf", icon: MailIcon },
];

function StackArt() {
  const left = getProduct("issue-05");
  const right = getProduct("issue-03");
  const front = getProduct("issue-07");
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#8fd6fb_0%,#cdefff_55%,#f2fbff_100%)]">
      <div className="absolute left-1/2 top-[20%] h-[56%] w-[70%] -translate-x-1/2 rounded-full bg-white/80 blur-xl" />
      {left && (
        <div className="absolute left-[7%] top-[28%] w-[44%] -rotate-12">
          <Cover product={left} />
        </div>
      )}
      {right && (
        <div className="absolute right-[7%] top-[28%] w-[44%] rotate-12">
          <Cover product={right} />
        </div>
      )}
      {front && (
        <div className="absolute left-[27%] top-[24%] w-[46%]">
          <Cover product={front} />
        </div>
      )}
    </div>
  );
}

function IconsArt() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(180deg,#bfe9fd_0%,#e9f8ff_45%,#ffffff_100%)]">
      <div className="absolute inset-x-[17%] top-[23%] grid grid-cols-3 gap-[5%]">
        {ICON_GRID.map(({ tone, icon: Icon }, i) => (
          <GlossIcon key={i} tone={tone} className="aspect-square w-full">
            <Icon />
          </GlossIcon>
        ))}
      </div>
    </div>
  );
}

function PassArt({ tier }: { tier: "reader" | "collector" }) {
  return (
    <div
      className={cn(
        "absolute inset-0 grid place-items-center",
        tier === "collector"
          ? "bg-[linear-gradient(160deg,#b6ec6f_0%,#2a9bf0_55%,#0a4a9a_100%)]"
          : "bg-[linear-gradient(160deg,#93d8fb_0%,#2a9bf0_50%,#0a4a9a_100%)]"
      )}
    >
      <GlossIcon tone={tier === "collector" ? "leaf" : "azure"} className="w-[58%] rounded-full aspect-square">
        <InfinityIcon />
      </GlossIcon>
    </div>
  );
}

/** Just the artwork, filling its positioned parent. */
export function CoverArt({ product }: { product: Product }) {
  const art = product.art;
  if (art.type === "image") {
    return <img src={art.src} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" />;
  }
  if (art.type === "stack") return <StackArt />;
  if (art.type === "icons") return <IconsArt />;
  return <PassArt tier={art.tier} />;
}

/** Small artwork-only thumbnail for bag rows and order summaries. */
export function Thumb({ product, className }: { product: Product; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative block aspect-[3/4] shrink-0 overflow-hidden rounded-[5px] bg-azure-200 cover-shadow", className)}>
      <CoverArt product={product} />
      <span className="cover-gloss absolute inset-0" />
    </span>
  );
}

const toneClass = {
  white: "text-white [text-shadow:0_0.4cqw_2cqw_rgba(4,30,71,.6)]",
  ink: "text-ink [text-shadow:0_0_3cqw_rgba(255,255,255,.75)]",
};

/**
 * A full magazine cover. All type is sized in container units, so the same
 * cover works as a 110px thumbnail and as the 370px hero.
 */
export function Cover({ product, className }: { product: Product; className?: string }) {
  const art = product.art;
  const top = art.type === "image" ? art.top : "ink";
  const bottom = art.type === "image" ? art.bottom : "ink";
  const scrimTop = art.type === "image" ? art.scrimTop : "rgba(255,255,255,0)";
  const scrimBottom = art.type === "image" ? art.scrimBottom : "rgba(255,255,255,.85)";

  return (
    <div
      role="img"
      aria-label={`Cover of ${product.kicker}: ${product.title}`}
      className={cn(
        "@container relative isolate aspect-[3/4] w-full select-none overflow-hidden rounded-md bg-azure-200 text-left cover-shadow",
        className
      )}
    >
      <CoverArt product={product} />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${scrimTop} 0%, transparent 30%), linear-gradient(to top, ${scrimBottom} 0%, transparent 54%)`,
        }}
      />
      <div aria-hidden="true" className={cn("absolute inset-x-0 top-0 flex items-start justify-between p-[6.5cqw]", toneClass[top])}>
        <span className="font-display text-[length:13.5cqw] font-extrabold lowercase leading-[0.9] tracking-[-0.035em]">dewpoint</span>
        <span className="cover-orb size-[14cqw] font-display text-[length:4.6cqw] font-extrabold leading-none [text-shadow:0_0.3cqw_0.6cqw_rgba(4,30,71,.6)]">
          {product.orb}
        </span>
      </div>
      <div aria-hidden="true" className={cn("absolute inset-x-0 bottom-0 p-[6.5cqw]", toneClass[bottom])}>
        <p className="mb-[2.4cqw] hidden font-tech text-[length:2.9cqw] uppercase leading-none tracking-[0.16em] @xs:block">{product.season}</p>
        <p className="font-display text-[length:12.5cqw] font-light leading-[0.98] tracking-[-0.03em]">
          {product.coverLines[0]}
          <br />
          {product.coverLines[1]}
        </p>
        <p className="mt-[2.6cqw] hidden max-w-[72cqw] text-[length:4.2cqw] font-semibold leading-snug @xs:block">{product.tagline}</p>
      </div>
      <div aria-hidden="true" className="cover-gloss absolute inset-0" />
    </div>
  );
}
