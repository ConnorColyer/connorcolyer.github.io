import { site } from "@/content/site";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 dark:border-ink-800">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-ink-950 dark:text-white">{site.name}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{site.location}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{site.email}</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          {site.socials.map((social) => (
            <a key={social.label} href={social.href} className="hover:text-ink-950 dark:hover:text-white">
              {social.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </Container>
    </footer>
  );
}
