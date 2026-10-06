import Ornament from "@/components/Ornament";
import { content } from "@/content";

interface HeroProps {
  /** Smoothly scrolls the page down to the letter section. */
  onOpenLetter: () => void;
}

/**
 * Full-viewport romantic opening.
 *
 * The floral backdrop is built entirely from layered CSS gradients and inline
 * SVG rose / leaf motifs plus soft blurred bokeh — no external image URLs.
 * A gilded frame borders the content, a gentle glow sits behind the headline,
 * and a few petals drift softly on top.
 */
export default function Hero({ onOpenLetter }: HeroProps) {
  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6"
    >
      {/* ── Floral backdrop ─────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Deep burgundy radial wash */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 90% at 50% 0%, oklch(0.28 0.09 16) 0%, oklch(0.19 0.06 15) 45%, oklch(0.13 0.04 14) 100%)",
          }}
        />
        {/* Warm gold bloom behind the headline */}
        <div
          className="absolute left-1/2 top-[38%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full blur-3xl"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.78 0.13 84 / 0.16) 0%, oklch(0.62 0.14 8 / 0.10) 40%, transparent 70%)",
          }}
        />
        {/* Soft blurred bokeh orbs */}
        <div
          className="absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "oklch(0.55 0.17 18 / 0.22)" }}
        />
        <div
          className="absolute -right-20 bottom-16 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "oklch(0.62 0.14 8 / 0.18)" }}
        />
        <div
          className="absolute right-1/4 top-10 h-40 w-40 rounded-full blur-2xl"
          style={{ background: "oklch(0.86 0.08 85 / 0.12)" }}
        />

        {/* Inline-SVG rose motifs, tucked into the corners */}
        <RoseMotif className="absolute -left-10 -top-10 h-64 w-64 opacity-[0.16] sm:h-80 sm:w-80" />
        <RoseMotif className="absolute -bottom-12 -right-10 h-72 w-72 rotate-180 opacity-[0.14] sm:h-96 sm:w-96" />
        <LeafSprig className="absolute left-6 top-1/3 h-40 w-40 opacity-[0.12] sm:left-16" />
        <LeafSprig className="absolute bottom-1/4 right-6 h-40 w-40 -scale-x-100 opacity-[0.12] sm:right-16" />

        {/* Fine gold grain lines */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, oklch(0.86 0.08 85) 0px, oklch(0.86 0.08 85) 1px, transparent 1px, transparent 26px)",
          }}
        />
      </div>

      {/* ── Drifting petals (local to the hero) ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {HERO_PETALS.map((petal) => (
          <span
            key={petal.id}
            className="absolute top-0 block animate-petal-fall will-change-transform"
            style={{
              left: `${petal.left}%`,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              opacity: petal.opacity,
            }}
          >
            <span
              className="block animate-petal-sway"
              style={{ animationDuration: `${petal.sway}s` }}
            >
              <svg
                width={petal.size}
                height={petal.size}
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12 2c4 3.2 7 6.4 7 10.4A7 7 0 0 1 5 12.4C5 8.4 8 5.2 12 2Z"
                  fill={petal.color}
                />
              </svg>
            </span>
          </span>
        ))}
      </div>

      {/* ── Gilded frame + content ──────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-3xl">
        <div className="relative rounded-[1.75rem] border border-accent/40 bg-background/30 px-6 py-14 shadow-elevated backdrop-blur-[2px] sm:px-12 sm:py-20">
          {/* Inner hairline frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 rounded-[1.4rem] border border-accent/25"
          />
          {/* Corner flourishes */}
          <CornerFlourish className="absolute left-3 top-3 h-6 w-6 text-accent/70" />
          <CornerFlourish className="absolute right-3 top-3 h-6 w-6 rotate-90 text-accent/70" />
          <CornerFlourish className="absolute bottom-3 right-3 h-6 w-6 rotate-180 text-accent/70" />
          <CornerFlourish className="absolute bottom-3 left-3 h-6 w-6 -rotate-90 text-accent/70" />

          <div className="relative flex flex-col items-center text-center">
            <p className="label-eyebrow text-accent/90">{content.eyebrow}</p>

            <div className="mt-6 flex items-center gap-3 text-accent/70">
              <span className="h-px w-10 bg-gradient-gold sm:w-16" />
              <Ornament variant="flourish" size={22} />
              <span className="h-px w-10 bg-gradient-gold sm:w-16" />
            </div>

            <h1 className="mt-8 max-w-2xl text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground drop-shadow-[0_2px_24px_rgba(212,175,55,0.18)] sm:text-6xl md:text-7xl">
              {content.heroHeadline}
            </h1>

            <p className="mt-6 max-w-xl text-pretty font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.heroSubtitle}
            </p>

            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={onOpenLetter}
              className="group mt-10 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 font-body text-sm font-medium tracking-wide text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span>{content.letterButtonLabel}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                💌
              </span>
            </button>

            <div className="mt-10 flex items-center gap-3 text-accent/60">
              <span className="h-px w-8 bg-gradient-gold" />
              <Ornament
                variant="heart"
                size={18}
                className="animate-heart-beat"
              />
              <span className="h-px w-8 bg-gradient-gold" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Decorative inline-SVG helpers ─────────────────────────────────────── */

interface PetalSpec {
  id: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  color: string;
}

const HERO_PETALS: PetalSpec[] = [
  {
    id: "hp-1",
    left: 8,
    size: 16,
    duration: 15,
    delay: 0,
    sway: 5,
    opacity: 0.5,
    color: "oklch(0.42 0.17 18)",
  },
  {
    id: "hp-2",
    left: 22,
    size: 12,
    duration: 19,
    delay: 3,
    sway: 6,
    opacity: 0.4,
    color: "oklch(0.72 0.09 12)",
  },
  {
    id: "hp-3",
    left: 38,
    size: 18,
    duration: 17,
    delay: 6,
    sway: 4.5,
    opacity: 0.45,
    color: "oklch(0.78 0.13 84)",
  },
  {
    id: "hp-4",
    left: 55,
    size: 14,
    duration: 21,
    delay: 1.5,
    sway: 5.5,
    opacity: 0.42,
    color: "oklch(0.42 0.17 18)",
  },
  {
    id: "hp-5",
    left: 71,
    size: 20,
    duration: 16,
    delay: 8,
    sway: 6.5,
    opacity: 0.38,
    color: "oklch(0.72 0.09 12)",
  },
  {
    id: "hp-6",
    left: 86,
    size: 13,
    duration: 20,
    delay: 4.5,
    sway: 5,
    opacity: 0.48,
    color: "oklch(0.78 0.13 84)",
  },
  {
    id: "hp-7",
    left: 63,
    size: 11,
    duration: 23,
    delay: 11,
    sway: 4,
    opacity: 0.35,
    color: "oklch(0.42 0.17 18)",
  },
];

function RoseMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="oklch(0.86 0.08 85)"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <circle cx="100" cy="100" r="14" />
        <path d="M100 86c-10 0-18 6-18 14s8 14 18 14 18-6 18-14-8-14-18-14Z" />
        <path d="M100 74c-18 0-32 11-32 26s14 26 32 26 32-11 32-26-14-26-32-26Z" />
        <path d="M100 60c-26 0-46 17-46 40s20 40 46 40 46-17 46-40-20-40-46-40Z" />
        <path d="M100 44c-34 0-60 24-60 56s26 56 60 56 60-24 60-56-26-56-60-56Z" />
        <path d="M100 28c-42 0-74 31-74 72s32 72 74 72 74-31 74-72-32-72-74-72Z" />
      </g>
      <g fill="oklch(0.62 0.14 8)" opacity="0.5">
        <ellipse cx="100" cy="30" rx="9" ry="16" />
        <ellipse cx="170" cy="100" rx="16" ry="9" />
        <ellipse cx="100" cy="170" rx="9" ry="16" />
        <ellipse cx="30" cy="100" rx="16" ry="9" />
      </g>
    </svg>
  );
}

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="oklch(0.86 0.08 85)"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M60 195C60 140 60 90 60 20" />
        <path d="M60 60C40 56 26 42 22 22c20 4 34 18 38 38Z" />
        <path d="M60 60c20-4 34-18 38-38-20 4-34 18-38 38Z" />
        <path d="M60 100c-20-4-34-18-38-38 20 4 34 18 38 38Z" />
        <path d="M60 100c20-4 34-18 38-38-20 4-34 18-38 38Z" />
        <path d="M60 140c-20-4-34-18-38-38 20 4 34 18 38 38Z" />
        <path d="M60 140c20-4 34-18 38-38-20 4-34 18-38 38Z" />
      </g>
    </svg>
  );
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      >
        <path d="M2 12V4a2 2 0 0 1 2-2h8" />
        <path d="M6 10c0-2.2 1.8-4 4-4" />
        <circle cx="5" cy="5" r="1.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
