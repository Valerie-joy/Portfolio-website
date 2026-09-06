import React, { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PortfolioImage } from '@/data/portfolio-manifest';

interface LightboxProps {
  images: PortfolioImage[];
  index: number | null;
  label: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Horizontal travel, in px, that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD = 50;

/**
 * Full-bleed image viewer layered over an already-open dialog, so we never
 * nest one Radix dialog inside another.
 */
export function Lightbox({ images, index, label, onIndexChange, onClose }: LightboxProps) {
  const reduceMotion = useReducedMotion();
  const isOpen = index !== null;
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const step = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      } else if (event.key === 'Escape') {
        // Stop the parent dialog from closing along with the lightbox.
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    };
    // Capture phase so Escape reaches us before Radix's dialog handler.
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, step, onClose]);

  // Touch devices have no arrow keys and no hover, so swiping carries paging.
  const handlePointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === 'mouse') return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    // Ignore mostly-vertical drags so scrolling still feels natural.
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1);
    }
  };

  const active = index === null ? null : { position: index, image: images[index] };

  return (
    <AnimatePresence>
      {active?.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-30 flex flex-col bg-background/97 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} — image ${active.position + 1} of ${images.length}`}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/5 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm">
                <span className="text-foreground/90">{label}</span>
                <span className="mx-2 text-white/20">/</span>
                <span className="font-mono tabular-nums text-muted-foreground">
                  {active.position + 1} of {images.length}
                </span>
              </p>
              {images.length > 1 && (
                <p className="mt-0.5 hidden text-xs text-muted-foreground/70 sm:block">
                  Use <kbd className="font-sans text-foreground/70">←</kbd>{' '}
                  <kbd className="font-sans text-foreground/70">→</kbd> to browse,{' '}
                  <kbd className="font-sans text-foreground/70">Esc</kbd> to go back
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center p-3 sm:px-20 sm:py-6"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <motion.img
              key={active.image.id}
              src={active.image.view}
              alt={`${label} — image ${active.position + 1}`}
              width={active.image.width}
              height={active.image.height}
              draggable={false}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="max-h-full max-w-full rounded-lg object-contain shadow-[0_20px_70px_rgba(0,0,0,0.6)]"
            />

            {images.length > 1 && (
              <>
                <NavButton side="left" onClick={() => step(-1)} />
                <NavButton side="right" onClick={() => step(1)} />
              </>
            )}
          </div>

          {images.length > 1 && (
            <p className="shrink-0 pb-3 text-center text-xs text-muted-foreground/70 sm:hidden">
              Swipe or tap the arrows to browse
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        side === 'left' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'
      }`}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
