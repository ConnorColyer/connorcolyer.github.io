import Link from "next/link";
import Chip from "./Chip";
import type { Project } from "@/content/site";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
          <span>{project.status}</span>
          <span className="h-2 w-2 rounded-full bg-indigo-400" aria-hidden="true" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-ink-950 dark:text-white">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {project.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </div>
      <Link
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 transition group-hover:text-indigo-400"
        href={`/projects/${project.slug}`}
      >
        Case study
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
