import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const BagIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 8h12l1.200 11a2 2 0 0 1-2 2.200H6.800a2 2 0 0 1-2-2.200L6 8Z" />
    <path d="M9 8V6.500a3 3 0 0 1 6 0V8" />
  </Base>
);
export const BookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6.500C10.500 5 8 4.500 4 4.500v13c4 0 6.500.500 8 2 1.500-1.500 4-2 8-2v-13c-4 0-6.500.500-8 2Z" />
    <path d="M12 6.500v13" />
  </Base>
);
export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.500 4.500 4.500L19 7.500" />
  </Base>
);
export const XIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
export const ChevronRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 6 6 6-6 6" />
  </Base>
);
export const ChevronLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m15 6-6 6 6 6" />
  </Base>
);
export const ChevronDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);
export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.500" />
    <path d="m16 16 4.500 4.500" />
  </Base>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
export const ArrowUpIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Base>
);
export const DownloadIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7 10.500l5 5 5-5M5 20h14" />
  </Base>
);
export const UnlockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 7.600-1.700" />
  </Base>
);
export const RefreshIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 12a8 8 0 1 1-2.600-5.900" />
    <path d="M20 4v5h-5" />
  </Base>
);
export const TrashIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" />
  </Base>
);
export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);
export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);
export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.500" y="5.500" width="17" height="13" rx="2.500" />
    <path d="m4.500 7.500 7.500 6 7.500-6" />
  </Base>
);
export const LeafIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14Z" />
    <path d="M5 19 14 10" />
  </Base>
);
export const DropIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.500c3.200 4 5.500 7 5.500 10.200a5.500 5.500 0 0 1-11 0c0-3.200 2.300-6.200 5.500-10.200Z" />
  </Base>
);
export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.600 5.600 7 7M17 17l1.400 1.400M5.600 18.400 7 17M17 7l1.400-1.400" />
  </Base>
);
export const CloudIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 18.500a4 4 0 0 1-.600-7.950 5.500 5.500 0 0 1 10.600-1.050 4.500 4.500 0 0 1 .500 9H7Z" />
  </Base>
);
export const MusicIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 17.500V6l10-2v11.500" />
    <circle cx="6.500" cy="17.500" r="2.500" />
    <circle cx="16.500" cy="15.500" r="2.500" />
  </Base>
);
export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.500" />
    <path d="M3.500 12h17M12 3.500c2.500 2.500 3.500 5.500 3.500 8.500s-1 6-3.500 8.500c-2.500-2.500-3.500-5.500-3.500-8.500s1-6 3.500-8.500Z" />
  </Base>
);
export const HeartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20s-7.500-4.500-7.500-10A4.300 4.300 0 0 1 12 7.500 4.300 4.300 0 0 1 19.500 10c0 5.500-7.500 10-7.500 10Z" />
  </Base>
);
export const StarIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3.500 2.600 5.400 5.900.800-4.300 4.100 1 5.900-5.200-2.800-5.200 2.800 1-5.900-4.300-4.100 5.900-.800L12 3.500Z" />
  </Base>
);
export const TagIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4h8l8 8-8 8-8-8V4Z" />
    <circle cx="8.500" cy="8.500" r="1.500" />
  </Base>
);
export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.500" />
    <path d="M12 7v5l3.500 2" />
  </Base>
);
export const LayersIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 4 8.500 4.500L12 13 3.500 8.500 12 4Z" />
    <path d="m4 12.500 8 4.500 8-4.500M4 16.500 12 21l8-4.500" />
  </Base>
);
export const BoltIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M13 3 5 13.500h6L10 21l9-11h-6.500L13 3Z" />
  </Base>
);
export const InfinityIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 12c-2-2.700-3.500-4-5.500-4a4 4 0 0 0 0 8c2 0 3.500-1.300 5.500-4Zm0 0c2 2.700 3.500 4 5.500 4a4 4 0 0 0 0-8c-2 0-3.500 1.300-5.500 4Z" />
  </Base>
);
