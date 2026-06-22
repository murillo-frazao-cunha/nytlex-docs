<script setup lang="ts">
import Navbar from "@/web/components/Navbar.vue";
import './globals.css';
import { ref, onMounted, onUnmounted } from 'vue';
import { router } from 'nytlex/vue';

// Criamos um estado reativo pro Vue rastrear
const currentPath = ref(router.pathname);

onMounted(() => {
  // Escutamos o evento do seu router e atualizamos o estado do Vue
  const unsubscribe = router.subscribe(() => {
    currentPath.value = router.pathname;
  });

  onUnmounted(() => {
    unsubscribe();
  });
});

function onAfterLeave() {
  window.scrollTo(0, 0);
}
</script>
<script lang="ts">
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
};
</script>
<template>
  <Navbar />

  <Transition
      name="page-transition"
      mode="out-in"
      @after-leave="onAfterLeave"
  >
    <div :key="currentPath">
      <slot />
    </div>
  </Transition>
</template>

<style>
/* Transição moderna, suave e sem causar scroll horizontal */
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>