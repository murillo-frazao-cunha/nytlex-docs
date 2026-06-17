<script lang="ts">
import Navbar from '@/web/components/Navbar.vue';
import type { Metadata } from "nytlex/vue";
export const metadata: Metadata = {
  title: "Nytlex.js | The Fastest Framework for Web",
  description: "The fastest and simplest web framework for React, Vue, and Svelte! Start building high-performance web applications today with Nytlex.js.",
  keywords: [
    "nytlex",
    "nytlex.js",
    "react",
    "vue",
    "svelte",
    "framework",
    "web",
    "fast",
    "http3",
    "full-stack",

    "javascript",
    "typescript",
    "nodejs",
    "bun",
    "deno",
    "server",
    "client",
    "ssr",
    "ssg",
    "isomorphic",
    "universal",
    "spa",
    "mpa",

    "frontend",
    "backend",
    "api",
    "rest",
    "graphql",
    "websocket",
    "realtime",
    "performance",
    "low-latency",
    "high-performance",
    "lightweight",
    "minimal",
    "modular",

    "routing",
    "router",
    "middleware",
    "plugins",
    "hooks",
    "components",
    "state-management",
    "hydration",

    "framework-agnostic",
    "developer-tools",
    "dx",
    "developer-experience",
    "open-source",
    "library",
    "toolkit",

    "edge",
    "edge-computing",
    "cloud",
    "cloudflare",
    "deployment",
    "hosting",
    "bundler",
    "vite",
    "build-tool",

    "http",
    "http2",
    "http3-quic",
    "tcp",
    "networking",

    "scalable",
    "microframework",
    "progressive",
    "modern-web",
    "next-gen"
  ],
  author: "Murillo Frazão Cunha",
  favicon: '/favicon.svg',
  faviconDark: '/favicon-dark.svg',
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#0a0a0c", // Cor combinando com o modo escuro puro do site
  canonical: "https://nytlex.mfraz.ovh",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",

  openGraph: {
    title: "Nytlex.js | The Fastest Framework for Web",
    description: "The fastest and simplest web framework for React, Vue, and Svelte!",
    type: "website",
    url: "https://nytlex.mfraz.ovh",
    image: {
      url: "https://nytlex.mfraz.ovh/logo-all.svg", // Puxando a arte completa para preview
      width: 1200,
      height: 630,
      alt: "Nytlex.js Framework Logo"
    },
    siteName: "Nytlex.js",
    locale: "en_US"
  },

  twitter: {
    card: "summary_large_image",
    title: "Nytlex.js | The Fastest Framework for Web",
    description: "The fastest and simplest web framework for React, Vue, and Svelte!",
    image: "https://nytlex.mfraz.ovh/logo-all.svg",
    imageAlt: "Nytlex.js Framework Logo"
  },

  language: "en-US",
  charset: "UTF-8",

  other: {
    "generator": "Nytlex.js",
    "application-name": "Nytlex"
  },

  scripts: {
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2662588853991140": {
      "crossorigin": "anonymous",
      "async": "true"
    }
  }
};
</script>

<script setup lang="ts">
import './globals.css';
import { router } from 'nytlex/vue'; // Necessário para identificar a mudança de página

// Equivalente ao onExitComplete={() => window.scrollTo(0, 0)}
function onAfterLeave() {
  window.scrollTo(0, 0);
}
</script>

<template>
  <Navbar />

  <Transition
      name="page-transition"
      mode="out-in"
      @after-leave="onAfterLeave"
  >
    <component :is="$slots.default" :key="router.pathname" />
  </Transition>
</template>

<style>
/* Define a duração e a curva de transição.
  cubic-bezier(0.22, 1, 0.36, 1) é a conversão CSS do ease: [0.22, 1, 0.36, 1]
*/
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.3s, transform 0.3s, filter 0.3s;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

/* Estado inicial de entrada (hidden) e final de saída (exit).
  opacity: 0, scale: 0.98, filter: blur(5px)
*/
.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
  transform: scale(0.98);
  filter: blur(5px);
}

/* Estado ativo (enter) é o padrão do elemento, então não precisa declarar explicitamente o 'to' */
</style>