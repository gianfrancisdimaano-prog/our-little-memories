import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { content } from "@/content";

/**
 * Cover for the personalized monthsary content change.
 *
 * These assertions are deliberately written against the *accepted* letter,
 * photo, and song values rather than against `content` itself, so a regression
 * that swaps the letter back to a placeholder, drops a photo, or loses the
 * audio source fails here instead of passing self-referentially.
 *
 * Component/integration coverage only: no deployed browser, no real audio
 * playback, no backend. See the coverage limits reported with the run.
 */

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

describe("Letter content", () => {
  it("renders the accepted opening and closing lines verbatim", () => {
    render(<App />);

    const card = screen.getByTestId("letter.card");
    const rendered = card.textContent ?? "";

    expect(rendered).toContain("Dear to my bb labs in the whole world,");
    expect(rendered).toContain("From your chef, bb, and makulit na bf,");
    expect(rendered).toContain("Gian");
  });

  it("preserves every paragraph break and emoji from the accepted letter", () => {
    render(<App />);

    const card = screen.getByTestId("letter.card");
    const rendered = card.textContent ?? "";

    // The accepted letter is multi-paragraph; a single flattened blob would
    // lose the paragraph structure the requirement calls out.
    const paragraphs = content.letter.split(/\n\s*\n/);
    expect(paragraphs.length).toBeGreaterThan(5);
    for (const paragraph of paragraphs) {
      expect(rendered).toContain(paragraph.replace(/\*\*/g, ""));
    }

    // Emoji are part of the verbatim text and must survive rendering.
    expect(rendered).toContain("❤️");
    expect(rendered).toContain("😭");
  });

  it("keeps the required phrases bold rather than plain text", () => {
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

describe("Album content", () => {
  it("shows exactly four photo cards, each with a caption and alt text", () => {
    render(<App />);

    const section = document.getElementById("album") as HTMLElement;
    const cards = within(section).getAllByTestId(/^album\.item\./);
    expect(cards).toHaveLength(4);

    for (const card of cards) {
      const image = within(card).getByRole("img");
      expect(image).toHaveAttribute("alt");
      expect((image.getAttribute("alt") ?? "").trim().length).toBeGreaterThan(
        0,
      );
      expect((image.getAttribute("src") ?? "").trim().length).toBeGreaterThan(
        0,
      );
    }
  });

  it("leaves no placeholder frame in the album", () => {
    render(<App />);

    const section = document.getElementById("album") as HTMLElement;
    const images = Array.from(section.querySelectorAll("img"));
    expect(images).toHaveLength(4);
    for (const image of images) {
      expect(image.getAttribute("src") ?? "").not.toMatch(/placeholder/i);
    }
    expect(section.querySelector('[data-ocid="album.empty_state"]')).toBeNull();
  });

  it("opens the lightbox for each photo with that photo's caption", async () => {
    const user = userEvent.setup();
    render(<App />);

    for (const [index, photo] of content.photos.entries()) {
      await user.click(screen.getByTestId(`album.item.${index + 1}`));

      const dialog = await screen.findByTestId("album.dialog");
      if (photo.caption) {
        expect(within(dialog).getByText(photo.caption)).toBeInTheDocument();
      }
      const dialogImage = within(dialog).getByRole("img");
      expect(dialogImage).toHaveAttribute("src", photo.src);

      await user.click(within(dialog).getByTestId("album.close_button"));
      expect(screen.queryByTestId("album.dialog")).not.toBeInTheDocument();
    }
  });
});

describe("Song content", () => {
  it("shows the accepted title and artist and a real audio source", () => {
    render(<App />);

    expect(screen.getByText("Janice")).toBeInTheDocument();
    expect(screen.getByText("Dilaw")).toBeInTheDocument();

    const audio = document.querySelector("audio");
    expect(audio).not.toBeNull();
    expect(audio?.getAttribute("src")).toBe("/assets/audio/janice-dilaw.mp3");
    expect(screen.queryByTestId("song.empty_state")).not.toBeInTheDocument();
  });

  it("toggles playback state through the play button", async () => {
    const user = userEvent.setup();
    render(<App />);

    const playButton = screen.getByTestId("song.play_button");
    expect(playButton).toHaveAttribute("aria-pressed", "false");

    await user.click(playButton);
    expect(playButton).toHaveAttribute("aria-pressed", "true");

    await user.click(playButton);
    expect(playButton).toHaveAttribute("aria-pressed", "false");
  });

  it("seeks through the song by updating the audio element's currentTime", async () => {
    render(<App />);

    const audio = document.querySelector("audio") as HTMLAudioElement;
    // jsdom does not load media metadata; give the element a duration so the
    // seek control is enabled and the handler writes through to the element.
    Object.defineProperty(audio, "duration", {
      configurable: true,
      value: 180,
    });
    audio.dispatchEvent(new Event("loadedmetadata"));

    const seek = (await screen.findByTestId(
      "song.seek_input",
    )) as HTMLInputElement;
    expect(seek).not.toBeDisabled();

    // React tracks a controlled input's value internally, so assigning
    // `seek.value` directly is swallowed. Go through the native value setter
    // and fire the input event React listens for, then assert the observable
    // write-through onto the audio element.
    const nativeValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set;
    nativeValueSetter?.call(seek, "90");
    seek.dispatchEvent(new Event("input", { bubbles: true }));

    expect(audio.currentTime).toBe(90);
  });
});

describe("Core journey", () => {
  it("walks hero → letter → album → song → finale without a blank screen", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Hero is the default route's first paint.
    expect(
      screen.getByRole("heading", { level: 1, name: content.heroHeadline }),
    ).toBeInTheDocument();

    // Letter button scrolls to the letter section.
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    await user.click(screen.getByRole("button", { name: /open my letter/i }));
    expect(scrollIntoView).toHaveBeenCalled();

    // Album lightbox opens and closes.
    await user.click(screen.getByTestId("album.item.1"));
    expect(await screen.findByTestId("album.dialog")).toBeInTheDocument();
    await user.click(screen.getByTestId("album.close_button"));
    expect(screen.queryByTestId("album.dialog")).not.toBeInTheDocument();

    // Song plays.
    await user.click(screen.getByTestId("song.play_button"));
    expect(screen.getByTestId("song.play_button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    // Finale releases a petal burst.
    const before = document.querySelectorAll(".animate-petal-fall").length;
    await user.click(screen.getByRole("button", { name: /i love you/i }));
    expect(
      document.querySelectorAll(".animate-petal-fall").length,
    ).toBeGreaterThan(before);
  });

  it("renders the full journey at a mobile viewport width", () => {
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 390,
    });
    try {
      render(<App />);

      for (const id of ["hero", "letter", "album", "song", "story", "finale"]) {
        expect(document.getElementById(id)).toBeInTheDocument();
      }
      expect(
        within(document.getElementById("album") as HTMLElement).getAllByTestId(
          /^album\.item\./,
        ),
      ).toHaveLength(4);
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalWidth,
      });
    }
  });
});
