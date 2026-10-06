# Design Brief

## Direction

A Letter Sealed in Wax — a candlelit, editorial keepsake that reads like fine stationery, not a landing page.

## Tone

Luxury/refined executed with conviction: dark and intimate, warm and sincere, classy and modern — never childish or cluttered.

## Differentiation

A single continuous letter experience: gilded hairline ornaments, drifting rose petals, and a cream letter card floating on burgundy-black, so the page feels like an heirloom card opened by candlelight.

## Color Palette

| Token      | OKLCH        | Role                                    |
| ---------- | ------------ | --------------------------------------- |
| background | 0.16 0.045 15 | Deep burgundy-black canvas             |
| foreground | 0.94 0.028 82 | Warm cream ink                         |
| card       | 0.21 0.055 14 | Letter / content surface               |
| primary    | 0.42 0.17 18  | Deep crimson — CTAs, seals             |
| accent     | 0.78 0.13 84  | Gilded gold — ornaments, dividers, glow |
| muted      | 0.27 0.05 13  | Rose-tinted recessed surfaces          |

## Typography

- Display: Fraunces — hero headline, section headings, letter salutation (high-contrast romantic serif).
- Body: General Sans — paragraphs, letter body, UI labels (clean, highly readable).
- Mono: Geist Mono — small uppercase eyebrows, dates, section numbers.
- Scale: hero `text-4xl sm:text-6xl md:text-7xl tracking-tight`, h2 `text-3xl md:text-4xl`, label `label-eyebrow`, body `text-base md:text-lg leading-relaxed`.

## Elevation & Depth

Layered darkness: recessed burgundy canvas, raised `bg-card` letter surface with `shadow-soft`, gold `shadow-glow` reserved for accents; depth from vignette, grain, and soft blurred petal layers — never flat.

## Structural Zones

| Zone    | Background              | Border             | Notes                                             |
| ------- | ----------------------- | ------------------ | ------------------------------------------------- |
| Header  | `bg-background/80` blur | `border-b border-border` | Sticky, minimal; gold hairline on scroll     |
| Hero    | `bg-background` + vignette | —              | Centered eyebrow + serif headline + gold divider  |
| Letter  | `bg-card` card          | `border border-accent/40` | Cream letter card, generous padding, soft shadow |
| Gallery | `bg-muted/30` section   | —                  | Gold-framed photo placeholders, small-caps captions |
| Footer  | `bg-secondary/40`       | `border-t border-accent/30` | Gold heart mark + one sincere line        |

## Spacing & Rhythm

Generous and uncrowded: `py-20 md:py-28` section gaps, `max-w-3xl` reading column, `gap-6 md:gap-10` card grids, micro-spacing in 4/8/12/16 steps.

## Component Patterns

- Buttons: soft-rounded (`rounded-full`), gold or crimson fill, gold hairline border, hover lifts + `shadow-glow`.
- Cards: `rounded-lg` with 1px gold-tinted border, `bg-card`, `shadow-soft`; letter card uses larger padding.
- Badges: pill, `bg-secondary` with gold text, `label-eyebrow` mono uppercase.
- Dividers: centered hairline with a small gold diamond/leaf flourish.

## Motion

- Entrance: `animate-fade-in` on scroll-revealed sections, 0.9s cubic-bezier, staggered by ~120ms.
- Hover: `transition-smooth` (0.4s) lift + gold glow on interactive surfaces.
- Decorative: `petal-fall` drifting petals, `glow-pulse` on gold accents, `float-soft` on ornaments, `heart-beat` on the heart mark.

## Constraints

- Dark mode only — the candlelit mood is the design; no light theme.
- Tokens only: no raw hex/rgb, no arbitrary color classes; colors via semantic tokens.
- Respect `doNotBuild`: no countdown/days counter, no guestbook/message wall — no reserved zones for them.
- No copyrighted images or fake couple photos; placeholders only, swappable from one config section.
- Body text stays ≥4.5:1 contrast; keep layout uncrowded on mobile.

## Signature Detail

The gilded ornamental divider — a thin gold hairline with a small leaf/diamond flourish — repeated as the recurring motif between every section, turning the page into one continuous sealed letter.
