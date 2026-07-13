# Zal0op Engineering — Design Foundation

## Active direction

Light specification sheet. The background is warm off-white, not white. Acid green is the only accent.

## Tokens

| Role | Value |
| --- | --- |
| Background | `#F2F0E9` |
| Surface | `#FAF9F5` |
| Text | `#111111` |
| Muted | `#6E6C65` |
| Border | `#CBC8BE` |
| Accent | `#C7FF00` |
| Keyboard focus | `#2F6BFF` |

## Typography

- Display and body: Archivo Variable.
- Technical labels and controls: IBM Plex Mono.
- Display headings use tight tracking and `clamp()` scaling.
- Control typography is explicitly set; browser defaults are not used.

## Layout

- Maximum canvas: `1536px`.
- Desktop: 12 columns, 24px internal gutters.
- Mobile: one content column with a 20px page gutter.
- Sections are open bands separated by 1px rules. No rounded containers or shadows.

## Components

- Buttons: square, 1px border, 52px minimum height.
- Primary button: acid fill and black text.
- Metadata: uppercase mono label/value pairs.
- Process flow: open six-column rail; mobile collapses into a vertical sequence.
- Wordmark: code-native `ZAL0OP` with a slashed zero.
- Icons: one custom square-stroke menu SVG and repeated square-stroke flow arrows.

## Motion

- Hero stagger: 700ms per item, 90ms delay steps, cubic-bezier `(0.22, 1, 0.36, 1)`.
- Process scan: 10s linear loop.
- Hover transitions: 150–320ms.
- Reduced motion removes entrance offsets and all non-essential looping motion.

## Breakpoints

- `1100px`: desktop navigation changes to a menu.
- `768px`: hero, metadata, flow, and editorial section collapse vertically.
- Minimum supported viewport: `360px`.

## Phase 1 copy lock

Visible above-fold copy is limited to the approved header, hero, metadata, CTAs and process labels. The mobile-only `MENU` control is an intentional functional addition required by the brief.

## Accepted reference

`/Users/maksimsurmach/.codex/generated_images/019f5d3b-bee3-7630-9843-6747d8277856/exec-e4cd538b-e02d-4191-ab41-e9dfcfad8cd4.png`

