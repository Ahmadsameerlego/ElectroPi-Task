# Vue 3 Enterprise Architecture Foundation

A clean, scalable, production-ready frontend architecture boiler-plate built for a Senior Frontend Technical Assessment. This milestone establishes the architectural foundation, core design tokens, responsive layout, reusable UI primitives, router table configuration, Pinia store state schemas, and Axios API layer plumbing.

> [!NOTE]
> **Milestone 1 Scope**: This phase implements the foundation only. No task management logic, mock API servers, form scripts, validation rules, active store actions, or visual states are active.

---

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode enabled)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Utility**: [Day.js](https://day.js.org/)
- **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## Architecture Overview

This project uses a scalable, feature-oriented and layer-oriented structure designed to isolate concerns, support deep typing, and minimize coupling:

1. **Router (`src/app/router`)**: Lazy loaded routes matching system states with navigation/scroll helpers.
2. **Layout (`src/app/layouts`)**: Adaptive, grid-backed shells providing uniform page templates.
3. **API Client (`src/api`)**: Single-instance Axios engine configured with environment variables, custom timeouts, and centralized error hooks.
4. **Services (`src/services`)**: Business domain adapters decoupling UI views and network protocols.
5. **Stores (`src/stores`)**: Normalized global state engines defining state properties only.
6. **Components (`src/components`)**:
   - `ui/`: Stateless, generic design tokens and inputs (e.g. Buttons, Modals, Inputs, Cards).
   - `task/`: Lightweight feature stubs prepared for feature injections.
7. **Composables (`src/composables`)**: Encapsulated stateful operations.
8. **Types & Constants (`src/types`, `src/constants`)**: Strict schemas and readonly constants ensuring IDE autocomplete and compiler validation.

---

## Folder Structure

```text
src/
├── app/
│   ├── layouts/     # Reusable layout wrappers (e.g., AppLayout.vue)
│   ├── router/      # Lazy loaded routing config
│   └── providers/   # Global providers
├── api/
│   ├── client.ts    # Axios HTTP instance & interceptors
│   └── task.api.ts  # Task API interface declarations
├── services/
│   └── task.service.ts # Task business services throwing "Not implemented"
├── stores/
│   └── tasks.ts     # Pinia tasks store state schemas
├── pages/
│   ├── TasksPage.vue
│   ├── TaskDetailsPage.vue
│   └── NotFoundPage.vue
├── components/
│   ├── ui/          # Generic Base elements (BaseButton, BaseInput, etc.)
│   ├── task/        # Feature stubs (TaskList, TaskCard, etc.)
│   └── common/      # Common application-wide components
├── composables/     # useTasks, useValidation, useToast placeholders
├── types/           # Strong interface models (Task, TaskStatus, etc.)
├── constants/       # Readonly routes, statuses, endpoints, validations
├── utils/           # Date formatting, unique IDs, sleeps
├── assets/          # Static assets and graphics
└── styles/
    └── main.css     # Global styles & Tailwind v4 theme configurations
```

---

## Getting Started

### Installation

Ensure you have [pnpm](https://pnpm.io/) installed. Install dependencies by running:

```bash
pnpm install
```

### Development

To start the Vite development server:

```bash
pnpm dev
```

### Available Scripts

- `pnpm dev`: Starts the local hot-reloading development server.
- `pnpm build`: Performs type-checking (`vue-tsc`) and bundles files for production.
- `pnpm preview`: Locally previews the production build.

---

*Note: Business features, data persistence, and interactive user experiences will be introduced in subsequent milestones.*
