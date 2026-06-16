# Routing in Nytlex.js - Vue

Nytlex.js uses file-based routing for the **frontend** and configuration-based routing for the **backend**. This guide explains how routes work, how to create route files, and what patterns you can use.

---

## Frontend Routing (PathRouter)

Frontend routes are created automatically from the file structure in `/src/web`. You do not need to register routes manually.

### File and Folder Mapping

- `/src/web/page.vue` → `/`
- `/src/web/about/page.vue` → `/about`
- `/src/web/blog/[id]/page.vue` → `/blog/:id`

---

### Dynamic Segments

Nytlex.js supports the following dynamic segment formats:

| Segment         | Matches                | Does Not Match |
|-----------------|------------------------|----------------|
| `[param]`       | `/1`, `/2`             | `/`, `/1/2`    |
| `[[param]]`     | `/`, `/en`, `/pt`      | `/en/us`       |
| `[...param]`    | `/a`, `/a/b`, `/a/b/c` | `/`            |
| `[[...param]]`  | `/`, `/a`, `/a/b/c`    | N/A            |

---

### Examples

#### Required Parameter `[param]`

```
/src/web/blog/[id]/page.vue → /blog/:id
```

---

#### Optional Parameter `[[param]]`

```
/src/web/[[lang]]/about/page.vue → /:lang?/about
```

---

#### Catch-all Routes `[...param]`

```
/src/web/docs/[...slug]/page.vue → /docs/*
```

---

#### Optional Catch-all `[[...param]]`

```
/src/web/[[...path]]/page.vue → /* (also matches /)
```

---

### Example Page

```vue
<!-- src/web/blog/[id]/page.vue -->
<template>
  <main>
    <h1>Blog Post {{ props.params.id }}</h1>
    <p>Reading post: {{ props.params.id }}</p>
  </main>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  params: {
    id: string;
  };
}>();
</script>
```

---

### Metadata Interface

```ts
export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string | string[];
  author?: string;
  favicon?: string;
  viewport?: string;
  themeColor?: string;
  canonical?: string;
  robots?: string;

  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    image?:
      | string
      | {
          url: string;
          width?: number;
          height?: number;
          alt?: string;
        };
    siteName?: string;
    locale?: string;
  };

  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };

  language?: string;
  charset?: string;
  appleTouchIcon?: string;
  manifest?: string;
  other?: Record<string, string>;
  scripts?: Record<string, Record<string, string>>;
}
```

---

## Backend Routes

Backend routes live in `/src/backend/routes`.

Each file exports a **`BackendRouteConfig`**, and routing is fully explicit via `pattern`.

---

### Route Configuration

```ts
export interface BackendRouteConfig {
  pattern: string;

  GET?: BackendHandler;
  POST?: BackendHandler;
  PUT?: BackendHandler;
  DELETE?: BackendHandler;

  WS?: WebSocketHandler;

  middleware?: NytlexMiddleware[];
}
```

---

### HTTP Example (Basic Route)

```ts
// src/backend/routes/api/version.ts
import { BackendRouteConfig, NytlexResponse } from "nytlex";

const route: BackendRouteConfig = {
  pattern: "/api/version",

  GET: () => {
    return NytlexResponse.json({
      version: "1.0.0",
      name: "Nytlex.js Example"
    });
  }
};

export default route;
```

---

### CRUD Example

```ts
// src/backend/routes/api/users.ts
import { BackendRouteConfig, NytlexResponse } from "nytlex";

const users = new Map<string, { id: string; name: string }>();

const route: BackendRouteConfig = {
  pattern: "/api/users/[[id]]",

  // List or single user
  GET: async (_req, params) => {
    if (params.id) {
      const user = users.get(params.id);
      if (!user) return NytlexResponse.notFound();
      return NytlexResponse.json(user);
    }

    return NytlexResponse.json([...users.values()]);
  },

  // Create user
  POST: async (req) => {
    const body = await req.json();
    const id = Date.now().toString();

    users.set(id, { id, ...body });

    return NytlexResponse.json({ id }, { status: 201 });
  },

  // Update user
  PUT: async (req, params) => {
    if (!params.id) return NytlexResponse.badRequest();

    const body = await req.json();
    users.set(params.id, { ...body, id: params.id });

    return NytlexResponse.json({ success: true });
  },

  // Delete user
  DELETE: (_req, params) => {
    if (!params.id) return NytlexResponse.badRequest();

    users.delete(params.id);

    return NytlexResponse.json({ success: true });
  }
};

export default route;
```

---

### WebSocket Example (Chat)

```ts
// src/backend/routes/ws/chat.ts
import { BackendRouteConfig, WebSocket } from "nytlex";

const connections = new Set<WebSocket>();

const route: BackendRouteConfig = {
  pattern: "/ws/chat",

  WS: {
    onConnect: (ws) => {
      connections.add(ws);

      ws.send(
        JSON.stringify({
          type: "welcome"
        })
      );
    },

    onMessage: (ws, message) => {
      const data = JSON.parse(message);

      for (const client of connections) {
        if (client === ws) continue;

        client.send(
          JSON.stringify({
            type: "message",
            text: data.text
          })
        );
      }
    },

    onClose: (ws) => {
      connections.delete(ws);
    }
  }
};

export default route;
```
