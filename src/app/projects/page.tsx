import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { site } from "@/content/site";
import Link from "next/link";

export const metadata = {
  title: "Projects — Connor Colyer",
  description: "Case studies and experimental work by Connor Colyer."
};

export default function ProjectsPage() {
  return (
    <Container className="py-20 md:py-28">
      <div className="space-y-6">
        <Link href="/" className="text-sm font-semibold text-indigo-500">
          ← Back to home
        </Link>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-ink-950 dark:text-white md:text-5xl">
            Selected Projects
          </h1>
          <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
            A deeper look at Connor’s work across product design, engineering, and experimentation.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {site.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </Container>
  );
}
