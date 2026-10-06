import PetalOverlay from "@/components/PetalOverlay";
import Album from "@/components/sections/Album";
import Finale from "@/components/sections/Finale";
import Hero from "@/components/sections/Hero";
import Letter from "@/components/sections/Letter";
import Song from "@/components/sections/Song";
import Story from "@/components/sections/Story";
import { useCallback, useState } from "react";

/**
 * Single-page romantic monthsary site.
 *
 * Sections render in order: Hero → Letter → Album → Song → Story → Finale.
 * A shared petal overlay drifts above the page, and the finale button
 * releases a celebratory burst through the same overlay.
 */
export default function App() {
  const [burstSignal, setBurstSignal] = useState(0);

  const handleOpenLetter = useCallback(() => {
    const target = document.getElementById("letter");
    if (!target) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const handleBurst = useCallback(() => {
    setBurstSignal((current) => current + 1);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <PetalOverlay burstSignal={burstSignal} />

      <main className="relative z-10">
        <Hero onOpenLetter={handleOpenLetter} />
        <Letter />
        <Album />
        <Song />
        <Story />
        <Finale onBurst={handleBurst} />
      </main>
    </div>
  );
}
