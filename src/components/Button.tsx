import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

const styles = {
  primary:
    "bg-ink-950 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-950 dark:hover:bg-slate-200",
  secondary:
    "border border-slate-200 text-ink-950 hover:border-ink-950 dark:border-ink-700 dark:text-white dark:hover:border-white",
  ghost: "text-ink-950 hover:text-indigo-500 dark:text-white"
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button"
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
    styles[variant]
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
