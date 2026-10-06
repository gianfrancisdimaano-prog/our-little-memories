import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { content } from "@/content";

/**
 * Component/integration coverage for the monthsary single-page site.
 *
 * These tests render the real section components with the real content config.
 * They do not exercise a deployed browser, a real backend, or real audio
 * playback — see the coverage limits reported with the run.
 */

/** jsdom does not implement scrollIntoView; capture the calls instead. */
function installScrollSpy() {
  const scrollIntoView = vi.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  return scrollIntoView;
}

/** jsdom does not implement matchMedia; default to "no reduced motion". */
function installMatchMedia(matches = false) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  installMatchMedia(false);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App shell", () => {
  it("renders every section without a blank screen", () => {
    render(<App />);

    for (const id of ["hero", "letter", "album", "song", "story", "finale"]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });
});

describe("Hero", () => {
  it("shows the headline, subtitle, and letter button", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: content.heroHeadline,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(content.heroSubtitle)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /open my letter/i }),
    ).toBeInTheDocument();
  });

  it("scrolls to the letter section when the letter button is clicked", async () => {
    const scrollIntoView = installScrollSpy();
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /open my letter/i }));

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    const target = scrollIntoView.mock.instances[0] as unknown as HTMLElement;
    expect(target.id).toBe("letter");
  });
});

describe("Letter", () => {
  it("renders the full letter verbatim and unedited", () => {
    render(<App />);

    const card = screen.getByTestId("letter.card");
    const rendered = card.textContent ?? "";

    // Every paragraph of the configured letter must appear exactly. The only
    // transformation applied at render time is stripping the **bold** markers,
    // so compare against the marker-free text.
    for (const paragraph of content.letter.split(/\n\s*\n/)) {
      expect(rendered).toContain(paragraph.replace(/\*\*/g, ""));
    }
    expect(rendered).toContain(content.letterSignature);
  });

  it("renders the bold emphasis phrases as strong text", () => {
    render(<App />);

    const card = screen.getByTestId("letter.card");
    const strongText = Array.from(card.querySelectorAll("strong"))
      .map((node) => node.textContent ?? "")
      .join(" | ");

    for (const phrase of [
      "1st monthsary",
      "June 25",
      "September 8",
      "Life without you is like a song without a melody",
      "FAITH in us",
    ]) {
      expect(strongText).toContain(phrase);
    }
  });
});

describe("Album", () => {
  it("renders a photo card with caption for each configured photo", () => {
    render(<App />);

    const section = document.getElementById("album") as HTMLElement;
    for (const [index, photo] of content.photos.entries()) {
      const card = within(section).getByTestId(`album.item.${index + 1}`);
      expect(card).toBeInTheDocument();
      if (photo.caption) {
        expect(within(card).getByText(photo.caption)).toBeInTheDocument();
      }
    }
  });

  it("opens a lightbox with the photo caption when a card is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const first = content.photos[0];
    await user.click(screen.getByTestId("album.item.1"));

    const dialog = await screen.findByTestId("album.dialog");
    expect(dialog).toBeInTheDocument();
    if (first.caption) {
      expect(within(dialog).getByText(first.caption)).toBeInTheDocument();
    }
  });
});

describe("Song", () => {
  it("shows the configured title and artist", () => {
    render(<App />);

    expect(screen.getByText(content.song.title)).toBeInTheDocument();
    expect(screen.getByText(content.song.artist)).toBeInTheDocument();
  });

  it("toggles play/pause and the visualization state", async () => {
    const user = userEvent.setup();
    render(<App />);

    const playButton = screen.getByTestId("song.play_button");
    expect(playButton).toHaveAttribute("aria-pressed", "false");

    await user.click(playButton);
    expect(playButton).toHaveAttribute("aria-pressed", "true");

    await user.click(playButton);
    expect(playButton).toHaveAttribute("aria-pressed", "false");
  });

  it("animates the equalizer bars only while playing", async () => {
    const user = userEvent.setup();
    render(<App />);

    const visualizer = screen.getByTestId("song.visualizer");
    const bars = visualizer.querySelectorAll("span");
    expect(bars.length).toBeGreaterThan(0);

    // Idle: no bar carries the equalize animation.
    const animatedWhenIdle = visualizer.querySelectorAll(
      '[class*="equalize"]',
    ).length;
    expect(animatedWhenIdle).toBe(0);

    await user.click(screen.getByTestId("song.play_button"));

    const animatedWhenPlaying = visualizer.querySelectorAll(
      '[class*="equalize"]',
    ).length;
    expect(animatedWhenPlaying).toBe(bars.length);
  });

  it("never displays full song lyrics", () => {
    render(<App />);

    const body = document.body.textContent ?? "";
    // The configured song has no lyrics field; guard against lyric-like blocks.
    expect(body).not.toMatch(/\[verse|\[chorus|\[bridge/i);
  });
});

describe("Story", () => {
  it("renders all five memory cards with their titles and bodies", () => {
    render(<App />);

    for (const [index, card] of content.storyCards.entries()) {
      const node = screen.getByTestId(`story.card.${index + 1}`);
      expect(within(node).getByText(card.title)).toBeInTheDocument();
      expect(within(node).getByText(card.body)).toBeInTheDocument();
    }
  });
});

describe("PetalOverlay", () => {
  it("drifts floating petals that never intercept pointer events", () => {
    render(<App />);

    const petals = document.querySelectorAll(".animate-petal-fall");
    expect(petals.length).toBeGreaterThan(0);

    // The overlay is decorative and must not obstruct the content beneath it.
    const overlay = petals[0].closest(".pointer-events-none");
    expect(overlay).not.toBeNull();
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Finale", () => {
  it("shows the closing message and the love button", () => {
    render(<App />);

    expect(screen.getByText(content.closingMessage)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /i love you/i }),
    ).toBeInTheDocument();
  });

  it("releases a petal burst when the love button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const before = document.querySelectorAll(".animate-petal-fall").length;
    await user.click(screen.getByRole("button", { name: /i love you/i }));
    const after = document.querySelectorAll(".animate-petal-fall").length;

    expect(after).toBeGreaterThan(before);
  });
});
