# Cinema

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D.svg?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-FFD85E.svg?logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev/)

[Read in English](README.md)

SPA-коллекция фильмов: отмечай, что планируешь посмотреть, ставь статус «просмотрено», выставляй рейтинг. Ищи фильмы «Звёздных войн» через [SWAPI](https://swapi.dev) и добавляй их в коллекцию. Все данные хранятся в браузере (localStorage) — без бэкенда и аккаунтов.

![Список фильмов](docs/movies.png)

## Стек

- **Vue 3** — Composition API, компоненты в формате `<script setup>`
- **TypeScript** — типизированные модели, стор и композаблы
- **Pinia** — состояние приложения с сохранением в localStorage
- **Vue Router** — страницы с ленивой загрузкой: список, карточка фильма, поиск
- **Vite** — dev-сервер и продакшен-сборка
- **SWAPI** — данные о фильмах для страницы поиска

## Запуск

Нужен Node 22+.

```bash
npm install
npm run dev      # dev-сервер с HMR
npm run build    # проверка типов + продакшен-сборка в dist/
npm run preview  # локальный просмотр продакшен-сборки
```
