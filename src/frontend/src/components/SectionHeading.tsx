import { Ornament } from "@/components/Ornament";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  /** The elegant serif section title. */
  title: string;
  /** Optional supporting line beneath the title. */
  subtitle?: string;
  /** Center the heading (default) or align it to the start. */
  align?: "center" | "start";
  className?: string;
}

/**
 * Reusable elegant serif section heading with a gold ornamental divider.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="label-eyebrow text-gold/80">{eyebrow}</span>
      ) : null}

      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>

      <div
        className={cn(
          "flex items-center gap-3",
          centered ? "justify-center" : "justify-start",
        )}
        aria-hidden="true"
      >
        <span className="h-px w-10 bg-gradient-gold sm:w-16" />
        <Ornament variant="flourish" size={22} className="shrink-0" />
        <span className="h-px w-10 bg-gradient-gold sm:w-16" />
      </div>

      {subtitle ? (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-muted-foreground",
            centered ? "mx-auto" : "",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
