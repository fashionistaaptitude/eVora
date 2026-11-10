import cover01 from "../assets/raw/cover-01.png";
import cover02 from "../assets/raw/cover-02.png";
import cover03 from "../assets/raw/cover-03.png";
import cover04 from "../assets/raw/cover-04.png";
import cover05 from "../assets/raw/cover-05.png";
import cover06 from "../assets/raw/cover-06.png";
import cover07 from "../assets/raw/cover-07.png";
import wallpapers from "../assets/raw/wallpapers.png";

export type Kind = "issue" | "bundle" | "extra" | "pass";
export type Tone = "ink" | "white";
export type Billing = "yearly" | "issue";

export type Art =
  | { type: "image"; src: string; top: Tone; bottom: Tone; scrimTop: string; scrimBottom: string }
  | { type: "stack" }
  | { type: "icons" }
  | { type: "pass"; tier: "reader" | "collector" };

export interface Preview {
  contents: { page: number; title: string }[];
  feature: { kicker: string; page: number; title: string; standfirst: string; body: string[] };
  quote: string;
}

export interface Product {
  id: string;
  kind: Kind;
  /** Short line above the title, e.g. "Issue 07" */
  kicker: string;
  title: string;
  /** Title split over two lines for the cover */
  coverLines: [string, string];
  /** Text inside the little orb on the cover */
  orb: string;
  season: string;
  /** Compact facts line for cards and bag rows */
  meta: string;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  pages?: number;
  released: string;
  badge?: string;
  specs: { label: string; value: string }[];
  includes?: string[];
  art: Art;
  /** Two-stop accent used on preview pages. First stop holds white text at 4.5:1 or better. */
  accent: [string, string];
  preview?: Preview;
}

/* ---------------------------- Release calendar ----------------------------
 * Dewpoint ships quarterly, on the 12th of March, June, September and
 * December. Every date on the site is worked out from today, so the latest
 * issue is always the current season and the countdown never goes stale.
 * ------------------------------------------------------------------------ */

const RELEASE_DAY = 12;
const SEASON_NAMES: Record<number, string> = { 2: "Spring", 5: "Summer", 8: "Autumn", 11: "Winter" };

const NOW = new Date();

function latestRelease(now: Date) {
  const y = now.getFullYear();
  const all = [new Date(y - 1, 11, RELEASE_DAY), ...[2, 5, 8, 11].map((m) => new Date(y, m, RELEASE_DAY))];
  return all.filter((d) => d.getTime() <= now.getTime()).pop() as Date;
}

const LATEST = latestRelease(NOW);

/** Release date of the issue `back` quarters before the latest one (negative = upcoming). */
const release = (back: number) => new Date(LATEST.getFullYear(), LATEST.getMonth() - 3 * back, RELEASE_DAY);
const seasonOf = (d: Date) => `${SEASON_NAMES[d.getMonth()]} ${d.getFullYear()}`;
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const issueSpecs = (pages: number, size: string, released: Date) => [
  { label: "Length", value: `${pages} pages` },
  { label: "Formats", value: "PDF + web edition" },
  { label: "Download", value: size },
  { label: "Released", value: released.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) },
];

export const issues: Product[] = [
  {
    id: "issue-07",
    kind: "issue",
    kicker: "Issue 07",
    title: "Liquid Interfaces",
    coverLines: ["Liquid", "Interfaces"],
    orb: "07",
    season: seasonOf(release(0)),
    meta: "Issue 07 · 84 pages",
    tagline: "Why every button once looked wet.",
    description:
      "A deep dive into gel pills, glass panes and glowing orbs: the interface language that made computers feel friendly. Ends with a step-by-step render lab for making your own droplets.",
    price: 9,
    pages: 84,
    released: iso(release(0)),
    badge: "New",
    specs: issueSpecs(84, "48 MB", release(0)),
    art: {
      type: "image",
      src: cover07,
      top: "ink",
      bottom: "ink",
      scrimTop: "rgba(255,255,255,0)",
      scrimBottom: "rgba(255,255,255,.6)",
    },
    accent: ["#0f6fd1", "#0a4a9a"],
    preview: {
      contents: [
        { page: 6, title: "The wet look" },
        { page: 22, title: "Glass, layered" },
        { page: 38, title: "Orb theory" },
        { page: 54, title: "A field guide to skeuomorphs" },
        { page: 70, title: "Render lab: droplets" },
      ],
      feature: {
        kicker: "Cover story",
        page: 6,
        title: "The wet look",
        standfirst:
          "For a decade, every button on Earth looked freshly rinsed. Where did the gloss come from, and where did it go?",
        body: [
          "Everything starts with a highlight. One soft white band across the top half of a pill, and suddenly a rectangle of pixels has weight, curvature and a light source somewhere above your monitor.",
          "Designers called it gel, aqua, glass. Whatever the name, it said the same thing: this is safe to press.",
        ],
      },
      quote: "A glossy button is a small promise that the machine is on your side.",
    },
  },
  {
    id: "issue-06",
    kind: "issue",
    kicker: "Issue 06",
    title: "Skyline Gardens",
    coverLines: ["Skyline", "Gardens"],
    orb: "06",
    season: seasonOf(release(1)),
    meta: "Issue 06 · 76 pages",
    tagline: "Towers that breathe, and the people who drew them.",
    description:
      "Eco-futurist architecture from brochure to building site: vertical forests, glass domes and the renderings that sold them. Includes eight fold-out city panoramas.",
    price: 9,
    pages: 76,
    released: iso(release(1)),
    specs: issueSpecs(76, "52 MB", release(1)),
    art: {
      type: "image",
      src: cover06,
      top: "white",
      bottom: "white",
      scrimTop: "rgba(10,74,154,.4)",
      scrimBottom: "rgba(6,44,18,.86)",
    },
    accent: ["#257a32", "#14532d"],
    preview: {
      contents: [
        { page: 4, title: "The brochure city" },
        { page: 18, title: "Vertical forests, ten years on" },
        { page: 34, title: "Domes" },
        { page: 48, title: "How to render a hopeful sky" },
        { page: 62, title: "Fold-outs: eight skylines" },
      ],
      feature: {
        kicker: "Feature",
        page: 4,
        title: "The brochure city",
        standfirst:
          "White curves, hanging gardens, a sky with exactly three clouds. The future had a house style, and it lived in PDFs.",
        body: [
          "Open any masterplan from the late 2000s and you will find the same afternoon: four o'clock in early summer, light from the left, a family mid-stride on a footbridge.",
          "It is easy to laugh at. But those renderings were also a brief: a picture of a city that cleaned its own air.",
        ],
      },
      quote: "Nobody ever rendered a utopia at night, in the rain.",
    },
  },
  {
    id: "issue-05",
    kind: "issue",
    kicker: "Issue 05",
    title: "Aurora Protocol",
    coverLines: ["Aurora", "Protocol"],
    orb: "05",
    season: seasonOf(release(2)),
    meta: "Issue 05 · 92 pages",
    tagline: "Light, colour and the screens that learned to glow.",
    description:
      "The after-dark sibling of the series. Aurora wallpapers, boot animations, light ribbons and the colour science behind a screen that feels alive.",
    price: 9,
    pages: 92,
    released: iso(release(2)),
    specs: issueSpecs(92, "61 MB", release(2)),
    art: {
      type: "image",
      src: cover05,
      top: "white",
      bottom: "white",
      scrimTop: "rgba(4,12,48,.35)",
      scrimBottom: "rgba(4,12,48,.8)",
    },
    accent: ["#5b3fd6", "#1e1b6b"],
    preview: {
      contents: [
        { page: 8, title: "Ribbons of light" },
        { page: 26, title: "Boot sequence" },
        { page: 42, title: "The teal-to-violet problem" },
        { page: 60, title: "Interview: a wallpaper artist" },
        { page: 78, title: "Render lab: aurora" },
      ],
      feature: {
        kicker: "Cover story",
        page: 8,
        title: "Ribbons of light",
        standfirst:
          "Every operating system of the era shipped with the same weather: a slow green aurora over a midnight-blue desktop.",
        body: [
          "The aurora wallpaper was a trick of confidence. A screen that glowed softly while it loaded suggested something was awake in there, waiting for you.",
          "We spoke to the people who painted those ribbons by hand, one curve at a time, and asked why the sky was always a northern one.",
        ],
      },
      quote: "Black is not the absence of design. It is the stage the glow needs.",
    },
  },
  {
    id: "issue-04",
    kind: "issue",
    kicker: "Issue 04",
    title: "Soft Machines",
    coverLines: ["Soft", "Machines"],
    orb: "04",
    season: seasonOf(release(3)),
    meta: "Issue 04 · 80 pages",
    tagline: "Pebble phones, jelly plastics and gadgets with no sharp edges.",
    description:
      "Industrial design from the years when everything was rounded, translucent and slightly edible-looking. Forty objects, photographed and redrawn.",
    price: 8,
    pages: 80,
    released: iso(release(3)),
    specs: issueSpecs(80, "44 MB", release(3)),
    art: {
      type: "image",
      src: cover04,
      top: "ink",
      bottom: "ink",
      scrimTop: "rgba(255,255,255,0)",
      scrimBottom: "rgba(255,255,255,.7)",
    },
    accent: ["#c2410c", "#8f2f0b"],
    preview: {
      contents: [
        { page: 6, title: "No sharp edges" },
        { page: 20, title: "Jelly: a material history" },
        { page: 36, title: "Forty objects" },
        { page: 58, title: "The click wheel and other circles" },
        { page: 72, title: "Paper models to print and fold" },
      ],
      feature: {
        kicker: "Feature",
        page: 6,
        title: "No sharp edges",
        standfirst:
          "There was a moment when a phone could be lime green, see-through and shaped like something you would find on a beach.",
        body: [
          "Pick up a device from 2007 and the first thing you notice is that it wants to be held. Corners are rounded until they vanish. Seams hide. The plastic glows from inside.",
          "Then came the slab. This issue is a catalogue of what we traded for it.",
        ],
      },
      quote: "Gadgets used to look like sweets. Then they started to look like knives.",
    },
  },
  {
    id: "issue-03",
    kind: "issue",
    kicker: "Issue 03",
    title: "Tidal Cities",
    coverLines: ["Tidal", "Cities"],
    orb: "03",
    season: seasonOf(release(4)),
    meta: "Issue 03 · 72 pages",
    tagline: "Life at the waterline, from floating districts to blue infrastructure.",
    description:
      "Amphibious neighbourhoods, tide-powered grids and the aquarium screensaver as urban plan. The wettest issue so far.",
    price: 8,
    pages: 72,
    released: iso(release(4)),
    specs: issueSpecs(72, "47 MB", release(4)),
    art: {
      type: "image",
      src: cover03,
      top: "white",
      bottom: "white",
      scrimTop: "rgba(3,74,110,.4)",
      scrimBottom: "rgba(3,34,70,.86)",
    },
    accent: ["#0b7f8c", "#075a66"],
    preview: {
      contents: [
        { page: 4, title: "At the waterline" },
        { page: 18, title: "Floating districts" },
        { page: 32, title: "The aquarium screensaver" },
        { page: 46, title: "Tide power, explained with fish" },
        { page: 60, title: "Postcards from a blue city" },
      ],
      feature: {
        kicker: "Cover story",
        page: 4,
        title: "At the waterline",
        standfirst: "What if a rising sea was a design brief and not a deadline? Four cities that decided to float.",
        body: [
          "The best plans for living with water do not look like disaster planning. They look like brochures: pontoons, gardens, a tram stop with a porthole.",
          "This issue visits places that treat the tide as a neighbour, where the street rises twice a day and nobody minds.",
        ],
      },
      quote: "A city that floats has already made peace with the future.",
    },
  },
  {
    id: "issue-02",
    kind: "issue",
    kicker: "Issue 02",
    title: "Green Signal",
    coverLines: ["Green", "Signal"],
    orb: "02",
    season: seasonOf(release(5)),
    meta: "Issue 02 · 68 pages",
    tagline: "Renewable optimism, from wind farms to leaf-shaped logos.",
    description:
      "How the colour green became a technology. Turbines, dewdrops, eco-badges and the stock photo that launched a thousand sustainability reports.",
    price: 7,
    pages: 68,
    released: iso(release(5)),
    specs: issueSpecs(68, "39 MB", release(5)),
    art: {
      type: "image",
      src: cover02,
      top: "white",
      bottom: "white",
      scrimTop: "rgba(10,74,154,.35)",
      scrimBottom: "rgba(8,44,5,.86)",
    },
    accent: ["#2b7f16", "#1c5a0d"],
    preview: {
      contents: [
        { page: 4, title: "The leaf logo" },
        { page: 16, title: "Turbine as icon" },
        { page: 30, title: "Dewdrop macro: a stock photo story" },
        { page: 44, title: "Green button, go" },
        { page: 56, title: "Poster pull-outs" },
      ],
      feature: {
        kicker: "Feature",
        page: 4,
        title: "The leaf logo",
        standfirst:
          "Somewhere around 2006, every company on Earth grew a small green leaf. A visual history of good intentions.",
        body: [
          "The leaf arrived quietly. One appeared on a petrol pump, another on a printer box, and within a year no annual report was complete without a dewdrop on the cover.",
          "Cynical? Often. But it also taught a generation that technology could have a conscience.",
        ],
      },
      quote: "Green was never just a colour. It was a status light.",
    },
  },
  {
    id: "issue-01",
    kind: "issue",
    kicker: "Issue 01",
    title: "Hello, Tomorrow",
    coverLines: ["Hello,", "Tomorrow"],
    orb: "01",
    season: seasonOf(release(6)),
    meta: "Issue 01 · 60 pages",
    tagline: "The launch issue. A field guide to the bright-side future.",
    description:
      "Where it all starts: a manifesto, a glossary and a tour of the optimistic future, in sky blue, grass green and a gentle glow.",
    price: 6,
    pages: 60,
    released: iso(release(6)),
    specs: issueSpecs(60, "35 MB", release(6)),
    art: {
      type: "image",
      src: cover01,
      top: "white",
      bottom: "white",
      scrimTop: "rgba(6,48,107,.35)",
      scrimBottom: "rgba(4,30,80,.82)",
    },
    accent: ["#1668c9", "#0a3d91"],
    preview: {
      contents: [
        { page: 4, title: "A manifesto, sort of" },
        { page: 12, title: "Glossary of gloss" },
        { page: 26, title: "The blue marble" },
        { page: 38, title: "Ten wallpapers that raised us" },
        { page: 50, title: "Letters to 2010" },
      ],
      feature: {
        kicker: "Editor's letter",
        page: 4,
        title: "A manifesto, sort of",
        standfirst:
          "The future used to have a look. It was clean, it was kind, and it had a lens flare in the top-left corner.",
        body: [
          "Dewpoint began because I missed a feeling: the one you got from a new phone box in 2007, all sky and water and promise.",
          "This first issue is a field guide to that feeling. Where it came from, why it left, and how to build a little of it back.",
        ],
      },
      quote: "Optimism is a design decision.",
    },
  },
];

export const ARCHIVE_ID = "archive";

const issuesTotal = issues.reduce((sum, p) => sum + p.price, 0);
const pagesTotal = issues.reduce((sum, p) => sum + (p.pages ?? 0), 0);

export const archive: Product = {
  id: ARCHIVE_ID,
  kind: "bundle",
  kicker: "Bundle",
  title: "The Complete Archive",
  coverLines: ["Complete", "Archive"],
  orb: "1–7",
  season: "Issues 01–07",
  meta: `All ${issues.length} issues`,
  tagline: `Every issue so far in one download. ${pagesTotal} pages.`,
  description: `All ${issues.length} issues published so far, ${pagesTotal} pages in total, in one tidy download. PDF and web editions are both included.`,
  price: 39,
  compareAt: issuesTotal,
  pages: pagesTotal,
  released: iso(release(0)),
  badge: "Best value",
  specs: [
    { label: "Length", value: `${pagesTotal} pages` },
    { label: "Formats", value: "PDF + web edition" },
    { label: "Download", value: "326 MB" },
    { label: "Saving", value: `$${issuesTotal - 39} vs. separately` },
  ],
  includes: issues.map((p) => `${p.kicker}: ${p.title}`),
  art: { type: "stack" },
  accent: ["#0f6fd1", "#0a4a9a"],
};

export const extras: Product[] = [
  {
    id: "wallpapers",
    kind: "extra",
    kicker: "Extra",
    title: "Clear Skies Wallpapers",
    coverLines: ["Clear", "Skies"],
    orb: "24",
    season: "Wallpaper pack",
    meta: "Extra · 24 wallpapers",
    tagline: "Two dozen wallpapers for desktop and phone.",
    description:
      "Ribbons, bokeh and dew: two dozen wallpapers rendered for the magazine and never used in it. Sized for 5K desktops and tall phone screens.",
    price: 5,
    released: iso(release(2)),
    specs: [
      { label: "Contents", value: "24 wallpapers" },
      { label: "Desktop", value: "5120 × 2880" },
      { label: "Phone", value: "1290 × 2796" },
      { label: "Download", value: "210 MB" },
    ],
    includes: ["24 wallpapers, each in two crops", "Light and after-dark variants", "PNG files, no watermark", "Free for personal use"],
    art: {
      type: "image",
      src: wallpapers,
      top: "ink",
      bottom: "white",
      scrimTop: "rgba(255,255,255,.25)",
      scrimBottom: "rgba(5,66,104,.84)",
    },
    accent: ["#0b7f8c", "#075a66"],
  },
  {
    id: "icons",
    kind: "extra",
    kicker: "Extra",
    title: "Gloss Icon Set",
    coverLines: ["Gloss", "Icons"],
    orb: "120",
    season: "Icon set",
    meta: "Extra · 120 icons",
    tagline: "120 shiny icons, layered and editable.",
    description:
      "The icon family drawn for Issue 07, tidied up for your own projects. Every icon ships as a layered SVG and as a 512 px PNG.",
    price: 6,
    released: iso(release(0)),
    specs: [
      { label: "Contents", value: "120 icons" },
      { label: "Formats", value: "SVG + PNG" },
      { label: "Size", value: "512 px, layered" },
      { label: "Licence", value: "Commercial use" },
    ],
    includes: ["120 icons in six colours", "Layered SVG with editable gloss", "512 px PNG exports", "Commercial licence included"],
    art: { type: "icons" },
    accent: ["#0f6fd1", "#0a4a9a"],
  },
];

/** Featured order for the library grid */
export const catalog: Product[] = [...issues.slice(0, 3), archive, ...issues.slice(3), ...extras];

/* ----------------------------- Season Pass ----------------------------- */

export interface PassPlan {
  tier: "reader" | "collector";
  name: string;
  blurb: string;
  yearly: number;
  perIssue: number;
  featured?: boolean;
  perks: string[];
}

export const passPlans: PassPlan[] = [
  {
    tier: "reader",
    name: "Reader",
    blurb: "Every new issue, the day it lands.",
    yearly: 28,
    perIssue: 8,
    perks: ["Four new issues a year", "PDF and web edition of each", "Pause or cancel whenever you like"],
  },
  {
    tier: "collector",
    name: "Collector",
    blurb: "New issues, the whole archive and every extra.",
    yearly: 48,
    perIssue: 14,
    featured: true,
    perks: [
      "Everything in Reader",
      "The Complete Archive, Issues 01–07",
      "Every wallpaper pack and icon set",
      "New issues one week early",
    ],
  },
];

export const passId = (tier: PassPlan["tier"], billing: Billing) => `pass-${tier}-${billing}`;

const passProducts: Product[] = passPlans.flatMap((plan) =>
  (["yearly", "issue"] as Billing[]).map((billing) => ({
    id: passId(plan.tier, billing),
    kind: "pass" as const,
    kicker: "Season Pass",
    title: `Season Pass · ${plan.name}`,
    coverLines: ["Season", "Pass"] as [string, string],
    orb: "∞",
    season: billing === "yearly" ? "Billed yearly" : "Billed per issue",
    meta: billing === "yearly" ? "Billed yearly · 4 issues" : "Billed as each issue ships",
    tagline: plan.blurb,
    description: plan.blurb,
    price: billing === "yearly" ? plan.yearly : plan.perIssue,
    released: iso(release(0)),
    specs: [],
    includes: plan.perks,
    art: { type: "pass" as const, tier: plan.tier },
    accent: ["#0f6fd1", "#0a4a9a"] as [string, string],
  }))
);

const byId = new Map<string, Product>([...catalog, ...passProducts].map((p) => [p.id, p]));

export const getProduct = (id: string) => byId.get(id);

/* ------------------------------ Next issue ------------------------------ */

const NEXT = release(-1);
const DAY = 86_400_000;

export const nextIssue = {
  number: "08",
  title: "Clear Air",
  season: seasonOf(NEXT),
  blurb: "Ionisers, purifiers and the dream of a city that smells like rain.",
  dateLabel: NEXT.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  daysLeft: Math.max(1, Math.ceil((NEXT.getTime() - NOW.getTime()) / DAY)),
  /** How far through the three-month production cycle we are today */
  progress: Math.min(
    97,
    Math.max(4, Math.round(((NOW.getTime() - LATEST.getTime()) / (NEXT.getTime() - LATEST.getTime())) * 100))
  ),
};

export const currentYear = NOW.getFullYear();

/* ------------------------------- Helpers -------------------------------- */

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const totals = { issues: issues.length, pages: pagesTotal, issuesPrice: issuesTotal };
