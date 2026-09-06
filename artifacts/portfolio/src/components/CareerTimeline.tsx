import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { careerTimeline, totalEngagements } from '@/data/career-timeline';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/**
 * Career timeline grouped by era rather than listed flat, so the progression
 * from 2019 through 2026 reads at a glance. Content comes from
 * `@/data/career-timeline`, transcribed from the resume.
 */
export function CareerTimeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative py-24">
      <div className="container mx-auto max-w-4xl px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Career Timeline</h2>
          <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <p className="text-base leading-relaxed text-muted-foreground">
            {totalEngagements} engagements from 2019 to 2026, from a first long-running design and
            social media role through to AI-assisted design and e-commerce creative work.
          </p>
        </motion.div>

        {/* The rail runs the full height behind every era marker. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent md:left-[15px]"
          />

          <ol className="space-y-14">
            {careerTimeline.map((era, eraIndex) => (
              <motion.li
                key={era.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(eraIndex, 4) * 0.05 }}
                className="relative pl-10 md:pl-14"
              >
                {/* Era marker sitting on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(139,92,246,0.5)] md:h-8 md:w-8"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary md:h-2 md:w-2" />
                </span>

                <header className="mb-5">
                  <h3 className="font-mono text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {era.years}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {era.focus}
                  </p>
                </header>

                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {era.roles.map((entry) => (
                    <li key={`${entry.company}-${entry.period}`}>
                      <div
                        className={`glass-panel h-full rounded-xl border-border p-4 transition-colors duration-300 hover:border-primary/40 ${
                          entry.longRunning ? 'ring-1 ring-inset ring-primary/25' : ''
                        }`}
                      >
                        {/* Period sits above the name so long company names never collide with it. */}
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="w-fit border-primary/20 bg-primary/5 font-mono text-[11px] text-primary"
                          >
                            {entry.period}
                          </Badge>
                          {entry.longRunning && (
                            <span className="text-[11px] text-muted-foreground">
                              Long-running engagement
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold leading-snug text-foreground">
                          {entry.company}
                        </h4>
                        <p className="mt-1 text-sm leading-snug text-muted-foreground">
                          {entry.role}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
