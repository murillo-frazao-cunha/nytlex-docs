# Middleware in Nytlex.js

Middleware functions let you run code **before** or **after** a request is handled. Nytlex.js provides a flexible middleware system that works based on folder structure and route configuration.

---

## Overview

Middleware in Nytlex.js can be:
- **Folder-based**: applies to all routes in a specific folder
- **Route-specific**: applies only to a single route
- **Chainable**: multiple middleware can run in sequence
- **Asynchronous**: supports both sync and async operations

---

## Folder-Based Middleware

Middleware can be defined at the folder level using a `middleware.ts` file. These middleware functions will automatically apply to all routes in that folder and its direct files, but not to subfolders.

### File Structure Example

```
src/
  backend/
    routes/
      middleware.ts        # Applies to all routes in this folder
      users.ts            # Uses middleware from middleware.ts
      auth/
        middleware.ts     # Applies only to routes in auth/
        login.ts         # Uses middleware from auth/middleware.ts
        register.ts      # Uses middleware from auth/middleware.ts
      admin/
        middleware.ts    # Different middleware for admin routes
        dashboard.ts     # Uses middleware from admin/middleware.ts
```

### Creating Middleware

```typescript
// src/backend/routes/middleware.ts
import { NytlexRequest, NytlexResponse } from "nytlex";

export function loggerMiddleware(
    request: NytlexRequest,
    params: { [key: string]: string },
    next: () => Promise<NytlexResponse>
): Promise<NytlexResponse> | NytlexResponse {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    return next();
}

export function authMiddleware(
    request: NytlexRequest,
    _params: { [key: string]: string },
    next: () => Promise<NytlexResponse>
): Promise<NytlexResponse> | NytlexResponse {
    const token = request.headers.get("authorization");

    if (!token) {
        return NytlexResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return next();
}
```

> If you're using authentication, your project may also use `@nytlex/auth` for session/user helpers.

### Middleware Scope

Each `middleware.ts` file only affects its immediate folder:

```typescript
// src/backend/routes/auth/middleware.ts
import { NytlexRequest, NytlexResponse } from "nytlex";

export function authValidationMiddleware(
    _request: NytlexRequest,
    _params: { [key: string]: string },
    next: () => Promise<NytlexResponse>
): Promise<NytlexResponse> | NytlexResponse {
    // This middleware only applies to routes in the auth folder
    return next();
}
```

---

## Route-Specific Middleware

You can override folder-level middleware at the route level using the `middleware` property in your route configuration.

When you provide `middleware` on a route, Nytlex.js will use **only** that list for the route (the folder middleware will be ignored for that specific file).

### Using Middleware in Routes

```typescript
// src/backend/routes/users.ts
import { BackendRouteConfig, NytlexResponse } from "nytlex";
import { loggerMiddleware, authMiddleware } from "./middleware";

const route: BackendRouteConfig = {
    pattern: "/api/users",

    // Use specific middleware for this route
    middleware: [loggerMiddleware, authMiddleware],

    GET: async () => {
        return NytlexResponse.json({ users: [] });
    }
};

export default route;
```

---

## Best Practices

1. **Middleware Organization**
   - Keep middleware files in relevant folders
   - Name middleware functions clearly based on their purpose
   - Be explicit about middleware scope

2. **Performance**
   - Keep middleware lightweight
   - Use async operations wisely
   - Consider the order of middleware execution

3. **Error Handling**
   - Always handle potential errors in middleware
   - Use appropriate HTTP status codes
   - Provide meaningful error messages

4. **Middleware Composition**
   - Combine middleware thoughtfully
   - Avoid redundant middleware
   - Consider the order of execution

