# Zal0op Engineering — Phase 0 Design Directions

## Recommended: Light specification sheet

- Background: warm off-white `#F2F0E9`.
- Surface: `#FAF9F5` only where hierarchy requires it.
- Text: `#111111`; muted text: `#6E6C65`; rules: `#CBC8BE`.
- Accent: acid green `#C7FF00`, used as a signal fill with black text.
- Character: standards document, editorial manifesto, physical specification sheet.
- Typography: Archivo Variable for display/body; IBM Plex Mono for technical labels.
- Density: generous hero whitespace; denser technical bands below.

This direction best matches the requested serious methodology tone while preserving one distinctive visual signal.

## Alternative: Dark control room

- Background: graphite `#111111`; surface: `#181816`.
- Text: warm white `#F2F0E9`; muted text: `#9A988F`; rules: `#45443F`.
- Accent: warning red `#FF4A38`.
- Character: formal incident protocol, control-room runbook, adversarial review manual.
- Typography: same families and grid as the light direction.

This direction is stronger and more severe, but reads closer to developer tooling than a standards organization.

## Accent candidates

| Accent | Hex | Effect | Recommended use |
| --- | --- | --- | --- |
| Acid green | `#C7FF00` | Distinctive, technical, dryly absurd | Recommended for the light direction |
| Warning red | `#FF4A38` | Severe, confrontational, operational | Best for the dark direction or selected warnings |
| Electric blue | `#2F6BFF` | Corporate, credible, least comedic | Conservative alternative for the light direction |

Only one accent will be active. Color is used for signals, selected states, focus, and short rules—not decoration.

## Minimal stack

- Vite.
- Vanilla TypeScript.
- Semantic HTML rendered from shared content dictionaries.
- Plain CSS split into tokens, base, layout, components, and motion.
- Intersection Observer for reveal events; CSS keyframes for entrance, marquee, and flow motion.
- Multi-page static output for `/en/` and `/be/`; root renders or redirects to English without a language flash.
- Nginx Alpine production image.

## Assumptions

- Source repository will be a new public `MaksimSurmach/zaloop-engineering` repository unless approved otherwise.
- `zaloop.ranus.site` matches the live public TLS hostname convention.
- The GHCR package must be public, or the cluster needs an image-pull secret; public is the simpler default.
- Umami configuration and event code can be completed without credentials, but live analytics verification requires a Cloud website ID and dashboard access in Phase 4.
- English placeholder copy is authoritative for layout. Belarusian remains visibly marked as incomplete in Phase 3.
- Content-source markers remain visible but subordinate until final copy replaces them.
- No production repository, deployment, analytics, or infrastructure mutation occurs before its mandatory checkpoint.

## Concept preview paths

- Light: `/Users/maksimsurmach/.codex/generated_images/019f5d3b-bee3-7630-9843-6747d8277856/exec-e4cd538b-e02d-4191-ab41-e9dfcfad8cd4.png`
- Dark: `/Users/maksimsurmach/.codex/generated_images/019f5d3b-bee3-7630-9843-6747d8277856/exec-23ba8463-bc9e-47e1-bdea-f0b9fc48c7be.png`
