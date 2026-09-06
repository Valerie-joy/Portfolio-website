import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioCategory } from '@/data/portfolio-manifest';

/**
 * True on devices with a real pointer. Touch devices get the same card without
 * the tilt, since there is no hover state to drive it.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setFine(query.matches);
    const onChange = (event: MediaQueryListEvent) => setFine(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return fine;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };
/** Kept deliberately shallow — enough to read as depth, not as a novelty. */
const MAX_TILT = 5;

interface PerspectiveCardProps {
  category: PortfolioCategory;
  index: number;
  onOpen: () => void;
}

export function PerspectiveCard({ category, index, onOpen }: PerspectiveCardProps) {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const tiltEnabled = finePointer && !reduceMotion;

  // -0.5 .. 0.5, relative to the card's own box.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), SPRING);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), SPRING);

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!tiltEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const cover = category.cover;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(index, 5) * 0.06 }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onBlur={resetTilt}
        aria-label={`Open the ${category.title} gallery — ${category.count} ${
          category.count === 1 ? 'item' : 'items'
        }`}
        style={tiltEnabled ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className="group glass-panel relative flex h-full w-full flex-col overflow-hidden rounded-2xl text-left ring-1 ring-inset ring-white/5 transition-[box-shadow,transform] duration-300 hover:shadow-[0_24px_60px_rgba(88,28,180,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/*
          Square media: 9 of 11 covers are 1:1 and one is portrait, so a square
          frame shows the actual work rather than cropping a third of it away.
        */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {cover ? (
            <img
              src={cover.thumb}
              alt=""
              width={cover.width}
              height={cover.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-out will-change-transform group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/10" />
          )}

          {/*
            No scrim or colour wash over the artwork: the title sits below the
            image, so anything on top would only dim and tint the work itself.
            Hover is signalled by the frame and elevation instead.
          */}
        </div>

        {/*
          Title and blurb sit on solid panel below the image rather than over it,
          so they stay fully legible at every point in the tilt.
        */}
        <div
          className="relative flex flex-1 flex-col p-5 sm:p-6"
          style={tiltEnabled ? { transform: 'translateZ(35px)' } : undefined}
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-xl">
              {category.title}
            </h3>
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/70 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/15 group-hover:text-primary">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
            </span>
          </div>

          <p className="mb-4 mt-2 text-sm leading-relaxed text-muted-foreground">{category.blurb}</p>

          <div
            aria-hidden="true"
            className="mt-auto flex items-center gap-3 border-t border-white/5 pt-3 text-xs text-muted-foreground"
          >
            <span className="font-mono tabular-nums text-primary/90">
              {String(category.count).padStart(2, '0')}
            </span>
            <span>{category.count === 1 ? 'piece' : 'pieces'}</span>
            <span className="ml-auto text-foreground/50 transition-colors group-hover:text-primary">
              View gallery
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
