# Project Structure - React

Understanding how Nytlex.js organizes your files is essential for building clean, efficient, and scalable applications.

This guide explains the folder structure, special files, and conventions used throughout the framework.

---

## Overview

A typical Nytlex.js project follows this structure:

```
my-project/
├── src/
│   ├── web/
│   │   ├── layout.tsx
│   │   ├── notFound.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── components/
│   │       └── Header.tsx
│   ├── backend/
│   │   └── routes/
│   │       ├── auth.ts
│   │       ├── users.ts
│   │       └── admin.ts
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

The main source directory where all application logic lives, including frontend, backend, and startup logic. You can use `.ts`, `.tsx`, `.js`, or `.jsx` files for your code.

---

### `/public`

Static assets served directly by the server. Files inside this folder are accessible from the root URL.

Examples:

- `public/logo.png` → `http://localhost:3000/logo.png`
- `public/images/hero.jpg` → `http://localhost:3000/images/hero.jpg`

---

## Web Directory (Frontend)

The `/src/web` directory contains all frontend-related code.

### Routing System (File-Based)

Nytlex uses a **fully file-based routing system** for the frontend (similar to Next.js).

Routes are automatically generated from the filesystem:

- `/src/web/page.tsx` → `/`
- `/src/web/about/page.tsx` → `/about`
- `/src/web/blog/page.tsx` → `/blog`
- `/src/web/blog/[id]/page.tsx` → `/blog/:id`

No manual route configuration is required for frontend pages. The framework resolves everything automatically based on structure.

---

### `/src/web/layout.tsx`

The root layout that wraps every page in your application.

Used for:

- Global metadata (SEO, title, description)
- Shared UI (header, footer, shell)
- Providers (context, theme, state)
- Global styles

Key points:

- Receives `children`
- Can export a `metadata` object
- Wraps all pages automatically

---

### `/src/web/notFound.tsx`

Custom 404 page rendered when no route matches.

Triggered when:

- Invalid URL is accessed
- Example: `/this-page-does-not-exist`

Fully customizable UI and behavior.

---

### `/src/web/globals.css`

Global styles applied across the application.

Imported in `layout.tsx`, typically containing:

- CSS resets
- Typography rules
- Design tokens (colors, spacing)
- Base layout styles

---

## Backend Directory

The `/src/backend` directory contains all server-side logic.

### `/src/backend/routes` (Path-Based Routing)

Nytlex.js uses a **fully explicit path-based backend routing system**.

Key idea:

- Routes are defined by a **path string**
- No file-based routing on backend
- No `BackendRouteConfig`
- No automatic mapping from file → route
- Files are only organizational

---

### Routing Model

Backend routes are registered using explicit path definitions inside route files.

Examples of valid endpoints:

- `/auth/login`
- `/auth/register`
- `/users/:id`
- `/admin/stats`

Each route is registered internally by the framework using:

- `path`
- HTTP method (GET, POST, etc.)
- handler function
- optional metadata (middleware, auth, validation, etc.)

---

### Folder Organization (Optional)

```
src/backend/routes/
├── auth.ts
├── users.ts
├── admin.ts
```

This structure is purely for grouping logic — it does not affect routing behavior.

---

## Server-Only Imports

### `importServer()`

Utility to safely import server-only code.

Rules:

- Only usable inside `/src/backend`
- Never allowed in `/src/web`
- Never bundled to the client

Use cases:

- Database access
- Authentication logic
- Environment variables
- Secrets handling
- Heavy server-only dependencies

Guarantees strict frontend/backend isolation.

---

## Instrumentation File

### `/src/nytlex.ts`

Application bootstrap file executed once at startup.

Used for:

- Database initialization
- Global middleware setup
- Logging configuration
- Background jobs
- Environment setup

Key details:

- Must export a default function
- Can be async
- Runs before routes are registered
- Executes in dev and production

---

## Configuration Files

### `nytlex.config.ts`

Main framework configuration.

Used for:

- Server configuration
- Plugins and middleware
- Runtime behavior
- Environment-specific settings

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

Defines dependencies and scripts.

Example:

```json
{
  "scripts": {
    "dev": "nytlex dev",
    "start": "nytlex start"
  }
}
```

- `dev` → development server with hot reload
- `start` → production server
```
