# Antigravity Task Management SaaS Dashboard

A production-grade, highly scalable Task Management dashboard constructed using Vue 3, TypeScript (Strict Mode), Pinia, Vue Router, Tailwind CSS v4, and Vitest. This application is structured as a senior engineering technical assessment demonstrating modular design, clean separation of concerns, robust type safety, comprehensive unit testing, and keyboard-accessible UI primitives.

---

## 🚀 Key Features

- **Full Task CRUD**: Instantly create, inspect, edit, and delete task entities with visual state updates.
- **Debounced Title Search**: Throttled search queries (300ms) optimizing component redraws and preparing for scalability.
- **Combined Filter Columns**: Jointly filter tasks by status tabs (All, Pending, In Progress, Done) and search queries.
- **Programmatic Confirmations**: Clean Promise-based `useConfirm` composable managing delete dialog overlays without local boolean state pollution.
- **Toast Notifications Tray**: Reactive feedback notifications informing users about success/error states on REST API actions.
- **Task Details View**: Dynamic routing to `/tasks/:id` showcasing task metadata, creation/update logs, and loading/error states.
- **Mock REST API Layer**: Synthetic unstable API simulation implementing delays (800ms–1200ms) and random failure triggers (15% rate) with manual retry recovery in the UI.

---

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Build Engine**: [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict compiler flags active)
- **State Engine**: [Pinia](https://pinia.vuejs.org/)
- **Router**: [Vue Router 4](https://router.vuejs.org/)
- **Styles**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing Engine**: [Vitest](https://vitest.dev/) & [JSDOM](https://github.com/jsdom/jsdom)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Utility**: [Day.js](https://day.js.org/)
- **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

---

## 📐 Architecture & Design Decisions

### 1. Separation of Concerns & Service Abstraction
Components remain "dumb" and contain only template layouts and presentation states. All data queries and state mutations follow a strict hierarchy:
```
[ UI View Component ] ➔ [ Composables Interface ] ➔ [ Pinia Store Action ] ➔ [ Service Layer Adapter ] ➔ [ Axios API Client ]
```
- **Store (`src/stores`)**: Holds global state properties and actions. Declares derived computations as Pinia getters to prevent state duplication.
- **Services (`src/services`)**: Business workflow adapter wrapping backend request hooks and handling data translations.
- **API Client (`src/api`)**: Isolates Axios instances and interceptor configurations.

### 2. Programmatic Confirmations (`useConfirm`)
Replaces conventional template-defined conditional modal boolean flags. Page components call `const confirmed = await confirm({...})` which returns a Promise resolving to `true` or `false` depending on user action, keeping component files clean and readable.

### 3. Component Code Splitting & Performance
- Uses **Vite Lazy-Loaded Routes** to split pages.
- Uses `defineAsyncComponent` to load the `TaskForm` module only when a modal is opened.
- Implements `useDebounce` to throttle search filtering computations.

### 4. Accessibility (a11y)
- Standard HTML5 semantic section tags.
- Form items utilize unique randomly generated IDs linking labels to inputs.
- Input elements declare `:aria-invalid` and `:aria-describedby` pointing to validation errors and helper messages.
- Error text components employ `role="alert"`.
- Modals register `role="dialog"`, `aria-modal="true"`, and close on `Escape` keypress.
- Custom button elements utilize `focus-visible` to hide outline rings during mouse clicks but display them during keyboard navigation.

---

## 📂 Folder Structure

```text
src/
├── app/
│   ├── layouts/         # AppLayout containing responsive sidebars & toast overlays
│   └── router/          # Routing declarations with lazy dynamic imports
├── api/
│   ├── client.ts        # Axios base instance & request/response interceptors
│   └── task.api.ts      # Unstable mock REST database simulation (15% error rate)
├── services/
│   └── task.service.ts  # Task business services wrapping API calls
├── stores/
│   ├── tasks.ts         # Pinia tasks store state, getters & actions
│   └── tasks.spec.ts    # Store unit test coverage
├── pages/
│   ├── TasksPage.vue    # Dashboard view mapping list, filter & search controls
│   ├── TaskDetailsPage.vue # Detailed task inspector with spinners & retry controls
│   └── NotFoundPage.vue # Standalone 404 handler
├── components/
│   ├── ui/              # Stateless Generic UI elements (BaseButton, BaseInput, etc.)
│   └── task/            # Task-specific components (TaskList, TaskCard, etc.)
├── composables/
│   ├── useTasks.ts      # Store facade wrapper composable
│   ├── useDebounce.ts   # Generic value changes debouncer
│   ├── useConfirm.ts    # Programmatic dialog confirm helper
│   ├── useToast.ts      # Global shared reactive toast alerts
│   ├── useValidation.ts # Form validations
│   └── useValidation.spec.ts # Validation composable tests
├── types/
│   └── index.ts         # Strictly typed interfaces (Task, TaskStatus, ApiResponse)
├── constants/
│   └── index.ts         # Readonly routes, statuses, messages & endpoints
├── utils/
│   ├── date.ts          # Day.js date wrappers
│   ├── date.spec.ts     # Date utility test specs
│   ├── id.ts            # Unique ID generator
│   └── promise.ts       # Delay sleep utility
└── styles/
    └── main.css         # Tailwind v4 import & custom CSS tokens
```

---

## ⚙️ How to Run the Project

### Installation

Install packages using `pnpm`:
```bash
pnpm install
```

### Development

To start Vite's local development server:
```bash
pnpm dev
```

### Run Tests

Execute unit tests once using Vitest:
```bash
pnpm test:run
```
To run tests in watch mode:
```bash
pnpm test
```

### Production Build

Compile and bundle files for production release:
```bash
pnpm build
```
To locally preview the compiled production build:
```bash
pnpm preview
```

---

## 🔮 Future Improvements

- **Authentication Integration**: Secure dashboard routes using JWT tokens or OAuth hooks.
- **Real REST Backend**: Connect the `api/client.ts` endpoints to a live Node.js/Python server.
- **Theme Switcher**: Add a configuration toggle to switch between Light and Dark mode using Tailwind class selectors.
- **Drag-and-Drop Kanban Board**: Integrate interactive Kanban columns allowing drag-and-drop status migrations.
