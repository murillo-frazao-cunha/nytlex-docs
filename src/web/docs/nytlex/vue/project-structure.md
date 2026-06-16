# Project Structure - Vue

Understanding how Nytlex.js organizes your files is essential for building clean, efficient, and scalable applications.

This guide explains the folder structure, special files, and conventions used throughout the framework.

---

## Overview

A Vue Nytlex.js project follows this structure:

```
my-project/
├── src/
│   ├── web/
│   │   ├── layout.vue
│   │   ├── notFound.vue
│   │   ├── globals.css
│   │   ├── page.vue
│   │   ├── about/
│   │   │   └── page.vue
│   │   ├── blog/
│   │   │   ├── page.vue
│   │   │   └── [id]/
│   │   │       └── page.vue
│   │   └── components/
│   │       └── Header.vue
│   ├── backend/
│   │   └── routes/
│   │       ├── auth.ts
│   │       ├── users.ts
│   │       └── api.ts
│   └── nytlex.ts
├── public/
│   ├── favicon.ico
│   └── images/
├── nytlex.config.ts
├── tsconfig.json
└── package.json
```

---

## Root Directories

### `/src`

The main source directory where all application logic lives, including frontend, backend, and startup logic. You can use `.ts`, `.js`, or `.vue` files for your code.

### `/public`

Static assets served directly by the server. Files inside this folder are accessible from the root URL.

Examples:

- `public/logo.png` → `http://localhost:3000/logo.png`
- `public/images/hero.jpg` → `http://localhost:3000/images/hero.jpg`

---

## Web Directory (Frontend)

The `/src/web` directory contains all frontend-related code.

### Routing System (File-Based)

Nytlex uses a **file-based routing system** similar to Next.js.

Routes are automatically generated based on file structure:

- `/src/web/page.vue` → `/`
- `/src/web/about/page.vue` → `/about`
- `/src/web/blog/page.vue` → `/blog`
- `/src/web/blog/[id]/page.vue` → `/blog/:id`

No manual route configuration is required for the frontend. The framework resolves routes automatically from the filesystem.

---

### `/src/web/layout.vue`

The root layout that wraps every page in your application.

Used for:

- Global metadata (title, description, SEO)
- Shared UI (header, footer, sidebar)
- Providers, themes, and global contexts
- Global styles

Key points:

- Receives `children`
- Can export a `metadata` object
- Wraps all pages automatically

---

### `/src/web/notFound.vue`

Custom 404 page rendered when no route matches.

Triggered when:

- User navigates to an invalid URL
- Example: `/random-page-that-does-not-exist`

Fully customizable UI.

---

### `/src/web/globals.css`

Global CSS loaded across the entire app.

Usually includes:

- resets
- typography
- CSS variables
- base styling

Imported inside `layout.vue`.

---

## Backend Directory

The `/src/backend` directory contains all server-side logic.

Unlike the frontend, the backend is **not file-based automatic routing**.

Everything is **explicitly configured using `BackendRouteConfig`**.

---

### `/src/backend/routes`

This directory contains backend route modules.

Even though files are grouped by domain (auth, users, api, etc.), **routing is still manually defined**.

Each file exports one or more **`BackendRouteConfig`** objects.

Example:

```ts
export const loginRoute: BackendRouteConfig = {
  path: "/auth/login",
  method: "POST",
  handler: async (req) => {
    return { ok: true }
  }
}
```

---

### Backend Routing Model

Key rules:

- Routes are NOT auto-generated
- Each route must define a `path`
- Each route must explicitly define:
    - HTTP method(s)
    - handler function
    - optional metadata (auth, middleware, validation, etc.)

Example paths:

- `/auth/login`
- `/auth/register`
- `/users/:id`
- `/admin/stats`

The file structure is only organizational — the real routing comes from the exported configs.

---

### BackendRouteConfig

The core of backend routing.

Defines a single route:

- `path`: route URL
- `method`: HTTP or WS method
- `handler`: execution logic
- `meta` (optional): middleware, auth rules, validation, etc.

This keeps backend behavior fully explicit and predictable.

---

## Server-Only Imports

### `importServer()`

Utility for safely importing server-only code.

Rules:

- Only usable inside `/src/backend`
- Never allowed in `/src/web`
- Never bundled to the client

Use cases:

- Database access
- Authentication
- Secrets / environment variables
- Heavy server-only dependencies

Ensures strict backend/frontend isolation.

---

## Instrumentation File

### `/src/nytlex.ts`

Runs once when the application starts.

Used for:

- database initialization
- global middleware setup
- logging configuration
- background jobs
- environment boot logic

Rules:

- Must export a default function
- Can be async
- Runs before routes are registered
- Executes in dev and production

---

## Configuration Files

### `nytlex.config.ts`

Main framework configuration file.

Used for:

- server behavior
- plugins and middleware
- runtime settings
- build configuration

---

### `tsconfig.json`

TypeScript configuration.

Required:

```json
{
  "compilerOptions": {
    "types": ["nytlex/global"]
  }
}
```

---

### `package.json`

Project metadata and scripts.

Example:

```json
{
  "scripts": {
    "dev": "nytlex dev",
    "start": "nytlex start"
  }
}
```

- `dev`: development server with hot reload
- `start`: production server
