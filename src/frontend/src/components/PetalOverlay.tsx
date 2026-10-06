import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface PetalOverlayProps {
  /** Number of petals drifting continuously in the background. */
  count?: number;
  /**
   * Increment this value to release a one-off burst of petals.
   * The finale button uses it to celebrate.
   */
  burstSignal?: number;
  /** How many petals a single burst releases. */
  burstCount?: number;
  className?: string;
}

interface Petal {
  id: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
  hue: "burgundy" | "blush" | "gold";
  opacity: number;
}

const HUES: Record<Petal["hue"], string> = {
  burgundy: "oklch(0.42 0.17 18)",
  blush: "oklch(0.72 0.09 12)",
  gold: "oklch(0.78 0.13 84)",
};

function makePetal(id: string, seed: number): Petal {
  const rand = (n: number) => {
    const x = Math.sin(seed * 999 + n * 37.13) * 10000;
    return x - Math.floor(x);
  };
  const hueKeys: Petal["hue"][] = ["burgundy", "blush", "gold"];
  return {
    id,
    left: rand(1) * 100,
    size: 10 + rand(2) * 16,
    duration: 11 + rand(3) * 12,
    delay: rand(4) * 14,
    swayDuration: 4 + rand(5) * 5,
    hue: hueKeys[Math.floor(rand(6) * hueKeys.length)],
    opacity: 0.35 + rand(7) * 0.45,
  };
}

/**
 * Reusable, pointer-events-none fixed overlay of soft floating flower petals.
 * Petals drift continuously; bump `burstSignal` to release a celebratory burst.
 */
export function PetalOverlay({
  count = 14,
  burstSignal = 0,
  burstCount = 18,
  className,
}: PetalOverlayProps) {
  const basePetals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => makePetal(`petal-${i}`, i + 1)),
    [count],
  );

  const [burstPetals, setBurstPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (burstSignal <= 0) return;
    const fresh = Array.from({ length: burstCount }, (_, i) =>
      makePetal(`burst-${burstSignal}-${i}`, burstSignal * 100 + i + 1),
    );
    setBurstPetals(fresh);
    const timer = window.setTimeout(() => setBurstPetals([]), 16000);
    return () => window.clearTimeout(timer);
  }, [burstSignal, burstCount]);

  const renderPetal = (petal: Petal) => (
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
        style={{ animationDuration: `${petal.swayDuration}s` }}
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
            fill={HUES[petal.hue]}
          />
        </svg>
      </span>
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-30 overflow-hidden",
        className,
      )}
    >
      {basePetals.map(renderPetal)}
      {burstPetals.map(renderPetal)}
    </div>
  );
}

export default PetalOverlay;
