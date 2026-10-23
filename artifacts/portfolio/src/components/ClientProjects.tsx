import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import {
  clientCategories,
  clientProjects,
  totalClientProjects,
  type ClientProject,
} from '@/data/client-projects';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const ALL = 'All';

/**
 * Live client websites, filterable by industry. Separate from the design
 * collections in Projects so professional web work reads distinctly.
 */
export function ClientProjects() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<string>(ALL);

  const tabs = useMemo(() => [ALL, ...clientCategories], []);
  const visible = useMemo(
    () => (filter === ALL ? clientProjects : clientProjects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="client-work" className="relative border-b border-white/5 py-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
            Client Websites
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Selected Client Projects
          </h2>
          <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <p className="text-base leading-relaxed text-muted-foreground">
            {totalClientProjects} live websites across real estate, construction, healthcare and
            hospitality that I contributed design and development work to. Each one links straight
            to the site as it is published today.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-10"
        >
          {/* min-h-[44px]: comfortable tap target on touch, consistent pill height on desktop. */}
          <div role="group" aria-label="Filter client projects by industry" className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const active = filter === tab;
              const count = tab === ALL ? totalClientProjects : clientProjects.filter((p) => p.category === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(tab)}
                  className={`inline-flex min-h-[44px] items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                      : 'bg-white/5 text-foreground/80 hover:bg-white/10'
                  }`}
                >
                  {tab}
                  <span className={`ml-2 text-xs ${active ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <p aria-live="polite" className="sr-only">
          Showing {visible.length} of {totalClientProjects} client projects
          {filter === ALL ? '' : ` in ${filter}`}.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <Card
                key={project.slug}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Card({
  project,
  index,
  reduceMotion,
}: {
  project: ClientProject;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.article
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(index, 5) * 0.05 }}
      className="group glass-panel flex h-full flex-col overflow-hidden rounded-2xl border-border transition-[box-shadow,border-color] duration-300 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(88,28,180,0.3)] focus-within:border-primary/40"
    >
      {/* Fixed 16:10 frame keeps every card the same proportion. */}
      <div className="relative aspect-[8/5] overflow-hidden bg-muted">
        {project.preview ? (
          <img
            src={project.preview}
            alt={`Homepage of ${project.name}`}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-[1.05]"
          />
        ) : (
          /* No fabricated imagery: this site blocks automated capture. */
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/15 via-background to-secondary/10 px-6 text-center">
            <Globe className="h-8 w-8 text-primary/60" aria-hidden="true" />
            <span className="text-sm font-semibold text-foreground/80">{project.name}</span>
            <span className="text-xs text-muted-foreground">
              {new URL(project.url).hostname.replace(/^www\./, '')}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            {project.category}
          </span>
          <span className="truncate text-[11px] text-muted-foreground">{project.contribution}</span>
        </div>

        <h3 className="text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-1.5 border-t border-white/5 pt-4 text-sm font-medium text-foreground/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Visit live website
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
            aria-hidden="true"
          />
          <span className="sr-only"> ({project.name}, opens in a new tab)</span>
        </a>
      </div>
    </motion.article>
  );
}
