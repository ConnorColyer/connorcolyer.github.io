import Container from "@/components/Container";
import Chip from "@/components/Chip";
import { site, type Project } from "@/content/site";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  const project = site.projects.find((item) => item.slug === params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Connor Colyer`,
    description: project.summary
  };
}

function getProject(slug: string): Project | undefined {
  return site.projects.find((project) => project.slug === slug);
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-20 md:py-28">
      <div className="space-y-6">
        <Link href="/projects" className="text-sm font-semibold text-indigo-500">
          ← Back to projects
        </Link>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
            {project.status}
          </p>
          <h1 className="text-4xl font-semibold text-ink-950 dark:text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
            {project.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-base leading-relaxed text-slate-600 dark:border-ink-800 dark:bg-ink-900 dark:text-slate-300">
          {project.description}
        </div>
      </div>
    </Container>
  );
}
