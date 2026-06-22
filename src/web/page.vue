<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Zap, Shield, Globe, Box, Github,
  Search, Cpu, Layers, Flame,
  Terminal, Wifi, Code, Network,
  Server, Gauge // Ícones novos para representar Go/Server e Performance
} from 'lucide-vue-next';

// Imports do framework Nytlex (versão Vue)
import { Link, NytlexImage } from "nytlex/vue";

// Componentes
import Footer from "./components/Footer.vue";
// Server RPC
import {dependencies} from "@/../package.json"

// State
const version = ref("1.0.0");
const primaryColor = "#00344C";

// Lifecycle
onMounted(async () => {
  try {
    const response = await fetch(
        "https://registry.npmjs.org/nytlex"
    );

    const data = await response.json();

    version.value = data["dist-tags"].latest;
  } catch (e) {
    console.error("Failed to fetch version", e);
  }
});

// Particles

// Refs para animações
const heroTitle = ref(null);
const heroSubtitle = ref(null);
const heroButtons = ref(null);
const heroCmd = ref(null);
const featHeader = ref(null);
const featGrid = ref(null);
const archHeader = ref(null);
const archGrid = ref(null);

// Dados das Features para o v-for
const featuresList = [
  {
    icon: Layers,
    title: "Pattern Routing",
    desc: "Flexible route matching with regex support. Not just file-system based.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/30"
  },
  {
    icon: Wifi,
    title: "Native HTTP/3 Support",
    desc: "The only framework with native HTTP and built-in HTTP/3 support.",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "hover:border-teal-500/30"
  },
  {
    icon: Network,
    title: "Choose your framework",
    desc: "Pick React, Vue, or Svelte and work your way — no lock-in, no headaches.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "hover:border-violet-500/30"
  },
  {
    icon: Code,
    title: "Native React support",
    desc: "Build fast, scalable, and modern interfaces using the most popular ecosystem.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30"
  },
  {
    icon: Box,
    title: "Native Vue.js support",
    desc: "Create elegant and highly productive applications with a smooth learning curve.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/30"
  },
  {
    icon: Flame,
    title: "Native Svelte support",
    desc: "Build highly reactive, compile-time optimized interfaces with zero boilerplate.",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "hover:border-red-500/30"
  },
];



// Estado simples para controlar o feedback visual do botão de copiar
const copied = ref(false)

const copyCommand = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>
<script lang="ts">
import {Metadata} from "nytlex/vue";

export function generateMetadata(): Metadata {
  return {
    title: 'Nytlex.js | The Fastest Framework for Web'
  }
}
</script>
<template>
  <div class="min-h-screen bg-black text-slate-300 selection:bg-blue-500/30 font-sans selection:text-white relative custom-scrollbar">

    <section class="relative z-10 pt-24 pb-24 md:pt-24 md:pb-20 px-6 text-center overflow-hidden border-b border-white/10">
      <div class="grid-background"> </div>
      <div class="grid-corner-circle circle-top-left"> </div>
      <div class="grid-corner-circle circle-bottom-right" > </div>

      <div class="relative z-10 w-full max-w-full mx-auto px-4">
        <div
            class="nytlex-reveal nytlex-reveal-fade inline-block px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-lg"
            :style="{ '--d': '0ms' }"
        >
          v{{ version }} {{ version.includes("canary") ? "" : 'Stable' }}
        </div>

        <h1
            ref="heroTitle"
            class="nytlex-reveal nytlex-reveal-up nytlex-stagger text-5xl sm:text-6xl md:text-[75px] lg:text-[85px] font-bold text-white tracking-tight leading-[1.05] mb-8 max-w-6xl mx-auto"
            :style="{ '--d': '90ms' }"
        >
          The framework
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">for the web.</span>
        </h1>

        <p
            ref="heroSubtitle"
            class="nytlex-reveal nytlex-reveal-up nytlex-stagger max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-12 font-medium"
            :style="{ '--d': '160ms' }"
        >
          Nytlex.js is a high-performance full-stack primitive combining Node.js orchestration with a Go performance layer for optimization. Built for speed and native React, Vue, or Svelte integration.
        </p>

        <div
            ref="heroButtons"
            class="nytlex-reveal nytlex-reveal-up nytlex-stagger flex flex-col items-center gap-6"
            :style="{ '--d': '230ms' }"
        >
          <div class="p-[2px] rounded-2xl bg-gradient-to-br from-white/30 via-white/20 to-white/10 hover:from-white/40 hover:to-white/20 transition-all duration-500 nytlex-tilt nytlex-sheen w-full max-w-xs">
            <div ref="heroCmd" class="nytlex-reveal nytlex-reveal-fade nytlex-stagger relative w-full" :style="{ '--d': '230ms' }">
              <div class="absolute inset-0 bg-white/30 blur-3xl rounded-full" />
              <Link href="/docs" class="text-black relative flex items-center justify-center gap-4 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-[14px] text-[16px] sm:text-[18px] font-bold shadow-2xl hover:from-white hover:to-gray-100 transition-all">
                Get started
              </Link>
            </div>
          </div>

          <div :class="`p-[2px] rounded-2xl bg-gradient-to-br from-white/20 to-white/5 hover:from-white/30 hover:to-[${primaryColor}]/30 transition-all duration-500 nytlex-tilt nytlex-sheen w-full max-w-md`">
            <div ref="heroCmd" class="nytlex-reveal nytlex-reveal-fade nytlex-stagger relative w-full" :style="{ '--d': '230ms' }">
              <div :class="`absolute inset-0 bg-[${primaryColor}]/30 blur-3xl rounded-full`" />
              <div class="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 bg-black/60 backdrop-blur-xl border border-white/20 rounded-[14px] text-xs sm:text-sm font-mono shadow-2xl">
                <span :style="{ color: primaryColor }">$</span>
                <span class="text-slate-200 flex-1 text-left font-medium overflow-hidden text-ellipsis whitespace-nowrap">npm create nytlex@latest</span>

                <button
                    @click="copyCommand('npm create nytlex@latest ')"
                    class="text-slate-500 hover:text-white p-1 rounded transition-colors duration-150 focus:outline-none mr-1"
                    title="Copy command"
                >
                  <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
                </button>

                <Terminal :size="16" class="text-slate-500 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div>
      <div class="pointer-events-none fixed inset-0 z-0">
        <div
            class="absolute inset-0 opacity-0"
            :style="{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: `radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 85%, transparent 100%)`,
            animation: 'fastReveal 1.5s ease-out forwards'
          }"
        ></div>
      </div>

      <section class="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-32">
        <div ref="archHeader" class="nytlex-reveal nytlex-reveal-up flex flex-col items-center mb-12 md:mb-20">
          <h2 class="text-3xl md:text-4xl font-black text-white text-center drop-shadow-lg">Engineered for Excellence</h2>
          <div class="w-24 h-1.5 mt-6 rounded-full shadow-lg shadow-white/20" :style="{ backgroundColor: primaryColor }" />
        </div>

        <div ref="archGrid" class="nytlex-reveal nytlex-reveal-up grid grid-cols-1 md:grid-cols-3 gap-6">


          <div class="group relative p-[2px] rounded-2xl bg-gradient-to-br from-cyan-500/30 via-white/15 to-white/5 hover:from-cyan-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 flex flex-col">
              <div class="flex items-start gap-5 mb-8 relative z-10">
                <div class="shrink-0 p-2.5 bg-cyan-500/20 rounded-xl border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10">
                  <svg width="28" height="28" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-sky-400"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <h3 class="text-xl font-bold text-white">React 19</h3>
                    <span class="text-[10px] font-mono text-slate-400">Stable</span>
                  </div>
                  <p class="text-sm text-slate-300">Instant interactions and seamless Suspense.</p>
                </div>
              </div>
              <div class="mt-auto bg-black/60 backdrop-blur-sm rounded-xl p-4 font-mono text-[11px] text-slate-300 border border-white/5 overflow-x-auto custom-scrollbar">
                <div class="flex justify-between text-slate-400 mb-3 pb-2 min-w-max">
                  <span>counter.tsx</span>
                  <span class="text-cyan-400 text-[10px]">Client</span>
                </div>
                <div class="text-slate-300 min-w-max">
                  <span class="text-purple-400">const</span> [<span class="text-sky-400">s</span>, <span class="text-blue-400">set</span>] = <span class="text-yellow-300">useState</span>(<span class="text-emerald-400">0</span>)
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>

          <div class="group relative p-[2px] rounded-2xl bg-gradient-to-br from-green-500/30 via-white/15 to-white/5 hover:from-green-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 flex flex-col">
              <div class="flex items-start gap-5 mb-8 relative z-10">
                <div class="shrink-0 p-3 bg-green-500/20 rounded-xl border border-green-500/30 shadow-lg shadow-green-500/10">
                  <svg viewBox="0 0 128 128" width="24" height="24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" fill="#41B883"/><path d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" fill="#35495E"/></svg>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <h3 class="text-xl font-bold text-white">Vue 3</h3>
                    <span class="text--[10px] font-mono text-slate-400">Stable</span>
                  </div>
                  <p class="text-sm text-slate-300">Instant interactions and seamless async rendering.</p>
                </div>
              </div>
              <div class="mt-auto bg-black/60 backdrop-blur-sm rounded-xl p-4 font-mono text-[11px] text-slate-300 border border-white/5 overflow-x-auto custom-scrollbar">
                <div class="flex justify-between text-slate-400 mb-3 pb-2 border-b border-white/5 min-w-max">
                  <span>App.vue</span>
                  <span class="text-emerald-400 text-[10px]">Setup</span>
                </div>
                <div class="text-slate-300 min-w-max">
                  <span class="text-purple-400">const</span> <span class="text-sky-400">val</span> = <span class="text-amber-400">ref</span>(<span class="text-pink-400">0</span>)
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>

          <div class="group relative p-[2px] rounded-2xl bg-gradient-to-br from-red-500/30 via-white/15 to-white/5 hover:from-red-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 flex flex-col">
              <div class="flex items-start gap-5 mb-8 relative z-10">
                <div class="shrink-0 p-3 bg-red-500/20 rounded-xl border border-red-500/30 shadow-lg shadow-red-500/10 text-red-400">

                  <svg class="w-full h-full" width="28" height="28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 98.1 118" style="enable-background:new 0 0 98.1 118;" xml:space="preserve">
<path style="fill:#FF3E00;" d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"/>
                    <path style="fill:#FFFFFF;" d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"/>
</svg>

                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <h3 class="text-xl font-bold text-white">Svelte 5</h3>
                    <span class="text-[10px] font-mono text-slate-400">Stable</span>
                  </div>
                  <p class="text-sm text-slate-300">Instant interactions and hyper-efficient compilation.</p>
                </div>
              </div>
              <div class="mt-auto bg-black/60 backdrop-blur-sm rounded-xl p-4 font-mono text-[11px] text-slate-300 border border-white/5 overflow-x-auto custom-scrollbar">
                <div class="flex justify-between text-slate-400 mb-3 pb-2 border-b border-white/5 min-w-max">
                  <span>App.svelte</span>
                  <span class="text-red-400 text-[10px]">Component</span>
                </div>
                <div class="text-slate-300 min-w-max">
                  <span class="text-purple-400">let</span> <span class="text-sky-400">val</span> = <span class="text-red-400">$state</span>(<span class="text-pink-400">0</span>)
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>



          <div class="group relative p-[2px] rounded-2xl bg-gradient-to-br from-blue-500/30 via-white/15 to-white/5 hover:from-blue-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 flex flex-col">
              <div class="flex items-start gap-5 mb-8 relative z-10">
                <div class="shrink-0 p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10">
                  <Server :size="28" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <h3 class="text-xl font-bold text-white">Hybrid Runtime</h3>

                  </div>
                  <p class="text-sm text-slate-300 mt-2">
                    We use a dedicated Go system to handle all HTTP traffic, offloading the event loop.
                  </p>
                </div>
              </div>

              <div class="mt-auto bg-black/60 backdrop-blur-sm rounded-xl p-4 font-mono text-[11px] text-slate-300 border border-white/5 overflow-x-auto custom-scrollbar">
                <div class="flex justify-between text-slate-400 mb-3 pb-2 border-b border-white/5 min-w-max">
                  <span>nytlex.config.ts</span>
                  <span class="text-blue-400 text-[10px]">Network Layer</span>
                </div>
                <div class="space-y-1.5 min-w-max">
                  <div class="flex flex-wrap gap-1">
                    <span class="text-purple-400">func</span>
                    <span class="text-sky-400">StartHttpServer</span><span>()</span>
                    <span>{</span><span>}</span>
                  </div>
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>

          <div class="group relative p-[2px] rounded-2xl bg-gradient-to-br from-pink-500/30 via-white/15 to-white/5 hover:from-pink-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 flex flex-col">
              <div class="flex items-start gap-5 mb-8 relative z-10">
                <div class="shrink-0 p-3 bg-pink-500/20 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10">
                  <svg width="28" height="28" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-pink-500" d="M17.183 0C12.6 0 9.737 2.291 8.59 6.873c1.719-2.29 3.723-3.15 6.014-2.577 1.307.326 2.242 1.274 3.275 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.291 8.591-6.872-1.718 2.29-3.723 3.15-6.013 2.576-1.308-.326-2.243-1.274-3.276-2.324C23.39 1.98 21.44 0 17.183 0ZM8.59 10.309C4.01 10.309 1.145 12.6 0 17.182c1.718-2.291 3.723-3.15 6.013-2.577 1.308.326 2.243 1.274 3.276 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.29 8.59-6.872-1.718 2.29-3.722 3.15-6.013 2.577-1.307-.327-2.242-1.276-3.276-2.325-1.684-1.71-3.634-3.689-7.893-3.689Z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <h3 class="text-xl font-bold text-white">Tailwind CSS</h3>
                    <span class="text-[10px] font-mono text-slate-400">v4.0</span>
                  </div>
                  <p class="text-sm text-slate-300">Modern utility-first design system built-in.</p>
                </div>
              </div>
              <div class="mt-auto bg-black/60 backdrop-blur-sm rounded-xl p-4 font-mono text-[11px] text-slate-300 border border-white/5 overflow-x-auto custom-scrollbar">
                <div class="flex justify-between text-slate-400 mb-3 pb-2 min-w-max">
                  <span>styles.css</span>
                  <span class="text-pink-400 text-[10px]">Zero Runtime</span>
                </div>
                <div class="space-y-1.5 min-w-max">
                  <div class="flex flex-wrap gap-1">
                    <span class="text-purple-400">@theme</span>
                    <span>{</span>
                  </div>
                  <div class="pl-4 flex flex-wrap gap-1 text-slate-300">
                    <span class="text-sky-400">--color-primary</span>
                    <span>:</span>
                    <span class="text-pink-400">#ec4899</span>
                    <span>;</span>
                  </div>
                  <div class="pl-4 flex flex-wrap gap-1 text-slate-300">
                    <span class="text-sky-400">--font-sans</span>
                    <span>:</span>
                    <span class="text-emerald-400">'Inter'</span>
                    <span>;</span>
                  </div>
                  <div>}</div>
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>

          <div class="group relative p-[2px] rounded-2xl bg-gradient-to-br from-orange-500/30 via-white/15 to-white/5 hover:from-orange-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 flex flex-col">
              <div class="flex items-start gap-5 mb-8 relative z-10">
                <div class="shrink-0 p-3 bg-orange-500/20 rounded-xl border border-orange-500/30 text-orange-400 shadow-lg shadow-orange-500/10">
                  <Gauge :size="28" />
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <h3 class="text-xl font-bold text-white">Native Optimizer</h3>
                  </div>
                  <p class="text-sm text-slate-300 mt-2">
                    Low-level optimizer and compressor for .js files.
                  </p>
                </div>
              </div>

              <div class="mt-auto bg-black/60 backdrop-blur-sm rounded-xl p-4 font-mono text-[11px] text-slate-300 border border-white/5 overflow-x-auto custom-scrollbar">
                <div class="flex justify-between text-slate-400 mb-3 pb-2 min-w-max">
                  <span>Terminal</span>
                  <span class="text-sky-400 text-[10px]">Optimizer</span>
                </div>

                <div class="space-y-1 min-w-max">
                  <div class="flex gap-3">
                    <span class="text-slate-500">18:16:20</span>
                    <span class="text-sky-400">Optimization summary:</span>
                  </div>

                  <div class="flex gap-3">
                    <span class="text-slate-500">18:16:20</span>
                    <span>
                      Original&nbsp;:
                      <span class="text-emerald-400">427.24 KB</span>
                    </span>
                  </div>

                  <div class="flex gap-3">
                    <span class="text-slate-500">18:16:20</span>
                    <span>
                      Final&nbsp;&nbsp;&nbsp;&nbsp;:
                      <span class="text-emerald-400">124.34 KB</span>
                    </span>
                  </div>

                  <div class="flex gap-3">
                    <span class="text-slate-500">18:16:20</span>
                    <span>
                      Saved&nbsp;&nbsp;&nbsp;&nbsp;:
                      <span class="text-emerald-400">302.90 KB</span>
                      <span class="text-slate-500">(70.90%)</span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>

        </div>
      </section>

      <section class="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div ref="featHeader" class="nytlex-reveal nytlex-reveal-up mb-12 md:mb-16">
          <h2 class="text-3xl font-bold text-white mb-4 text-center drop-shadow-lg">What's in Nytlex.js?</h2>
          <p class="text-slate-300 text-center max-w-2xl mx-auto">Everything you need to build great products on the web, packed into a cohesive framework.</p>
        </div>

        <div ref="featGrid" class="nytlex-reveal nytlex-reveal-up grid grid-cols-1 md:grid-cols-3 gap-5 z-10">

          <div :class="`md:col-span-2 group relative p-[2px] rounded-2xl bg-gradient-to-br from-cyan-500/30 via-white/15 to-white/5 hover:from-cyan-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen`">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 flex flex-col justify-between">

              <div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8 relative z-10">
                <div class="shrink-0">
                  <div class="p-4 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                    <Globe :size="28" />
                  </div>
                </div>

                <div class="flex-1">
                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3">
                    <h3 class="text-2xl font-bold text-white">Native RPC System</h3>
                    <div class="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-3 py-1.5 rounded-lg bg-cyan-950/40 backdrop-blur-sm self-start sm:self-auto">Core</div>
                  </div>
                  <p class="text-slate-300 max-w-md">Direct server-to-client communication. Expose your backend logic specifically to your frontend with zero boilerplate.</p>
                </div>
              </div>

              <div class="mt-auto relative z-10 rounded-xl bg-black/60 backdrop-blur-md p-4 font-mono text-[11px] leading-relaxed text-slate-300 shadow-2xl border border-white/5 transition-all duration-300 group-hover:border-cyan-500/30 overflow-x-auto custom-scrollbar">
                <div class="mb-3 flex items-center justify-between pb-2 text-slate-400 min-w-max">
                  <span class="text-xs">src/backend/actions.ts</span>
                  <span class="text-xs font-medium text-cyan-400 ml-4">Server Side</span>
                </div>
                <div class="space-y-1.5 min-w-max">
                  <span class="text-yellow-300">Expose</span>(<span class="text-blue-400">getUser</span>)
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>

          <div :class="`group relative p-[2px] rounded-2xl bg-gradient-to-br from-blue-500/30 via-white/15 to-white/5 hover:from-blue-500/50 hover:via-white/25 transition-all duration-500 nytlex-tilt nytlex-sheen`">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 md:p-8 overflow-hidden border border-white/10 transition-all duration-500 flex flex-col">

              <div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8 relative z-10">
                <div class="shrink-0">
                  <div class="p-4 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10">
                    <Shield :size="28" />
                  </div>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-white mb-3">Nytlex Auth</h3>
                  <p class="text-slate-300">Secure session management built-in. Protect your routes and data effortlessly.</p>
                </div>
              </div>

              <div class="mt-auto relative z-10 rounded-xl bg-black/60 backdrop-blur-md p-4 font-mono text-[11px] leading-relaxed text-slate-300 shadow-2xl border border-white/5 transition-all duration-300 group-hover:border-blue-500/30 overflow-x-auto custom-scrollbar">
                <div class="space-y-1 text-slate-300 min-w-max">
                  <span class="text-purple-400">const</span> { <span class="text-sky-400">user</span> } = <span class="text-blue-400">useSession</span>()
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]"></div>
            </div>
          </div>

          <div v-for="(item, idx) in featuresList" :key="idx" :class="`group relative p-[2px] rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-white/5 hover:from-white/30 hover:via-white/20 transition-all duration-500 nytlex-tilt nytlex-sheen ${item.border}`" :style="{ transitionDelay: `${idx * 50}ms` }">
            <div class="relative h-full bg-[#0a0a0c]/90 backdrop-blur-xl rounded-[14px] p-6 overflow-hidden border border-white/10 flex flex-col sm:flex-row items-start gap-4">
              <div :class="`p-3 rounded-xl ${item.bg} ${item.color} shrink-0 shadow-lg border border-white/10`">
                <component :is="item.icon" :size="24" />
              </div>

              <div>
                <h4 class="text-lg font-bold text-white mb-2">{{ item.title }}</h4>
                <p class="text-sm text-slate-300 leading-relaxed">{{ item.desc }}</p>
              </div>

              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]/50 pointer-events-none" :style="{ background: `radial-gradient(circle at center, ${item.color.replace('text-', 'rgb(var(--tw-')}10 0%, transparent 70%)` }"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 ">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16 items-center">

          <div class="lg:col-span-2 nytlex-reveal nytlex-reveal-left">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Built for <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">Modern Devs.</span>
            </h2>
            <p class="text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed font-normal">
              Built for developers who value speed, control, and clarity, from the first command to production.
            </p>

            <div class="space-y-6">
              <div class="flex gap-4 group">
                <div class="shrink-0 w-12 h-12 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner group-hover:border-emerald-500/30 transition-all duration-300">
                  <Terminal :size="20" />
                </div>
                <div>
                  <h4 class="text-white font-semibold text-base mb-1">Interactive CLI</h4>
                  <p class="text-sm text-neutral-400 leading-relaxed">A guided setup experience with intelligent defaults.</p>
                </div>
              </div>
              <div class="flex gap-4 group">
                <div class="shrink-0 w-12 h-12 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center text-cyan-400 shadow-inner group-hover:border-cyan-500/30 transition-all duration-300">
                  <Cpu :size="20" />
                </div>
                <div>
                  <h4 class="text-white font-semibold text-base mb-1">Native Environment</h4>
                  <p class="text-sm text-neutral-400 leading-relaxed">Cross-platform by default. Automatically detects your Node.js version.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-3 nytlex-reveal nytlex-reveal-right relative p-[4px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
            <div class="bg-[#09090b] backdrop-blur-2xl rounded-[15px] overflow-hidden   font-mono text-[13px] leading-relaxed shadow-2xl">

              <div class="bg-neutral-900/40 px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-neutral-800 border border-white/5" />
                  <div class="w-3 h-3 rounded-full bg-neutral-800 border border-white/5" />
                  <div class="w-3 h-3 rounded-full bg-neutral-800 border border-white/5" />
                </div>
                <span class="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">Nytlex CLI Session</span>
              </div>

              <div class="p-5 md:p-7 overflow-x-auto custom-scrollbar max-h-[450px] bg-black/20">
                <div class="min-w-max">
                  <div class="flex gap-3 mb-5">
                    <span class="text-neutral-500">PS D:\Nytlex&gt;</span>
                    <span class="text-neutral-100 font-medium">npm create nytlex@latest my-app</span>
                  </div>

                  <div class="space-y-1.5 mb-6">
                    <div class="flex gap-2">
                      <span class="text-cyan-400">?</span>
                      <span class="text-neutral-200">What framework do you want to use?</span>
                      <span class="text-neutral-500">(React/Vue/Svelte)</span>
                      <span class="text-neutral-400">(svelte)</span>
                    </div>
                    <div class="flex gap-2">
                      <span class="text-cyan-400 font-bold">?</span>
                      <span class="text-neutral-200">Would you like to use recommended options?</span>
                      <span class="text-neutral-500">(Svelte)</span>
                    </div>
                    <div class="pl-4 text-cyan-400 font-medium">
                      ❯ Yes, use recommended defaults - TypeScript, Tailwind CSS, Module Alias
                    </div>
                    <div class="pl-4 text-neutral-600">Maybe, use Path Router defaults</div>
                  </div>

                  <div class="space-y-1 mb-6">
                    <div v-for="(msg, i) in ['Created project directory and package.json', 'Created project structure', 'TypeScript configuration initialized.', 'Tailwind CSS setup complete.']" :key="i" class="flex gap-3 items-center">
                      <span class="text-neutral-600 text-[11px]">13:12:54</span>
                      <span class="text-emerald-400 font-semibold text-[12px]">✔ SUCCESS</span>
                      <span class="text-neutral-300">{{ msg }}</span>
                    </div>
                    <div class="flex gap-3 items-center mt-2">
                      <span class="text-neutral-600 text-[11px]">13:12:54</span>
                      <span class="text-cyan-400 animate-pulse">○</span>
                      <span class="text-neutral-300 font-semibold">Installing dependencies...</span>
                    </div>
                  </div>

                  <div class="pt-5 border-t border-white/5 space-y-4">
                    <div class="flex gap-3 items-center">
                      <span class="text-neutral-600 text-[11px]">13:12:59</span>
                      <span class="text-cyan-400 font-medium">nytlex.js</span>
                      <span class="text-neutral-400">v{{ version }}</span>
                    </div>

                    <div class="flex gap-3 items-center">
                      <span class="text-neutral-600 text-[11px]">13:12:59</span>
                      <span class="text-emerald-400">✔</span>
                      <span class="text-neutral-100 font-semibold">Project my-app created successfully.</span>
                    </div>

                    <div class="grid grid-cols-1 gap-1 pl-10">
                      <div class="text-neutral-400 font-medium mb-1">Environment:</div>
                      <div class="text-neutral-300 flex gap-2">
                        <span class="text-neutral-700">•</span> Runtime: <span class="text-emerald-400 font-medium">Node.js v25.4.0</span>
                      </div>
                      <div class="text-neutral-300 flex gap-2">
                        <span class="text-neutral-700">•</span> Framework: <span class="text-cyan-400 font-medium">Nytlex.js v{{ version }}</span>
                      </div>
                    </div>

                    <div class="pl-10">
                      <div class="text-neutral-400 font-medium mb-1">Next steps:</div>
                      <div class="text-cyan-400 font-medium">1. cd my-app</div>
                      <div class="text-cyan-400 font-medium">2. npm run dev</div>
                    </div>

                    <div class="text-[11px] text-neutral-600 pt-2 italic">
                      Website: <span class="underline decoration-neutral-700">https://nytlex.mfraz.ovh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section class="relative z-10 w-full max-w-full mx-auto px-6 py-16 md:py-32 text-center overflow-hidden border-b border-white/5 ">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_65%)] pointer-events-none" />

        <div class="nytlex-reveal nytlex-reveal-up relative z-10 max-w-6xl mx-auto px-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-neutral-300 mb-8 shadow-inner">
            <Github :size="14" class="opacity-80" />
            <span>Open Source</span>
          </div>

          <div class="mb-10">
            <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.05] drop-shadow-2xl max-w-4xl mx-auto">
              Ready to build <br class="hidden sm:inline" />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400 drop-shadow-lg">the future?</span>
            </h2>
            <p class="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto font-medium">
              Join the ecosystem of developers building faster, lighter, and more scalable web applications.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link href="/docs" class="w-full px-6 py-3.5 bg-white text-black font-bold rounded-xl shadow-2xl hover:bg-neutral-100 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
              <Search :size="16" />
              Documentation
            </Link>

            <a href="https://github.com/murillo-frazao-cunha/nytlex.js" target="_blank" rel="noreferrer" class="w-full px-6 py-3.5 bg-black/40 backdrop-blur-xl border border-white/10 text-white font-bold rounded-xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
              <Github :size="16" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

    </div>

    <Footer />
  </div>
</template>

<style>
/* CSS do Grid Background e Animações - Enhanced */
.grid-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at 50% 0%, black 20%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 0%, black 20%, transparent 80%);
  animation: gridFadeIn 1.2s ease-out forwards;
}

.grid-corner-circle {
  position: absolute;
  width: 400px;
  height: 400px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  animation: gridFadeIn 1.5s ease-out 0.3s forwards, circleFloat 8s ease-in-out infinite;
}

.circle-top-left {
  top: -150px;
  left: -150px;
}

.circle-bottom-right {
  bottom: -150px;
  right: -150px;
  opacity: 0;
  animation-delay: 0.5s;
}

@keyframes gridFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes circleFloat {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.05) rotate(5deg);
  }
}

@keyframes fastReveal {
  0% {
    opacity: 0;
    transform: scale(0.96);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}
</style>