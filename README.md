# Zal0op Engineering Framework

Static landing page for the Zal0op Engineering Framework. It explains a blocker-first operating model for delegated execution and adversarial review.

## Local development

Requirements: Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Routes:

- `/` — English default;
- `/en/` — stable English route;
- `/be/` — stable Belarusian route.

## Build and validation

```sh
npm run typecheck
npm run build
npm run validate:static
```

The validator checks every route, locale metadata and built asset reference.

## Project structure

- `index.html` — source document and English content;
- `src/content/` — locale dictionaries;
- `src/scripts/` — navigation, localization, animation and analytics modules;
- `src/styles/` — tokens, layout, components, sections and motion;
- `scripts/generate-locales.mjs` — creates the stable locale documents;
- `scripts/validate-static.mjs` — validates production output;
- `Dockerfile` and `nginx.conf` — non-root production container;
- `.github/workflows/ci.yml` — validation and GHCR publishing.

## Content and translations

Edit source copy in `index.html`. Add localized strings to `src/content/en.json` and `src/content/be.json`, then mark the source element with `data-i18n="key"`.

```sh
npm run generate:locales
```

Belarusian placeholders intentionally remain English and use visible `TODO_TRANSLATION_BE:*` markers. Russian fallback is not used. See `CONTENT_STATUS.md` for the current editorial status.

## Animation architecture

Motion is CSS-first and initialized by `src/scripts/animations.ts`. Intersection observers reveal sections once. The rotating hero text respects the active locale. `prefers-reduced-motion` disables non-essential movement.

## Analytics

Umami Cloud is optional. With no website ID, the site adds no analytics script and remains fully functional.

```sh
VITE_UMAMI_WEBSITE_ID=your-id
VITE_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
```

Tracked events cover language changes, navigation, both hero CTAs, the GitHub link and first views of the framework, blockability and maturity sections. Analytics is anonymous; no advertising or session recording is used.

For GitHub builds, configure repository secrets `UMAMI_WEBSITE_ID` and optionally `UMAMI_SCRIPT_URL`.

## Container

```sh
docker build -t zaloop-engineering .
docker run --rm -p 8080:8080 zaloop-engineering
curl http://localhost:8080/healthz
```

The image is built in two stages and served by Nginx as a non-root user on port 8080. HTML uses revalidation caching; hashed assets are immutable and compression is enabled.

## Deployment

Pushes to `main` publish multi-architecture images to `ghcr.io/maksimsurmach/zaloop-engineering` with immutable commit-SHA and `latest` tags. The Kubernetes deployment is managed through the `ranus-infra` Argo CD repository and pins the immutable SHA tag.

Production URL: `https://zal0op-engineering.website`.

Preview alias: `https://zaloop.ranus.site`.

To use another domain, update canonical and alternate URLs in `index.html`, the validator expectations in `scripts/validate-static.mjs`, and the Kubernetes Ingress hosts.

## Known TODOs

- Complete the editorial placeholders listed in `CONTENT_STATUS.md`.
- Complete Belarusian translations marked `TODO_TRANSLATION_BE:*`.
- Configure the Umami website ID and verify the first production event in its dashboard.
