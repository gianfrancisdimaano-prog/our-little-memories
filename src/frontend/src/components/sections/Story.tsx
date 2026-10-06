import Ornament from "@/components/Ornament";
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/content";
import useReveal from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * "Why I Love Our Story" — the five reasons rendered as elegant cards.
 *
 * The first card is featured (wider, warmer surface, larger type) and the
 * remaining four sit in a refined two-column grid. Each card carries a gold
 * border, a small floral / heart accent, a serif title, and readable body
 * text, with a soft hover lift and glow. Cards fade in with a gentle stagger.
 */
export default function Story() {
  const [featured, ...rest] = content.storyCards;

  return (
    <section
      id="story"
      data-ocid="story.section"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      {/* Soft ambient backdrop */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(85% 65% at 50% 20%, oklch(0.21 0.055 14) 0%, oklch(0.16 0.045 15) 62%, oklch(0.13 0.04 14) 100%)",
          }}
        />
        <div
          className="absolute left-1/2 top-24 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "oklch(0.78 0.13 84 / 0.06)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Our Story"
          title={content.storyHeading}
          subtitle={content.storyIntro}
          className="mb-14"
        />

        {featured ? (
          <StoryCard
            title={featured.title}
            body={featured.body}
            index={0}
            featured
          />
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {rest.map((card, index) => (
              <StoryCard
                key={card.title}
                title={card.title}
                body={card.body}
                index={index + 1}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface StoryCardProps {
  title: string;
  body: string;
  /** Position in the list, used only to stagger the reveal. */
  index: number;
  featured?: boolean;
}

function StoryCard({ title, body, index, featured = false }: StoryCardProps) {
  const { ref, isVisible, revealProps } = useReveal<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <div
      ref={ref}
      {...revealProps}
      style={{ transitionDelay: `${index * 110}ms` }}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <article
        data-ocid={`story.card.${index + 1}`}
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border border-accent/35 bg-card/80 shadow-soft backdrop-blur-sm transition-smooth hover:-translate-y-1.5 hover:border-accent/70 hover:shadow-glow",
          featured ? "px-7 py-9 sm:px-10 sm:py-11" : "px-6 py-8 sm:px-8",
        )}
      >
        {/* Inner hairline frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-xl border border-accent/15 transition-smooth group-hover:border-accent/30"
        />

        {/* Corner floral accents */}
        <Ornament
          variant="sprig"
          size={featured ? 34 : 26}
          className="absolute -right-1 -top-1 rotate-[22deg] opacity-50 transition-smooth group-hover:opacity-90"
        />

        <div className="relative flex h-full flex-col">
          <div className="flex items-center gap-3">
            <Ornament variant="heart" size={featured ? 22 : 18} />
            <span className="h-px flex-1 bg-gradient-gold opacity-60" />
          </div>

          <h3
            className={cn(
              "mt-5 font-display font-semibold leading-snug text-foreground",
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "mt-3 font-body leading-relaxed text-muted-foreground",
              featured ? "text-base sm:text-lg" : "text-sm sm:text-base",
            )}
          >
            {body}
          </p>
        </div>
      </article>
    </div>
  );
}
