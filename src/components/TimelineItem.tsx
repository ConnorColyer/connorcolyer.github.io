interface TimelineItemProps {
  title: string;
  meta: string;
  bullets: string[];
}

export default function TimelineItem({ title, meta, bullets }: TimelineItemProps) {
  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-ink-950 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{meta}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
