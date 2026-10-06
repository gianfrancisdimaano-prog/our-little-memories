import { cn } from "@/lib/utils";

type OrnamentVariant = "flourish" | "heart" | "sprig";

interface OrnamentProps {
  /** Which decorative motif to render. */
  variant?: OrnamentVariant;
  /** Size in pixels (width and height). */
  size?: number;
  className?: string;
}

/**
 * Small reusable gold floral / heart ornaments drawn as inline SVG.
 * No external assets — safe to drop anywhere for a touch of gilding.
 */
export function Ornament({
  variant = "flourish",
  size = 28,
  className,
}: OrnamentProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    focusable: false,
  };

  if (variant === "heart") {
    return (
      <svg
        {...common}
        aria-hidden="true"
        className={cn("text-gold", className)}
      >
        <path d="M12 20s-6.5-4.35-8.6-8.2C1.9 9.1 3.2 6 6.2 5.4c1.9-.4 3.6.6 4.6 2.1.2.3.6.3.8 0 1-1.5 2.7-2.5 4.6-2.1 3 .6 4.3 3.7 2.8 6.4C18.5 15.65 12 20 12 20Z" />
      </svg>
    );
  }

  if (variant === "sprig") {
    return (
      <svg
        {...common}
        aria-hidden="true"
        className={cn("text-gold", className)}
      >
        <path d="M12 21V8" />
        <path d="M12 12c-2.4-.4-4-2-4.4-4.4C10 7.6 11.6 9.2 12 12Z" />
        <path d="M12 12c2.4-.4 4-2 4.4-4.4C14 7.6 12.4 9.2 12 12Z" />
        <path d="M12 16c-2.4-.4-4-2-4.4-4.4C10 11.6 11.6 13.2 12 16Z" />
        <path d="M12 16c2.4-.4 4-2 4.4-4.4C14 11.6 12.4 13.2 12 16Z" />
        <circle cx="12" cy="6" r="1.6" />
      </svg>
    );
  }

  // flourish — a symmetrical leafy divider motif
  return (
    <svg {...common} aria-hidden="true" className={cn("text-gold", className)}>
      <path d="M12 12c-1.6-2.4-4-3.2-6.4-2.4C6.4 12 8.8 13.2 12 12Z" />
      <path d="M12 12c1.6-2.4 4-3.2 6.4-2.4C17.6 12 15.2 13.2 12 12Z" />
      <path d="M12 12c-1.2 1.8-1.2 3.8 0 5.6 1.2-1.8 1.2-3.8 0-5.6Z" />
      <circle cx="12" cy="12" r="1.1" />
    </svg>
  );
}

export default Ornament;
