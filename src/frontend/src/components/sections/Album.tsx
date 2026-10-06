import { Ornament } from "@/components/Ornament";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Photo, content } from "@/content";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * Curated layout metadata for each photo card.
 *
 * The album is intentionally not a uniform grid: cards alternate between
 * portrait and landscape proportions, drift with a slight rotation, and
 * straighten + lift on hover. Everything collapses to a clean single column
 * on small screens.
 */
const CARD_LAYOUT = [
  { span: "sm:col-span-7", ratio: "aspect-[4/5]", rotate: "-rotate-1" },
  { span: "sm:col-span-5 sm:mt-10", ratio: "aspect-[4/3]", rotate: "rotate-1" },
  { span: "sm:col-span-5", ratio: "aspect-[4/3]", rotate: "rotate-1" },
  {
    span: "sm:col-span-7 sm:mt-10",
    ratio: "aspect-[4/5]",
    rotate: "-rotate-1",
  },
  { span: "sm:col-span-6", ratio: "aspect-square", rotate: "-rotate-1" },
  { span: "sm:col-span-6 sm:mt-8", ratio: "aspect-[4/5]", rotate: "rotate-1" },
] as const;

interface AlbumCardProps {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
}

function AlbumCard({ photo, index, onOpen }: AlbumCardProps) {
  const { ref, isVisible, revealProps } = useReveal<HTMLButtonElement>();
  const layout = CARD_LAYOUT[index % CARD_LAYOUT.length];
  const alt = photo.alt ?? photo.caption ?? "A cherished memory together";

  return (
    <button
      ref={ref}
      {...revealProps}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open photo${photo.caption ? `: ${photo.caption}` : ""}`}
      data-ocid={`album.item.${index + 1}`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
      className={cn(
        "group relative block w-full text-left transition-smooth",
        "focus-visible:outline-none",
        layout.span,
        layout.rotate,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "hover:rotate-0 hover:-translate-y-1.5",
        "focus-visible:rotate-0 focus-visible:-translate-y-1.5",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] border border-gold/35 bg-card p-2.5",
          "shadow-soft transition-smooth",
          "group-hover:border-gold/70 group-hover:shadow-glow",
          "group-focus-visible:border-gold/70 group-focus-visible:shadow-glow",
        )}
      >
        {/* Inner gilded hairline for a vintage frame feel */}
        <div className="pointer-events-none absolute inset-2.5 rounded-[1.35rem] border border-gold/20" />

        <div
          className={cn(
            "relative overflow-hidden rounded-[1.35rem]",
            layout.ratio,
          )}
        >
          <img
            src={photo.src}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition-smooth group-hover:scale-[1.04]"
          />
          {/* Soft vignette that warms on hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent opacity-70 transition-smooth group-hover:opacity-40" />
        </div>
      </div>

      {photo.caption ? (
        <p className="mt-3 px-1 text-center font-display text-base italic leading-snug text-cream/85 transition-smooth group-hover:text-gold">
          {photo.caption}
        </p>
      ) : null}
    </button>
  );
}

/**
 * "Our Little Memories ❤️" — the photo album section.
 *
 * Reads every photo from `content.photos`, arranges them in a curated
 * staggered layout with gilded vintage frames, and opens a lightbox on click.
 */
export default function Album() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, isVisible, revealProps } = useReveal<HTMLDivElement>();

  const photos = content.photos;
  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  return (
    <section
      id="album"
      data-ocid="album.section"
      className="relative overflow-hidden bg-gradient-subtle px-5 py-20 sm:px-8 sm:py-28"
    >
      {/* Ambient gold glow behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <div
          ref={ref}
          {...revealProps}
          className={cn(
            "transition-smooth",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <SectionHeading
            eyebrow="Our Little Memories ❤️"
            title={content.albumHeading}
            subtitle={content.albumIntro}
          />
        </div>

        {photos.length === 0 ? (
          <div
            data-ocid="album.empty_state"
            className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-gold/30 bg-card/40 px-6 py-16 text-center"
          >
            <Ornament variant="heart" size={34} />
            <p className="font-display text-xl text-foreground">
              Your album is waiting for its first memory
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Add photos to the{" "}
              <span className="font-mono text-gold">photos</span> list in{" "}
              <span className="font-mono text-gold">content.ts</span> and they
              will appear here, beautifully framed.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-7">
            {photos.map((photo, index) => (
              <AlbumCard
                key={`${photo.src}-${index}`}
                photo={photo}
                index={index}
                onOpen={setActiveIndex}
              />
            ))}
          </div>
        )}

        <div
          aria-hidden="true"
          className="mt-16 flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-gradient-gold" />
          <Ornament variant="sprig" size={22} />
          <span className="h-px w-16 bg-gradient-gold" />
        </div>
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent
          data-ocid="album.dialog"
          showCloseButton={false}
          className="max-w-3xl gap-0 overflow-hidden border-gold/40 bg-card p-0 shadow-glow"
        >
          {activePhoto ? (
            <>
              <div className="relative bg-background/60">
                <img
                  src={activePhoto.src}
                  alt={
                    activePhoto.alt ??
                    activePhoto.caption ??
                    "A cherished memory together"
                  }
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-gold/25 px-6 py-5">
                <div className="min-w-0">
                  <DialogTitle className="font-display text-xl font-semibold text-foreground">
                    {activePhoto.caption ?? "A moment worth keeping"}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-muted-foreground">
                    {activePhoto.caption
                      ? "One of our little memories."
                      : "Add a caption in content.ts to describe this photo."}
                  </DialogDescription>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close photo"
                  data-ocid="album.close_button"
                  className="shrink-0 rounded-full border border-gold/40 p-2 text-gold transition-smooth hover:bg-gold/15 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
