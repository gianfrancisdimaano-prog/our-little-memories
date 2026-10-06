import Ornament from "@/components/Ornament";
import { content } from "@/content";
import useReveal from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface FinaleProps {
  /** Releases a celebratory burst of petals through the shared overlay. */
  onBurst: () => void;
}

/**
 * The closing section — the heartfelt message in elegant serif type with a
 * glowing gold accent and an "I Love You ❤️" button that releases a burst of
 * petals. The button carries a gentle heart-beat pulse and a soft gold glow.
 */
export default function Finale({ onBurst }: FinaleProps) {
  const { ref, isVisible, revealProps } = useReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section
      id="finale"
      data-ocid="finale.section"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      {/* Warm candlelit backdrop */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(80% 70% at 50% 45%, oklch(0.24 0.07 16) 0%, oklch(0.16 0.045 15) 58%, oklch(0.12 0.04 14) 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-glow-pulse"
          style={{ background: "oklch(0.78 0.13 84 / 0.1)" }}
        />
      </div>

      <div
        ref={ref}
        {...revealProps}
        className={cn(
          "relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center transition-all duration-1000 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 text-accent/80">
          <span className="h-px w-12 bg-gradient-gold sm:w-20" />
          <Ornament variant="flourish" size={24} />
          <span className="h-px w-12 bg-gradient-gold sm:w-20" />
        </div>

        <p className="mt-10 font-display text-2xl font-medium italic leading-relaxed text-foreground sm:text-3xl md:text-[2.1rem]">
          {content.closingMessage}
        </p>

        <Ornament
          variant="heart"
          size={30}
          className="mt-10 animate-heart-beat"
        />

        <button
          type="button"
          data-ocid="finale.primary_button"
          onClick={onBurst}
          className="group relative mt-10 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-primary px-9 py-4 font-body text-base font-medium tracking-wide text-primary-foreground shadow-elevated transition-smooth hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-accent/50 transition-smooth group-hover:border-accent/80"
          />
          <span className="relative">{content.finaleButtonLabel}</span>
          <span
            aria-hidden="true"
            className="relative animate-heart-beat text-lg leading-none"
          >
            ❤️
          </span>
        </button>

        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground/70">
          Tap to send a little love
        </p>
      </div>
    </section>
  );
}
