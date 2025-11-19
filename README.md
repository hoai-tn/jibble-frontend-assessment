# 🎬 Jibble Technical Assessment - Movie Search Application

A modern, production-ready Vue 3 movie search application built with TypeScript, Vuetify, and TanStack Query.

**🔗 Live Demo:** [https://jibble-frontend-developer-assessmen.vercel.app/](https://jibble-frontend-developer-assessmen.vercel.app/)

## 🛠 Tech Stack

- **[Vue 3](https://vuejs.org/)** - Composition API with `<script setup>`
- **[TypeScript](https://www.typescriptlang.org/)** - Strict type safety
- **[Vuetify](https://vuetifyjs.com/)** - Material Design components
- **[TanStack Query](https://tanstack.com/query)** - Server state management with smart caching
- **[Vite](https://vitejs.dev/)** - Fast build tool
- **[Axios](https://axios-http.com/)** - HTTP client

## 🏗 Architecture

This project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** for scalable architecture.

```
src/
├── features/movies/        # 🎯 Isolated movie feature
│   ├── components/         # Smart components
│   ├── composables/        # Business logic (useMoviesQuery)
│   ├── services/           # API calls (moviesService)
│   └── index.ts            # Public API
├── components/ui/          # Reusable UI wrappers
├── composables/            # Global utilities (useDebounce)
├── pages/                  # Route pages (orchestration)
└── services/               # Global API client
```

### Key Concepts

- **Feature Isolation**: Each `features/` module is self-contained with components, logic, and services
- **URL as State**: Page and search params live in URL for shareability
- **Smart Caching**: TanStack Query caches data and uses `keepPreviousData` to prevent flashing
- **Separation of Concerns**: UI components are stateless, feature components connect to business logic

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```
---
### Thank you for your time and consideration! 
