# Project Guidance

## User Preferences

- Colors: deep red, burgundy, gold, soft cream
- Elegant serif headings with a clean readable body font
- Classy and modern, organized and not crowded
- The personal letter must be displayed exactly as provided, never rewritten
- No copyrighted images or music; never display full song lyrics
- Keep letter, photos, captions, and music source easy to replace from one centralized config section

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Tailwind 3 opacity utilities (border-gold/35, text-cream/85) emit no CSS unless the color is registered in theme.extend.colors as oklch(var(--x) / <alpha-value>).
- Motoko has no triple-quoted strings; a multi-line text literal uses a single " delimiter, and a doc mixin must be a bare top-level `mixin () { ... };` block.
- Biome noSvgWithoutTitle requires aria-hidden written explicitly on each <svg>, not passed via a spread object.
- All personal content for this app lives in src/frontend/src/content.ts; edit that one file to change the letter, photos, captions, song source, or card texts.
- Frontend test suite: Vitest + React Testing Library under src/frontend/src/__tests__; run `pnpm --dir app test`.
- Frontend test suite: Vitest + React Testing Library under src/frontend/src/__tests__; backend PocketIC lane under test/pocketic; run `pnpm --dir app test`.
- The letter supports **bold** markers rendered inline by Letter.tsx; all other text passes through verbatim, so content.ts stays the single source of truth.
- When content.song.src is set, the real <audio> element mounts; jsdom's audio.play() returns undefined, so guard the promise and drive play/pause from UI state rather than audio.paused.
- Uploaded attachments are copied into src/frontend/public/assets/ with `install -m 644` (plain `cp` is blocked by the workspace permission rules).
