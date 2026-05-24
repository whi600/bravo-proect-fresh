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
