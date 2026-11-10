import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./data/catalog";

export const PROMO_CODE = "BUBBLES";
export const PROMO_RATE = 0.15;

export interface Toast {
  id: number;
  message: string;
}

interface Store {
  bag: string[];
  items: Product[];
  inBag: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  replaceBag: (ids: string[]) => void;
  clear: () => void;
  subtotal: number;
  discount: number;
  total: number;
  promo: boolean;
  promoUnlocked: boolean;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  unlockPromo: () => void;
  bagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  previewId: string | null;
  openPreview: (id: string) => void;
  closePreview: () => void;
  toasts: Toast[];
  notify: (message: string) => void;
  /** Increments on every add so the bag counter can replay its bump */
  bump: number;
}

const StoreContext = createContext<Store | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the bag simply won't persist */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<string[]>(() => {
    const saved = read<unknown>("dewpoint.bag", []);
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string" && !!getProduct(id)) : [];
  });
  const [promo, setPromo] = useState<boolean>(() => read<unknown>("dewpoint.promo", false) === true);
  const [promoUnlocked, setPromoUnlocked] = useState<boolean>(() => read<unknown>("dewpoint.unlocked", false) === true);
  const [bagOpen, setBagOpen] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bump, setBump] = useState(0);
  const toastId = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => write("dewpoint.bag", bag), [bag]);
  useEffect(() => write("dewpoint.promo", promo), [promo]);
  useEffect(() => write("dewpoint.unlocked", promoUnlocked), [promoUnlocked]);
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const notify = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((list) => [...list.slice(-2), { id, message }]);
    timers.current.push(window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3600));
  }, []);

  const add = useCallback(
    (id: string) => {
      const product = getProduct(id);
      if (!product) return;
      setBag((prev) => {
        if (prev.includes(id)) return prev;
        const base = product.kind === "pass" ? prev.filter((x) => getProduct(x)?.kind !== "pass") : prev;
        return [...base, id];
      });
      setBump((n) => n + 1);
      notify(`${product.title} added to your bag`);
    },
    [notify]
  );

  const remove = useCallback((id: string) => setBag((prev) => prev.filter((x) => x !== id)), []);

  const toggle = useCallback(
    (id: string) => {
      if (bag.includes(id)) remove(id);
      else add(id);
    },
    [bag, add, remove]
  );

  const replaceBag = useCallback((ids: string[]) => setBag(ids.filter((id) => !!getProduct(id))), []);
  const clear = useCallback(() => setBag([]), []);

  const applyPromo = useCallback(
    (code: string) => {
      if (code.trim().toUpperCase() !== PROMO_CODE) return false;
      setPromo(true);
      notify(`${PROMO_CODE} applied: 15% off your bag`);
      return true;
    },
    [notify]
  );
  const removePromo = useCallback(() => setPromo(false), []);
  const unlockPromo = useCallback(() => {
    setPromoUnlocked(true);
    notify(`Five bubbles popped. Code ${PROMO_CODE} unlocked: 15% off`);
  }, [notify]);

  const openBag = useCallback(() => {
    setPreviewId(null);
    setBagOpen(true);
  }, []);
  const closeBag = useCallback(() => setBagOpen(false), []);
  const openPreview = useCallback((id: string) => {
    setBagOpen(false);
    setPreviewId(id);
  }, []);
  const closePreview = useCallback(() => setPreviewId(null), []);

  const value = useMemo<Store>(() => {
    const items = bag.map((id) => getProduct(id)).filter((p): p is Product => !!p);
    const subtotal = items.reduce((sum, p) => sum + p.price, 0);
    const discount = promo ? Math.round(subtotal * PROMO_RATE * 100) / 100 : 0;
    return {
      bag,
      items,
      inBag: (id: string) => bag.includes(id),
      add,
      remove,
      toggle,
      replaceBag,
      clear,
      subtotal,
      discount,
      total: Math.round((subtotal - discount) * 100) / 100,
      promo,
      promoUnlocked,
      applyPromo,
      removePromo,
      unlockPromo,
      bagOpen,
      openBag,
      closeBag,
      previewId,
      openPreview,
      closePreview,
      toasts,
      notify,
      bump,
    };
  }, [
    bag,
    promo,
    promoUnlocked,
    bagOpen,
    previewId,
    toasts,
    bump,
    add,
    remove,
    toggle,
    replaceBag,
    clear,
    applyPromo,
    removePromo,
    unlockPromo,
    openBag,
    closeBag,
    openPreview,
    closePreview,
    notify,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
