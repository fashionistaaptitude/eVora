import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ARCHIVE_ID, archive, formatPrice, type Product } from "../data/catalog";
import { useDialog, useSafeId } from "../hooks";
import { PROMO_CODE, useStore } from "../store";
import { Thumb } from "./Cover";
import { ArrowRightIcon, BagIcon, CheckIcon, ChevronLeftIcon, DownloadIcon, TagIcon, TrashIcon, XIcon } from "./Icons";

type View = "bag" | "checkout" | "done";

interface Order {
  id: string;
  email: string;
  name: string;
  items: Product[];
  total: number;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* --------------------------------- Bag view -------------------------------- */

function BundleTip() {
  const { items, bag, replaceBag } = useStore();
  const issuesInBag = items.filter((p) => p.kind === "issue");
  const hasArchive = bag.includes(ARCHIVE_ID);
  const issuesCost = issuesInBag.reduce((sum, p) => sum + p.price, 0);

  if (hasArchive && issuesInBag.length > 0) {
    return (
      <div className="rounded-2xl border border-sun-500 bg-sun-200/70 p-3.5 text-[0.97rem]">
        <p>
          The Complete Archive already includes {issuesInBag.length === 1 ? "the issue" : `the ${issuesInBag.length} issues`} in
          your bag.
        </p>
        <button
          type="button"
          className="link-btn mt-1"
          onClick={() => replaceBag(bag.filter((id) => !issuesInBag.some((p) => p.id === id)))}
        >
          Remove the duplicates and save {formatPrice(issuesCost)}
        </button>
      </div>
    );
  }

  if (!hasArchive && issuesCost > archive.price) {
    return (
      <div className="rounded-2xl border border-leaf-500 bg-leaf-100/80 p-3.5 text-[0.97rem]">
        <p>
          Your {issuesInBag.length} issues come to {formatPrice(issuesCost)}. The Complete Archive has all seven for{" "}
          {formatPrice(archive.price)}.
        </p>
        <button
          type="button"
          className="link-btn mt-1"
          onClick={() => replaceBag([...bag.filter((id) => !issuesInBag.some((p) => p.id === id)), ARCHIVE_ID])}
        >
          Swap to the Archive and save {formatPrice(issuesCost - archive.price)}
        </button>
      </div>
    );
  }

  return null;
}

function PromoRow() {
  const { promo, promoUnlocked, applyPromo, removePromo } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const errorId = useSafeId("promo");

  if (promo) {
    return (
      <div className="flex items-center gap-2.5 rounded-2xl border border-leaf-500 bg-leaf-100/80 px-3.5 py-2.5 text-[0.97rem]">
        <TagIcon size={18} className="shrink-0 text-leaf-800" />
        <p className="min-w-0 flex-1">
          <strong className="font-semibold">{PROMO_CODE}</strong> applied: 15% off
        </p>
        <button type="button" className="link-btn" onClick={removePromo}>
          Remove
        </button>
      </div>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Enter a code first.");
      return;
    }
    if (applyPromo(code)) {
      setCode("");
      setError("");
    } else {
      setError("That code isn’t valid. Check the spelling and try again.");
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor={`${errorId}-input`} className="text-[0.97rem] font-semibold">
        Discount code
      </label>
      <div className="mt-1.5 flex gap-2">
        <input
          id={`${errorId}-input`}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className="field min-w-0 flex-1 uppercase"
        />
        <button type="submit" className="gel gel-glass">
          Apply
        </button>
      </div>
      <p id={errorId} className="mt-1.5 text-sm" role={error ? "alert" : undefined}>
        {error ? (
          <span className="font-semibold text-[#a01a0a]">{error}</span>
        ) : promoUnlocked ? (
          <button type="button" className="link-btn" onClick={() => applyPromo(PROMO_CODE)}>
            Use the {PROMO_CODE} code you unlocked
          </button>
        ) : (
          <span className="text-ink-soft">No code? Pop five bubbles in the sky at the top of the page.</span>
        )}
      </p>
    </form>
  );
}

function BagView({ titleId, onCheckout, onClose }: { titleId: string; onCheckout: () => void; onClose: () => void }) {
  const { items, remove, subtotal, discount, total } = useStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10 text-center">
        <span aria-hidden="true" className="bubble block size-24" />
        <h2 id={titleId} className="mt-6 font-display text-2xl font-extrabold tracking-[-0.02em]">
          Your bag is light as air
        </h2>
        <p className="mt-2 text-ink-soft">Add an issue from the library and it will float in here.</p>
        <a href="#library" className="gel gel-blue mt-6" onClick={onClose}>
          Browse the library
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 pb-5 pt-4">
        <h2 id={titleId} className="font-display text-2xl font-extrabold tracking-[-0.02em]">
          Your bag
          <span className="ml-2 font-sans text-base font-normal text-ink-soft">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </h2>

        <div className="mt-3 empty:hidden">
          <BundleTip />
        </div>

        <ul className="mt-2 divide-y divide-azure-200">
          {items.map((p) => (
            <li key={p.id} className="flex gap-3.5 py-3.5">
              <Thumb product={p} className="w-14" />
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold leading-tight">{p.title}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{p.meta}</p>
                <button type="button" className="link-btn mt-1 inline-flex items-center gap-1 text-sm" onClick={() => remove(p.id)}>
                  <TrashIcon size={14} />
                  Remove<span className="sr-only"> {p.title}</span>
                </button>
              </div>
              <p className="font-display text-lg font-extrabold">{formatPrice(p.price)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-3">
          <PromoRow />
        </div>
      </div>

      <div className="aero-details shrink-0 px-5 pb-5 pt-4">
        <dl className="grid gap-1 text-[0.97rem]">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-leaf-800">
              <dt>Discount ({PROMO_CODE})</dt>
              <dd>−{formatPrice(discount)}</dd>
            </div>
          )}
          <div className="mt-1 flex items-baseline justify-between">
            <dt className="font-display text-lg font-bold">Total</dt>
            <dd className="font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em]">{formatPrice(total)}</dd>
          </div>
        </dl>
        <button type="button" className="gel gel-green gel-lg mt-4 w-full" onClick={onCheckout}>
          Check out
          <ArrowRightIcon size={20} />
        </button>
        <p className="mt-2.5 text-center text-sm text-ink-soft">Prices in US dollars. Instant download after checkout.</p>
      </div>
    </>
  );
}

/* ------------------------------- Checkout view ------------------------------ */

function CheckoutView({ titleId, onBack, onPlaced }: { titleId: string; onBack: () => void; onPlaced: (order: Order) => void }) {
  const { items, total, clear } = useStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const ids = useSafeId("checkout");

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError("Enter an email address like name@example.com so the download links can reach you.");
      emailRef.current?.focus();
      return;
    }
    onPlaced({
      id: `DP-${Math.floor(10000 + Math.random() * 90000)}`,
      email: email.trim(),
      name: name.trim(),
      items,
      total,
    });
    clear();
  };

  return (
    <form onSubmit={submit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-5 pb-5 pt-4">
        <button type="button" className="link-btn inline-flex items-center gap-1 text-[0.97rem]" onClick={onBack}>
          <ChevronLeftIcon size={16} />
          Back to your bag
        </button>
        <h2 id={titleId} ref={heading} tabIndex={-1} className="mt-3 font-display text-2xl font-extrabold tracking-[-0.02em] outline-none">
          Checkout
        </h2>

        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor={`${ids}-email`} className="text-[0.97rem] font-semibold">
              Email for your download links
            </label>
            <input
              id={`${ids}-email`}
              ref={emailRef}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              aria-invalid={!!error}
              aria-describedby={error ? `${ids}-error` : undefined}
              placeholder="name@example.com"
              className="field mt-1.5"
            />
            {error && (
              <p id={`${ids}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-[#a01a0a]">
                {error}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${ids}-name`} className="text-[0.97rem] font-semibold">
              Name for the receipt <span className="font-normal text-ink-soft">(optional)</span>
            </label>
            <input
              id={`${ids}-name`}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field mt-1.5"
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-azure-200 bg-white/70 p-4">
          <p className="font-display font-bold">Order summary</p>
          <ul className="mt-2 grid gap-1.5 text-[0.97rem]">
            {items.map((p) => (
              <li key={p.id} className="flex justify-between gap-3">
                <span className="min-w-0 truncate">{p.title}</span>
                <span className="shrink-0">{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 rounded-2xl border border-sun-500 bg-sun-200/70 p-3.5 text-[0.94rem]">
          <strong className="font-semibold">This is a demo checkout.</strong> No payment is taken and no files are sent. Placing
          the order shows you the confirmation screen.
        </p>
      </div>

      <div className="aero-details shrink-0 px-5 pb-5 pt-4">
        <p className="flex items-baseline justify-between">
          <span className="font-display text-lg font-bold">Total</span>
          <span className="font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em]">{formatPrice(total)}</span>
        </p>
        <button type="submit" className="gel gel-green gel-lg mt-4 w-full">
          Place demo order
        </button>
      </div>
    </form>
  );
}

/* --------------------------------- Done view -------------------------------- */

function DoneView({ titleId, order, onClose }: { titleId: string; order: Order; onClose: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-5 pb-6 pt-8 text-center">
        <span aria-hidden="true" className="check-badge static mx-auto size-16">
          <CheckIcon size={30} strokeWidth={3} />
        </span>
        <h2 id={titleId} ref={heading} tabIndex={-1} className="mt-5 font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] outline-none">
          {order.name ? `Thank you, ${order.name.split(" ")[0]}.` : "Thank you."}
        </h2>
        <p className="mt-2 text-ink-soft">
          Order <strong className="font-semibold text-ink">{order.id}</strong> is confirmed. In a live store, your download links
          would now be on their way to <strong className="font-semibold text-ink [overflow-wrap:anywhere]">{order.email}</strong>.
        </p>

        <ul className="mt-6 divide-y divide-azure-200 rounded-2xl border border-azure-200 bg-white/70 text-left">
          {order.items.map((p) => (
            <li key={p.id} className="flex items-center gap-3 p-3">
              <Thumb product={p} className="w-11" />
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold leading-tight">{p.title}</p>
                <p className="text-sm text-ink-soft">{p.meta}</p>
              </div>
              <DownloadIcon size={18} className="shrink-0 text-ink-soft" />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">Total for this demo order: {formatPrice(order.total)}. Nothing was charged.</p>
      </div>
      <div className="aero-details shrink-0 px-5 pb-5 pt-4">
        <a href="#library" className="gel gel-blue gel-lg w-full" onClick={onClose}>
          Back to the library
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------- Drawer ---------------------------------- */

export function BagDrawer() {
  const { bagOpen, closeBag } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useSafeId("bag");
  const [view, setView] = useState<View>("bag");
  const [order, setOrder] = useState<Order | null>(null);

  const close = useCallback(() => {
    closeBag();
    setView("bag");
    setOrder(null);
  }, [closeBag]);

  useDialog(bagOpen, close, ref);

  if (!bagOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div aria-hidden="true" className="backdrop-in absolute inset-0 bg-azure-950/55 backdrop-blur-[3px]" onClick={close} />
      <aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="drawer-in glass-bright absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col overflow-hidden outline-none sm:inset-y-3 sm:right-3 sm:rounded-[24px]"
      >
        <div className="aero-titlebar flex shrink-0 items-center gap-2.5 py-2 pl-4 pr-2">
          <BagIcon size={20} />
          <p className="glow-text min-w-0 flex-1 font-display text-[15px] font-bold">
            {view === "bag" ? "Bag" : view === "checkout" ? "Checkout" : "Order confirmed"}
          </p>
          <button type="button" className="aero-close" onClick={close} aria-label="Close bag">
            <XIcon size={18} strokeWidth={3} />
          </button>
        </div>

        {view === "bag" && <BagView titleId={titleId} onCheckout={() => setView("checkout")} onClose={close} />}
        {view === "checkout" && (
          <CheckoutView
            titleId={titleId}
            onBack={() => setView("bag")}
            onPlaced={(o) => {
              setOrder(o);
              setView("done");
            }}
          />
        )}
        {view === "done" && order && <DoneView titleId={titleId} order={order} onClose={close} />}
      </aside>
    </div>
  );
}
