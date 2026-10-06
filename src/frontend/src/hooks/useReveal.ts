import { useEffect, useRef, useState } from "react";

/**
 * Gentle fade-in-on-scroll reveal.
 *
 * Attach the returned `ref` to any element and spread `revealProps` onto it.
 * The element starts hidden and softly fades/slides into view the first time
 * it enters the viewport. Respects `prefers-reduced-motion` by revealing
 * immediately for users who ask for less motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const threshold = options?.threshold ?? 0.15;
  const rootMargin = options?.rootMargin ?? "0px 0px -10% 0px";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return {
    ref,
    isVisible,
    revealProps: {
      "data-reveal": isVisible ? "visible" : "hidden",
    } as const,
  };
}

export default useReveal;
