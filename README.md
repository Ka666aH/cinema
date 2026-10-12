# Cinema

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D.svg?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-FFD85E.svg?logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev/)

[Читать на русском](README.ru.md)

Movie collection SPA: track movies you plan to watch, mark them as watched, give them a rating. Search Star Wars titles via [SWAPI](https://swapi.dev) and add them straight to your collection. All data lives in the browser (localStorage) — no backend, no accounts.

![Movie list](docs/movies.png)

## Stack

- **Vue 3** — Composition API, `<script setup>` single-file components
- **TypeScript** — typed models, store and composables
- **Pinia** — application state with persistence to localStorage
- **Vue Router** — lazy-loaded pages: movie list, movie details, search
- **Vite** — dev server and production build
- **SWAPI** — movie data for the search page

## Getting started

Node 22+ required.

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
```
