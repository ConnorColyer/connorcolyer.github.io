import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
}

export default function Chip({ children }: ChipProps) {
  return (
    <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-ink-700 dark:text-slate-200">
      {children}
    </span>
  );
}
