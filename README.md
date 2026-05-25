# bravo-proect

Vue 3 + Vite project configured for Cloudflare Pages and Docker.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Responsive And Browser Support

Every UI change must stay usable on mobile and desktop. Before pushing layout or content changes, check these widths:

```txt
360px, 390px, 430px, 768px, 1024px, 1366px, 1440px+
```

Required behavior:

- Important content, forms, buttons, navigation targets, and calls to action must remain visible at every width.
- Cards and grids must collapse before text or media overflows horizontally.
- Mobile screens must keep touch targets at least 44px high and avoid bottom CTA overlap.
- New sections must work in current Chromium, Firefox, Safari, and mobile browsers.
- If a desktop block is changed, its mobile layout must be adjusted in the same change.

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

Build output directory:

```sh
dist
```

## Cloudflare Pages

Use these settings:

```txt
Framework preset: Vue
Build command: npm run build
Build output directory: dist
Node version: 22.16.0
```

The repository also contains `wrangler.toml`, `.nvmrc`, and `.node-version` so Cloudflare can use the expected build output and Node version.

## Netlify

Use these settings:

```txt
Build command: npm run build
Publish directory: dist
Node version: 22.16.0
Production branch: main
```

The repository also contains `netlify.toml`, so Netlify can apply these settings automatically when it builds from Git.

## Docker

Build and run the production container:

```sh
docker compose up --build
```

Open:

```txt
http://localhost:5173
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
