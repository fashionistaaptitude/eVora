import { useStore } from "../store";
import { CheckIcon } from "./Icons";

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((t) => (
        <p
          key={t.id}
          className="toast-in glass-bright flex max-w-full items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-[0.97rem] font-semibold"
        >
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 place-items-center rounded-full border border-leaf-700 bg-[radial-gradient(circle_at_50%_110%,#eaffc4_0%,#8fdd3c_45%,#45a012_100%)] text-leaf-900"
          >
            <CheckIcon size={15} strokeWidth={3} />
          </span>
          {t.message}
        </p>
      ))}
    </div>
  );
}
