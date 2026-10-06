import Ornament from "@/components/Ornament";
import { content } from "@/content";
import useReveal from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Renders a single line of the letter, turning `**phrase**` into bold text.
 *
 * Everything else — every word, space, and emoji — is passed through exactly
 * as written. Only the asterisk markers themselves are consumed.
 */
function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          // biome-ignore lint/suspicious/noArrayIndexKey: static, order-stable split
          key={index}
          className="font-semibold text-[oklch(0.3_0.09_18)]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/**
 * The personal letter, rendered verbatim from `content.letter`.
 *
 * The text is split on blank lines purely to add paragraph spacing — every
 * word, line break, and paragraph is preserved exactly as stored. Presented
 * as an elegant cream paper card with a thin gold border, soft shadow, and
 * floral / gold ornaments, revealed with a gentle fade-in on scroll.
 */
export default function Letter() {
  const { ref, isVisible, revealProps } = useReveal<HTMLDivElement>({
    threshold: 0.12,
  });

  // Split on blank lines for spacing only; never alter the words themselves.
  const paragraphs = content.letter.split(/\n\s*\n/);

  return (
    <section
      id="letter"
      data-ocid="letter.section"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      {/* Soft ambient backdrop */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(90% 70% at 50% 30%, oklch(0.22 0.06 14) 0%, oklch(0.16 0.045 15) 60%, oklch(0.13 0.04 14) 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "oklch(0.78 0.13 84 / 0.07)" }}
        />
        <LeafSprig className="absolute -left-8 top-16 h-56 w-56 opacity-[0.1]" />
        <LeafSprig className="absolute -right-8 bottom-16 h-56 w-56 -scale-x-100 opacity-[0.1]" />
      </div>

      <div
        ref={ref}
        {...revealProps}
        className={cn(
          "relative z-10 mx-auto max-w-3xl transition-all duration-1000 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        {/* Section heading */}
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="label-eyebrow text-accent/90">A Letter For You</p>
          <div className="mt-5 flex items-center gap-3 text-accent/70">
            <span className="h-px w-12 bg-gradient-gold sm:w-20" />
            <Ornament variant="flourish" size={22} />
            <span className="h-px w-12 bg-gradient-gold sm:w-20" />
          </div>
        </div>

        {/* Paper card */}
        <div className="relative">
          {/* Floral ornaments peeking around the card */}
          <Ornament
            variant="sprig"
            size={40}
            className="absolute -left-3 -top-5 rotate-[-18deg] opacity-80 sm:-left-6"
          />
          <Ornament
            variant="sprig"
            size={40}
            className="absolute -right-3 -top-5 rotate-[18deg] opacity-80 sm:-right-6"
          />
          <Ornament
            variant="heart"
            size={26}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 animate-heart-beat"
          />

          <article
            data-ocid="letter.card"
            className="relative rounded-2xl border border-accent/50 bg-[oklch(0.95_0.025_85)] px-6 py-10 shadow-elevated sm:px-12 sm:py-14"
          >
            {/* Inner hairline frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-xl border border-accent/30"
            />

            <div className="relative">
              <p className="font-display text-2xl font-medium italic text-[oklch(0.32_0.09_18)] sm:text-3xl">
                {renderInline(paragraphs[0])}
              </p>

              <div className="mt-6 space-y-5">
                {paragraphs.slice(1).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="whitespace-pre-line font-body text-base leading-[1.85] text-[oklch(0.3_0.03_40)] sm:text-lg"
                  >
                    {renderInline(paragraph)}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-3 text-accent/70">
                <span className="h-px w-10 bg-gradient-gold" />
                <Ornament variant="heart" size={16} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
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
