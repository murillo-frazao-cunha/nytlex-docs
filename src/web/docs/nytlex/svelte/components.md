# Components in Nytlex.js

This page presents essential components for navigation and image optimization in Nytlex.js web applications. These components are designed to be used in your frontend code and follow best practices for performance and developer experience.

---

## Link (Navigation)

The Link component enables fast client-side navigation between pages, using the Nytlex.js router. It is imported from `nytlex/svelte`.

### Basic Example
```svelte
<script lang="ts">
  import { Link } from "nytlex/svelte";
</script>

<Link href="/docs/nytlex/components">
Go to Components
</Link>
```

#### Props
- `href` (string): Destination URL.
- `children` (Slot): Link content.
- Accepts all standard `<a>` props.

#### How it works
When clicked, Link intercepts the event and uses the Nytlex.js router for navigation without a full page reload. This improves user experience and enables SPA-like navigation.

---

## NytlexImage (Optimized Images)

The NytlexImage component (exported as `Image` or `NytlexImage` from `nytlex/svelte`) automatically optimizes images, reducing layout shift and improving performance. It is recommended for all images in your app.

### Basic Example
```svelte
<script lang="ts">
  import { Image } from "nytlex/svelte";
</script>

<Image
  src="/logo.png"
  width={200}
  height={100}
  alt="Logo"
/>
```

#### Props
- `src` (string): Image path (local, base64, or external).
- `width`/`height` (number | string): Dimensions (px or %).
- `quality` (number): Quality (default: 75).
- `priority` (boolean): Priority loading (eager vs lazy).
- Accepts all standard `<img>` props.

#### How it works
- Local or base64 images are optimized via backend (`/_nytlex/image`).
- External images (http) are not optimized.
- Applies base styles to prevent layout shift if dimensions are provided.
- Automatically strips `px` from width/height if passed as string.
- Uses `loading` and `decoding` attributes for performance.

---

## Usage Recommendations
- Always use `Link` for navigation between pages to leverage client-side routing.
- Use `NytlexImage` for all images to benefit from automatic optimization and layout stability.
- Provide explicit `width` and `height` to prevent layout shift.
- Use `priority` for images that should load immediately (e.g., above the fold).
