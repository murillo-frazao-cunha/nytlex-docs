<script setup lang="ts">
import { ref } from 'vue';
import { Copy, Check, Download, Image as ImageIcon } from 'lucide-vue-next';

// Componentes do seu projeto
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

const copiedUrl = ref<string | null>(null);

// Lista das artes com as URLs e configurações de visualização
const brandAssets = [
  {
    id: 'logo-all',
    name: 'Nytlex Full',
    desc: 'Logo completa com tipografia para banners e headers.',
    url: '/logo-all.svg',
    previewBg: 'bg-zinc-200'
  },
  {
    id: 'logo',
    name: 'Nytlex Logo',
    desc: 'Logo padrão para uso geral que se adapta em qualquer fundo.',
    url: '/logo.svg',
    previewBg: 'bg-zinc-800'
  },
  {
    id: 'favicon',
    name: 'Favicon Light',
    desc: 'Ícone para fundos escuros ou uso genérico.',
    url: '/favicon.svg',
    previewBg: 'bg-zinc-200'
  },
  {
    id: 'favicon-dark',
    name: 'Favicon Dark',
    desc: 'Ícone feito especificamente para contraste em fundos mais escuros.',
    url: '/favicon-dark.svg',
    previewBg: 'bg-zinc-800'
  }
];

const copyToClipboard = (url: string) => {
  if (typeof window !== 'undefined') {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    copiedUrl.value = url;
    setTimeout(() => {
      copiedUrl.value = null;
    }, 2000);
  }
};
</script>

<template>
  <div class="font-dm relative min-h-screen bg-black text-slate-300 selection:bg-white/10 isolate flex flex-col">
    <div class="pointer-events-none fixed-bg-container z-0">
      <div class="grid-background"> </div>
      <div class="grid-corner-circle circle-top-left"> </div>
      <div class="grid-corner-circle circle-bottom-right"> </div>
    </div>

    <main class="relative z-10 flex-1 flex flex-col items-center justify-center py-32 px-6">

      <div class="max-w-4xl w-full text-center mb-20 nytlex-reveal nytlex-reveal-up">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 shadow-lg text-xs font-bold text-slate-300 mb-6 uppercase tracking-widest">
          <ImageIcon :size="14" />
          <span>Brand Assets</span>
        </div>
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
          Nytlex.js <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Arts</span>
        </h1>
        <p class="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
          Logos, ícones e assets oficiais do framework. Sinta-se à vontade para usar em seus artigos, vídeos e projetos.
        </p>
      </div>

      <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

        <div
            v-for="(asset, idx) in brandAssets"
            :key="asset.id"
            class="group relative bg-[#0a0a0c] rounded-3xl p-6 shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] transition-all duration-500 flex flex-col nytlex-reveal nytlex-reveal-up"
            :style="{ animationDelay: `${idx * 100}ms` }"
        >
          <div :class="`relative w-full h-64 rounded-2xl ${asset.previewBg} shadow-inner flex items-center justify-center mb-6 overflow-hidden`">
            <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>

            <img :src="asset.url" :alt="asset.name" class="relative z-10 max-w-[60%] max-h-[60%] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
          </div>

          <div class="flex flex-col flex-1 justify-between">
            <div class="mb-6">
              <h3 class="text-2xl font-bold text-white mb-2">{{ asset.name }}</h3>
              <p class="text-sm text-slate-400">{{ asset.desc }}</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="flex-1 bg-black/50 shadow-inner rounded-xl px-4 py-3 flex items-center overflow-hidden">
                <span class="text-xs font-mono text-slate-500 truncate select-all">{{ asset.url }}</span>
              </div>

              <button
                  @click="copyToClipboard(asset.url)"
                  class="shrink-0 bg-white text-black p-3 rounded-xl font-bold shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                  title="Copiar URL"
              >
                <Check v-if="copiedUrl === asset.url" :size="18" class="text-green-600" />
                <Copy v-else :size="18" />
              </button>

              <a
                  :href="asset.url"
                  download
                  class="shrink-0 bg-[#161618] text-white p-3 rounded-xl shadow-lg hover:bg-white/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                  title="Baixar SVG"
              >
                <Download :size="18" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Container fixo para prender o background na viewport */
.fixed-bg-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* CSS do Grid Background e Animações com Opacidade Reduzida */
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
    opacity: 0.3; /* Aqui está o 0.3 que você pediu tlgd */
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
</style>
<script lang="ts">
import {Metadata} from "nytlex/vue";

export function generateMetadata(): Metadata {
  return {
    title: 'Nytlex.js | Arts'
  }
}
</script>