"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/content/site";

const sections = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" }
];

export default function Nav() {
  const [active, setActive] = useState("home");

  const ids = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-ink-800/80 dark:bg-ink-950/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#home" className="text-sm font-semibold tracking-[0.2em] text-ink-950 dark:text-white">
          {site.name.split(" ")[0]}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={`transition hover:text-ink-950 dark:hover:text-white ${
                active === section.id ? "text-ink-950 dark:text-white" : ""
              }`}
            >
              {section.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href={site.ctas.primary.href} className="hidden md:inline-flex">
            {site.ctas.primary.label}
          </Button>
        </div>
      </div>
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-slate-200/70 px-6 py-3 text-xs font-semibold text-slate-500 dark:border-ink-800/80 dark:text-slate-400 md:hidden">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            className={`whitespace-nowrap transition ${
              active === section.id ? "text-ink-950 dark:text-white" : ""
            }`}
          >
            {section.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
