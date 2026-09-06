import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import {
  credentialsCategory,
  processCategory,
  workCategories,
  type PortfolioCategory,
} from '@/data/portfolio-manifest';
import { PerspectiveCard } from './PerspectiveCard';
import { CategoryDialog } from './CategoryDialog';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/**
 * The "Perspective field" — every portfolio folder surfaced as a category card,
 * with the process flow and credentials given their own treatment below.
 */
export function PerspectiveField() {
  const [open, setOpen] = useState<{
    category: PortfolioCategory;
    imageIndex: number | null;
  } | null>(null);
  const reduceMotion = useReducedMotion();

  const totalPieces = workCategories.reduce((sum, category) => sum + category.count, 0);
  // Local bindings so the null-narrowing below survives into the click handlers.
  const process = processCategory;
  const credentials = credentialsCategory;

  return (
    <>
      <section id="work" className="relative border-y border-white/5 py-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-14 max-w-3xl"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
              Selected Work
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Portfolio</h2>
            <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <p className="text-base leading-relaxed text-muted-foreground">
              {workCategories.length} categories, {totalPieces} pieces of client and concept work
              across advertising creative, e-commerce content, retouching and product mockups.
              Open any category to browse the full set.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {workCategories.map((category, index) => (
              <PerspectiveCard
                key={category.slug}
                category={category}
                index={index}
                onOpen={() => setOpen({ category, imageIndex: null })}
              />
            ))}
          </div>
        </div>
      </section>

      {process && process.images.length > 0 && (
        <section id="process" className="relative py-24">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-14 max-w-2xl"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
                How I Work
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {process.title}
              </h2>
              <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <p className="text-base leading-relaxed text-muted-foreground">
                {process.blurb}
              </p>
            </motion.div>

            <ol className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {process.images.map((image, index) => (
                <motion.li
                  key={image.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                  className="glass-panel overflow-hidden rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => setOpen({ category: process, imageIndex: index })}
                    aria-label={`View step ${index + 1} of my sample process full size`}
                    className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  >
                    <div className="relative overflow-hidden bg-muted">
                      <img
                        src={image.thumb}
                        alt={`Sample process, step ${index + 1}`}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                        style={{ aspectRatio: `${image.width} / ${image.height}` }}
                        className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex items-center gap-3 p-5">
                      <span className="font-mono text-sm font-semibold text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                        View full size
                      </span>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {credentials && credentials.documents.length > 0 && (
        <section
          id="certifications"
          className="relative border-y border-white/5 bg-background/50 py-24"
        >
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12 max-w-2xl"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
                Credentials
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {credentials.title}
              </h2>
              <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <p className="text-base leading-relaxed text-muted-foreground">
                {credentials.blurb}
              </p>
            </motion.div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {credentials.documents.map((doc, index) => (
                <motion.li
                  key={doc.id}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(index, 5) * 0.06 }}
                >
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <Award className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug transition-colors group-hover:text-primary">
                        {doc.title}
                      </span>
                      <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        View certificate
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CategoryDialog
        category={open?.category ?? null}
        initialImageIndex={open?.imageIndex ?? null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setOpen(null);
        }}
      />
    </>
  );
}
