import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Lightbox } from './Lightbox';
import type { PortfolioCategory, PortfolioImage } from '@/data/portfolio-manifest';

interface CategoryDialogProps {
  category: PortfolioCategory | null;
  /** When set, the gallery opens straight into the viewer at this image. */
  initialImageIndex?: number | null;
  onOpenChange: (open: boolean) => void;
}

interface ImageGroup {
  name: string | null;
  images: PortfolioImage[];
}

/** Keeps sub-folders (e.g. CeraVe / I-on) as labelled sets inside one gallery. */
function groupImages(images: PortfolioImage[]): ImageGroup[] {
  const groups: ImageGroup[] = [];
  for (const image of images) {
    const last = groups[groups.length - 1];
    if (last && last.name === image.group) {
      last.images.push(image);
    } else {
      groups.push({ name: image.group, images: [image] });
    }
  }
  return groups;
}

export function CategoryDialog({
  category,
  initialImageIndex = null,
  onOpenChange,
}: CategoryDialogProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // The gallery's flat order is what the lightbox pages through.
  const images = category?.images ?? [];
  const groups = useMemo(() => groupImages(images), [images]);

  // Re-sync whenever a different category (or a different entry point) opens.
  useEffect(() => {
    setLightboxIndex(initialImageIndex);
  }, [category?.slug, initialImageIndex]);

  let runningIndex = 0;

  return (
    <Dialog open={category !== null} onOpenChange={onOpenChange}>
      {/*
        `[&>button]:hidden` suppresses the shared dialog's small default close
        control so we can use a touch-sized one in the header instead. Scoped to
        this dialog only — components/ui/dialog.tsx is untouched.
      */}
      <DialogContent className="flex h-[92dvh] max-h-none w-[calc(100vw-1.5rem)] max-w-6xl flex-col gap-0 overflow-hidden rounded-2xl border-white/10 p-0 [&>button]:hidden">
        {category && (
          <>
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/5 px-5 py-5 sm:px-8 sm:py-6">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
                  {category.images.length} {category.images.length === 1 ? 'image' : 'images'}
                </p>
                <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                  {category.title}
                </DialogTitle>
                <DialogDescription className="mt-2 max-w-2xl text-sm leading-relaxed">
                  {category.blurb}
                </DialogDescription>
              </div>
              <DialogClose
                aria-label="Close gallery"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-5 w-5" />
              </DialogClose>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
              {groups.map((group) => (
                <section key={group.name ?? 'all'} className="mb-2 last:mb-0">
                  {group.name && (
                    <div className="mb-4 flex items-center gap-3">
                      <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/70">
                        {group.name}
                      </h4>
                      <span className="h-px flex-1 bg-white/10" />
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {group.images.length}
                      </span>
                    </div>
                  )}
                  {/* Masonry columns keep every original aspect ratio intact. */}
                  <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
                    {group.images.map((image) => {
                      const index = runningIndex;
                      runningIndex += 1;
                      return (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() => setLightboxIndex(index)}
                          aria-label={`View ${category.title} image ${index + 1} full size`}
                          className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-muted transition-colors duration-300 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <img
                            src={image.thumb}
                            alt={`${category.title} — image ${index + 1}`}
                            width={image.width}
                            height={image.height}
                            loading="lazy"
                            decoding="async"
                            style={{ aspectRatio: `${image.width} / ${image.height}` }}
                            className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <Lightbox
              images={images}
              index={lightboxIndex}
              label={category.title}
              onIndexChange={setLightboxIndex}
              onClose={() => setLightboxIndex(null)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
