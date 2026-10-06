import Ornament from "@/components/Ornament";
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/content";
import useReveal from "@/hooks/useReveal";
import { cn } from "@/lib/utils";
import { Pause, Play, Volume2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Number of equalizer bars in the animated visualization. */
const BAR_COUNT = 28;

/** Deterministic per-bar animation specs so the equalizer feels organic. */
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const wave = Math.sin(i * 0.9) * 0.5 + 0.5;
  return {
    id: `bar-${i}`,
    duration: 0.7 + wave * 0.9,
    delay: (i % 7) * 0.11,
    minScale: 0.18 + wave * 0.12,
    maxScale: 0.55 + wave * 0.45,
  };
});

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * "Our Song" — a music-player-style card.
 *
 * The album art is a purely decorative CSS/SVG composition (no external or
 * copyrighted artwork). When `content.song.src` is set, a real HTMLAudioElement
 * drives play/pause and seeking; when it is empty, a friendly placeholder note
 * is shown and the play button still toggles the visualization without errors.
 * No song lyrics are ever displayed.
 */
export default function Song() {
  const { ref, isVisible, revealProps } = useReveal<HTMLDivElement>();

  const audioSrc = content.song.src.trim();
  const hasAudio = audioSrc.length > 0;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!hasAudio || !audio) {
      // Placeholder mode: still toggle the visualization, never throw.
      setIsPlaying((prev) => !prev);
      return;
    }
    if (!isPlaying) {
      setIsPlaying(true);
      const playback = audio.play();
      if (playback) void playback.catch(() => setHasError(true));
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  }, [hasAudio, isPlaying]);

  const handleSeek = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);
      setCurrentTime(next);
      const audio = audioRef.current;
      if (hasAudio && audio && Number.isFinite(audio.duration)) {
        audio.currentTime = next;
      }
    },
    [hasAudio],
  );

  // Keep the audio element's play state in sync with the UI state.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    if (isPlaying && audio.paused) {
      const playback = audio.play();
      if (playback) void playback.catch(() => setHasError(true));
    } else if (!isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying, hasAudio]);

  const progressPercent = useMemo(() => {
    if (!hasAudio || duration <= 0) return 0;
    return Math.min(100, (currentTime / duration) * 100);
  }, [hasAudio, currentTime, duration]);

  const statusLabel = hasError
    ? "This audio source could not be loaded."
    : hasAudio
      ? isPlaying
        ? "Now playing"
        : "Paused"
      : "Audio source not set";

  return (
    <section
      id="song"
      data-ocid="song.section"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28"
    >
      {/* Soft ambient glow behind the player */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.78 0.13 84 / 0.12) 0%, oklch(0.62 0.14 8 / 0.08) 45%, transparent 72%)",
        }}
      />

      <div
        ref={ref}
        {...revealProps}
        className={cn(
          "relative mx-auto max-w-3xl transition-all duration-1000 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <SectionHeading
          eyebrow="A Melody For Us"
          title={content.songHeading}
          subtitle={content.songIntro}
        />

        <div className="mt-12 rounded-[1.75rem] border border-accent/30 bg-card/70 p-6 shadow-elevated backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
            {/* ── Decorative album art ─────────────────────────────────── */}
            <div className="relative shrink-0">
              <div
                className={cn(
                  "relative flex h-40 w-40 items-center justify-center rounded-full border border-accent/40 shadow-soft sm:h-44 sm:w-44",
                  isPlaying && "shadow-glow",
                )}
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 32% 28%, oklch(0.42 0.17 18) 0%, oklch(0.26 0.09 14) 55%, oklch(0.18 0.05 14) 100%)",
                }}
              >
                {/* Concentric vinyl grooves */}
                <div
                  aria-hidden="true"
                  className="absolute inset-3 rounded-full border border-accent/20"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-7 rounded-full border border-accent/15"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-11 rounded-full border border-accent/10"
                />

                {/* Rotating gilded rose motif */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    isPlaying && "animate-[spin_18s_linear_infinite]",
                  )}
                >
                  <Ornament
                    variant="flourish"
                    size={64}
                    className="text-accent/70"
                  />
                </div>

                {/* Center spindle */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-background/80">
                  <Ornament
                    variant="heart"
                    size={22}
                    className={cn(
                      "text-accent",
                      isPlaying && "animate-heart-beat",
                    )}
                  />
                </div>
              </div>
            </div>

            {/* ── Track details + controls ─────────────────────────────── */}
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="label-eyebrow text-accent/80">Our Song</p>
              <h3 className="mt-3 truncate font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {content.song.title}
              </h3>
              <p className="mt-1 truncate font-body text-sm text-muted-foreground sm:text-base">
                {content.song.artist}
              </p>

              {/* ── Equalizer visualization ─────────────────────────────── */}
              <div
                data-ocid="song.visualizer"
                aria-hidden="true"
                className="mt-6 flex h-12 items-end justify-center gap-[3px] sm:justify-start"
              >
                {BARS.map((bar) => (
                  <span
                    key={bar.id}
                    className={cn(
                      "w-[3px] origin-bottom rounded-full bg-gradient-gold transition-transform duration-500 ease-out",
                      isPlaying &&
                        "animate-[equalize_var(--dur)_ease-in-out_infinite]",
                    )}
                    style={
                      {
                        height: "100%",
                        "--dur": `${bar.duration}s`,
                        animationDelay: `${bar.delay}s`,
                        transform: isPlaying
                          ? undefined
                          : `scaleY(${bar.minScale.toFixed(2)})`,
                        opacity: isPlaying ? 1 : 0.45,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>

              {/* ── Progress / seek bar ─────────────────────────────────── */}
              <div className="mt-6">
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-gold transition-[width] duration-200 ease-linear"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={hasAudio && duration > 0 ? duration : 100}
                  step={0.1}
                  value={hasAudio && duration > 0 ? currentTime : 0}
                  onChange={handleSeek}
                  disabled={!hasAudio || duration <= 0}
                  aria-label="Seek through the song"
                  data-ocid="song.seek_input"
                  className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-[oklch(0.78_0.13_84)] disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="mt-1 flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>{formatTime(hasAudio ? currentTime : 0)}</span>
                  <span>{formatTime(hasAudio ? duration : 0)}</span>
                </div>
              </div>

              {/* ── Play / pause + status ───────────────────────────────── */}
              <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause the song" : "Play the song"}
                  aria-pressed={isPlaying}
                  data-ocid="song.play_button"
                  className="group inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-smooth hover:-translate-y-0.5 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Play className="ml-0.5 h-6 w-6" aria-hidden="true" />
                  )}
                </button>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Volume2
                    className="h-4 w-4 text-accent/70"
                    aria-hidden="true"
                  />
                  <output data-ocid="song.status" className="font-body text-sm">
                    {statusLabel}
                  </output>
                </div>
              </div>
            </div>
          </div>

          {/* ── Placeholder / error note ──────────────────────────────── */}
          {!hasAudio ? (
            <div
              data-ocid="song.empty_state"
              className="mt-8 flex items-start gap-3 rounded-2xl border border-accent/25 bg-background/40 px-5 py-4"
            >
              <Ornament
                variant="sprig"
                size={22}
                className="mt-0.5 shrink-0 text-accent/80"
              />
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                No audio source is set yet. Add a legally obtained audio file or
                an authorized link to{" "}
                <span className="font-mono text-xs text-accent/90">
                  content.song.src
                </span>{" "}
                in the content config, and this player will come to life.
              </p>
            </div>
          ) : null}

          {hasError ? (
            <p
              data-ocid="song.error_state"
              className="mt-6 text-center font-body text-sm text-destructive sm:text-left"
            >
              We couldn&apos;t load that audio source. Please check the link or
              file path in the content config.
            </p>
          ) : null}
        </div>

        {/* Closing ornament */}
        <div className="mt-10 flex items-center justify-center gap-3 text-accent/60">
          <span className="h-px w-10 bg-gradient-gold" />
          <Ornament variant="heart" size={18} />
          <span className="h-px w-10 bg-gradient-gold" />
        </div>
      </div>

      {/* Real audio element — only mounted when a source is configured. */}
      {hasAudio ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime)
          }
          onLoadedMetadata={(event) =>
            setDuration(event.currentTarget.duration)
          }
          onError={() => setHasError(true)}
        >
          {/* Instrumental track — no spoken dialogue, so no captions are needed. */}
          <track kind="captions" />
        </audio>
      ) : null}
    </section>
  );
}
