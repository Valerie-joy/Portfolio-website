import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { toolkit, totalCategories, totalTools, type ToolGroup } from '@/data/toolkit';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/**
 * Technical Expertise, grouped by discipline rather than scored.
 * Content comes from `@/data/toolkit`.
 */
export function TechnicalExpertise() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative border-y border-white/5 bg-background/50 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Technical Expertise</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {totalTools} tools across {totalCategories} categories, grouped by how they are actually
            used in client work.
          </p>
        </motion.div>

        <div className="space-y-16">
          {toolkit.map((group, groupIndex) => (
            <Group key={group.id} group={group} groupIndex={groupIndex} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Group({
  group,
  groupIndex,
  reduceMotion,
}: {
  group: ToolGroup;
  groupIndex: number;
  reduceMotion: boolean | null;
}) {
  const isPrimary = group.emphasis === 'primary';

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(groupIndex, 3) * 0.05 }}
    >
      <div className="mb-6 flex items-center gap-4">
        <h3
          className={`shrink-0 font-semibold tracking-tight ${
            isPrimary ? 'text-xl text-foreground md:text-2xl' : 'text-base text-foreground/80 md:text-lg'
          }`}
        >
          {group.title}
        </h3>
        <span
          className={`h-px flex-1 ${
            isPrimary ? 'bg-gradient-to-r from-primary/50 to-transparent' : 'bg-white/10'
          }`}
        />
      </div>

      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${
          isPrimary ? 'lg:grid-cols-3 lg:gap-6' : 'lg:grid-cols-4'
        }`}
      >
        {group.categories.map((category) => (
          <div
            key={category.name}
            className={`h-full rounded-2xl transition-colors duration-300 ${
              isPrimary
                ? 'glass-panel border-border p-5 hover:border-primary/40 sm:p-6'
                : 'border border-white/10 bg-white/[0.03] p-5 hover:border-primary/25 hover:bg-white/[0.05]'
            }`}
          >
            <h4
              className={`font-semibold leading-snug tracking-tight ${
                isPrimary ? 'text-base text-foreground md:text-lg' : 'text-sm text-foreground/90'
              }`}
            >
              {category.name}
            </h4>
            <div
              className={`mt-1.5 h-px w-10 rounded-full ${
                isPrimary ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-white/15'
              }`}
            />

            <ul className="mt-4 flex flex-wrap gap-2">
              {category.tools.map((tool) => (
                <li key={tool}>
                  <span
                    className={`inline-block rounded-md px-2.5 py-1 text-xs leading-tight ${
                      isPrimary
                        ? 'border border-primary/20 bg-primary/10 font-medium text-primary'
                        : 'border border-white/10 bg-white/5 text-muted-foreground'
                    }`}
                  >
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
