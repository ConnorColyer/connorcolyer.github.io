import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import Chip from "@/components/Chip";
import Reveal from "@/components/Reveal";
import CopyEmailButton from "@/components/CopyEmailButton";
import ContactForm from "@/components/ContactForm";
import { site } from "@/content/site";

export default function Home() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_45%)]">
      <Container>
        <section id="home" className="py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-8">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
                  {site.location}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-4xl font-semibold leading-tight text-ink-950 dark:text-white md:text-6xl">
                  {site.name}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300 md:text-xl">
                  {site.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="max-w-xl text-base text-slate-500 dark:text-slate-400">
                  {site.blurb}
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-3">
                  <Button href={site.ctas.primary.href}>{site.ctas.primary.label}</Button>
                  <Button href={site.ctas.secondary.href} variant="secondary">
                    {site.ctas.secondary.label}
                  </Button>
                  <CopyEmailButton />
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-soft backdrop-blur dark:border-ink-800 dark:bg-ink-900/80">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Currently</p>
                    <p className="text-lg font-semibold text-ink-950 dark:text-white">
                      Freelance full-stack engineer
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Open for collaborations &amp; new builds.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Email</span>
                      <span className="font-medium text-ink-950 dark:text-white">{site.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Phone</span>
                      <span className="font-medium text-ink-950 dark:text-white">{site.phone}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Location</span>
                      <span className="font-medium text-ink-950 dark:text-white">{site.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </Container>

      <Container>
        <Section
          id="work"
          eyebrow="Selected work"
          title="Products, experiments, and concepts"
          subtitle="A mix of real-world builds and speculative concepts that show my approach to craft and systems thinking."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {site.projects.map((project, index) => (
              <Reveal key={project.slug} delay={0.1 * index}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 dark:border-ink-800 dark:bg-ink-900 md:grid-cols-[1fr_1.2fr]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">Services</p>
              <h3 className="text-2xl font-semibold text-ink-950 dark:text-white">{site.services.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{site.services.subtitle}</p>
            </div>
            <div className="space-y-4">
              <ul className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                {site.services.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {site.services.pricingNote}
              </p>
            </div>
          </div>
        </Section>
      </Container>

      <Container>
        <Section
          title="Experience"
          eyebrow="Timeline"
          subtitle="A blend of software engineering and live production environments."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {site.experience.map((item) => (
              <Reveal key={item.role}>
                <TimelineItem
                  title={`${item.role} — ${item.company}`}
                  meta={`${item.location} · ${item.date}`}
                  bullets={item.bullets}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      </Container>

      <Container>
        <Section id="skills" eyebrow="Skills" title="Capabilities" subtitle="Hands-on technical delivery and collaborative communication.">
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(site.skills).map(([group, items]) => (
              <Reveal key={group}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                  <h3 className="text-lg font-semibold text-ink-950 dark:text-white">{group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </Container>

      <Container>
        <Section
          id="awards"
          eyebrow="Awards"
          title="Recognition and leadership"
          subtitle="Awarded for technical achievement, leadership, and creative excellence."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {site.awards.map((award) => (
              <Reveal key={award.title}>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                  <h3 className="text-lg font-semibold text-ink-950 dark:text-white">{award.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{award.date}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </Container>

      <Container>
        <Section
          eyebrow="Education"
          title="Academic foundation"
          subtitle="Focused study in software engineering and creative problem solving."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {site.education.map((item) => (
              <Reveal key={item.school}>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                  <h3 className="text-lg font-semibold text-ink-950 dark:text-white">{item.school}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.credential}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
                    {item.date}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </Container>

      <Container>
        <Section
          id="contact"
          eyebrow="Contact"
          title="Let’s build something with momentum"
          subtitle="Share your goals and timelines. I’ll respond with a clear next step."
        >
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <ContactForm />
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                <h3 className="text-lg font-semibold text-ink-950 dark:text-white">Direct contact</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Email or call for quick questions, availability, or collaborations.
                </p>
                <div className="mt-5 space-y-2 text-sm">
                  <p className="font-semibold text-ink-950 dark:text-white">{site.email}</p>
                  <p className="font-semibold text-ink-950 dark:text-white">{site.phone}</p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-ink-800 dark:bg-ink-900">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Availability</p>
                <p className="mt-3 text-lg font-semibold text-ink-950 dark:text-white">
                  New projects from early next month.
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  I keep projects lean, communicate clearly, and ship thoughtful work.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
