import React, { useState } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

/** Served from public/resume/ — the original PDF, unmodified. */
const CV_PATH = '/resume/Valerie-Joy-Intong-Resume.pdf';
const CV_FILENAME = 'Valerie-Joy-Intong-Resume.pdf';

/**
 * Hero "Download CV" control. Opens a preview dialog rather than downloading
 * straight away, so visitors can read the CV first; the dialog still offers the
 * original file for download.
 *
 * The trigger keeps the hero's existing Button markup exactly as it was.
 */
export function CvButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="border-primary/20 hover:bg-primary/10 px-8"
        onClick={() => setOpen(true)}
      >
        Download CV
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        {/*
          `[&>button]:hidden` suppresses the shared dialog's small default close
          control in favour of the touch-sized one below. Scoped to this dialog;
          components/ui/dialog.tsx is untouched.
        */}
        <DialogContent className="flex h-[92dvh] max-h-none w-[calc(100vw-1.5rem)] max-w-5xl flex-col gap-0 overflow-hidden rounded-2xl border-white/10 p-0 [&>button]:hidden">
          <div className="flex shrink-0 flex-wrap items-start justify-between gap-3 border-b border-white/5 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <DialogTitle className="text-lg font-bold tracking-tight sm:text-xl">
                Curriculum Vitae
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm">
                Valerie Joy Intong — 2 pages. Scroll to read, or download the original PDF.
              </DialogDescription>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href={CV_PATH} download={CV_FILENAME}>
                  <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                  Download PDF
                </a>
              </Button>
              <DialogClose
                aria-label="Close CV preview"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </DialogClose>
            </div>
          </div>

          <div className="min-h-0 flex-1 bg-muted">
            <iframe
              src={`${CV_PATH}#view=FitH`}
              title="Valerie Joy Intong Resume"
              className="h-full w-full border-0"
            />
          </div>

          {/*
            Some mobile browsers (notably iOS Safari) refuse to render a PDF in
            an iframe, so always offer a direct route to the same file.
          */}
          <div className="shrink-0 border-t border-white/5 px-5 py-3 text-center text-xs text-muted-foreground sm:px-6">
            Trouble viewing it here?{' '}
            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Open the PDF in a new tab
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
