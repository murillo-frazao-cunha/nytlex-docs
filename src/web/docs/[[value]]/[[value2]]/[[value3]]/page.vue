<script setup lang="ts">
import "./style.css"
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { marked } from 'marked';

// Ícones Lucide
import {
  Zap, Book, BookOpen, Package, ChevronLeft, ChevronRight, ChevronDown,
  Download, FileText, Settings, GitCompare, Github, Globe, Palette,
  Shield, Wrench, Code, Lock, Box, Workflow, Home, Search, Cog
} from 'lucide-vue-next';
import { Link } from "nytlex/vue";

import { sidebarConfig } from "@/web/lib/searchIndex";

import Navbar from "../../../../components/Navbar.vue";
import Footer from "../../../../components/Footer.vue";

// Props devem vir DEPOIS dos imports
const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});

// --- Configuração dos Frameworks Disponíveis ---
const availableFrameworks = [
  {
    id: 'react',
    label: 'React.js',
    iconHtml: '<svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-sky-400 w-full h-full"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>'
  },
  {
    id: 'vue',
    label: 'Vue.js',
    iconHtml: '<svg viewBox="0 0 128 128" class="text-emerald-400 w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" fill="#41B883"/><path d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" fill="#35495E"/></svg>'
  },
  {
    id: 'svelte',
    label: 'Svelte',
    iconHtml: '<svg viewBox="0 0 32 32" class="text-orange-500 w-full h-full" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M29.42 9.94c-1.39-1.58-3.41-2.46-5.55-2.42c-1.55.03-3.04.57-4.22 1.53l-3.34 2.71c-.44.36-.85.75-1.22 1.17c-.72.83-1.13 1.87-1.14 2.94c-.02 1.25.47 2.44 1.35 3.31a4.29 4.29 0 0 0 3.03 1.21c1.48 0 2.87-.58 3.93-1.64l.42-.42c.32-.32.32-.85 0-1.17c-.32-.32-.84-.32-1.16 0l-.42.42c-.74.74-1.72 1.15-2.78 1.15c-1.03 0-1.99-.39-2.72-1.1c-.65-.63-1.01-1.47-.95-2.22c.01-.74.31-1.44.84-1.99c.28-.29.58-.55.91-.79l3.32-2.69c.88-.72 1.99-1.12 3.13-1.14c1.56-.03 3.03.62 4.05 1.77c.93 1.05 1.41 2.4 1.35 3.82a5.53 5.53 0 0 1-1.56 3.52l-5.69 5.73c-1.9 1.91-4.43 2.97-7.1 2.98c-2.5.01-4.88-.93-6.69-2.66c-1.74-1.66-2.73-3.88-2.8-6.26c-.07-2.43.82-4.76 2.5-6.53l2.91-3.1a.85.85 0 0 1 1.21.01c.33.32.34.85.02 1.18l-2.9 3.08c-1.22 1.29-1.87 2.98-1.82 4.76c.05 1.73.77 3.35 2.04 4.56c1.32 1.26 3.06 1.95 4.88 1.94c1.95-.01 3.79-.78 5.17-2.17l5.7-5.75c1.17-1.18 1.84-2.78 1.88-4.45c.04-1.85-.38-3.63-1.22-5.16zM8.35 23.36c1.4 1.58 3.41 2.46 5.55 2.42c1.55-.03 3.04-.57 4.22-1.53l3.34-2.71c.44-.36.85-.75 1.22-1.17c.72-.83 1.13-1.87 1.14-2.94c.02-1.25-.47-2.44-1.35-3.31a4.29 4.29 0 0 0-3.03-1.21c-1.48 0-2.87.58-3.93 1.64l-.42.42c-.32.32-.32.85 0 1.17c.32.32.84.32 1.16 0l.42-.42c.74-.74 1.72-1.15 2.78-1.15c1.03 0 1.99.39 2.72 1.1c.65.63 1.01 1.47.95 2.22c-.01.74-.31 1.44-.84 1.99c-.28.29-.58.55-.91.79l-3.32 2.69c-.88.72-1.99 1.12-3.13 1.14c-1.56-.03-3.03-.62-4.05-1.77c-.93-1.05-1.41-2.4-1.35-3.82a5.53 5.53 0 0 1 1.56-3.52l5.69-5.73c1.9-1.91 4.43-2.97 7.1-2.98c2.5-.01 4.88.93 6.69 2.66c1.74 1.66 2.73 3.88 2.8 6.26c.07 2.43-.82 4.76-2.5 6.53l-2.91 3.1a.85.85 0 0 1-1.21-.01c-.33-.32-.34-.85-.02-1.18l2.9-3.08c1.22-1.29 1.87 2.98 1.82-4.76c-.05-1.73-.77-3.35-2.04-4.56c-1.32-1.26-3.06-1.95-4.88-1.94c-1.95.01-3.79-.78-5.17 2.17l-5.7 5.75c-1.17 1.18-1.84-2.78-1.88-4.45c-.04 1.85.38 3.63 1.22 5.16z"/></svg>'
  }
];

const getFrameworkData = (id: string) => availableFrameworks.find(f => f.id === id) || availableFrameworks[0];

// --- Configurações do Markdown e Prism ---
const primaryColor = "#a8a8a8";
const generateId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

let prismInstance: any = null;
const renderer = new marked.Renderer();

renderer.heading = ({ text, depth }: any) => {
  const id = generateId(text);
  return `<h${depth} id="${id}" class="group flex items-center gap-2">
            ${text}
            <a href="#${id}" class="opacity-0 group-hover:opacity-100 transition-opacity" style="color: ${primaryColor}">#</a>
          </h${depth}>`;
};

renderer.code = ({ text, lang }: any) => {
  let validLanguage = lang || 'plaintext';

  if (prismInstance && !prismInstance.languages[validLanguage]) {
    validLanguage = 'plaintext';
  }

  let highlighted = text;
  if (prismInstance && prismInstance.languages[validLanguage]) {
    highlighted = prismInstance.highlight(text, prismInstance.languages[validLanguage], validLanguage);
  } else {
    highlighted = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
  }

  return `
        <div class="font-jmono code-block my-8 group relative rounded-xl border border-white/5 bg-[#0a0a0c]">
            <div class="code-header flex justify-between items-center px-4 py-2 bg-white/[0.03] rounded-t-xl border-b border-white/5">
                <span class="text-[10px] uppercase tracking-widest font-bold text-zinc-500">${lang || 'text'}</span>
                <button class="copy-button p-1 text-zinc-600 hover:text-white transition-colors" onclick="navigator.clipboard.writeText(this.getAttribute('data-code'))" data-code="${text.replace(/"/g, '&quot;')}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
            </div>
            <pre class="language-${validLanguage} !bg-transparent !m-0 !p-6 overflow-x-auto text-sm leading-relaxed"><code class="language-${validLanguage}">${highlighted}</code></pre>
        </div>
    `;
};

marked.setOptions({ renderer });

const iconMap: { [key: string]: any } = {
  FaCube: Box,
  FaDiagramProject: Workflow,
  FaHome: Home,
  FaDownload: Download,
  FaFile: FileText,
  FaCode: Code,
  FaCodeCompare: GitCompare,
  FaWrench: Wrench,
  FaBookOpen: BookOpen,
  FaGear: Settings,
  FaPalette: Palette,
  FaGlobe: Globe,
  FaBolt: Zap,
  FaBox: Package,
  FaBook: Book,
  FaShield: Shield,
  FaLock: Lock,
  FaCog: Cog
};

// --- Component Logic ---

const brand = computed(() => props.params.value || 'nytlex');
// Verifica se o value2 bate com a id de algum dos frameworks da nossa lista
const isFrameworkParam = computed(() => availableFrameworks.some(f => f.id === props.params.value2));

const initialFramework = isFrameworkParam.value ? props.params.value2 : 'react';
const initialPageId = isFrameworkParam.value ? (props.params.value3 || 'introduction') : (props.params.value2 || 'introduction');

const activeSection = ref(initialPageId as string);
const framework = ref<string>(initialFramework);
const currentFrameworkData = computed(() => getFrameworkData(framework.value));

const htmlContent = ref('');
const headings = ref<any[]>([]);
const isDropdownOpen = ref(false);
const isPrismReady = ref(false);

const getAllPages = () => {
  return sidebarConfig.sections.flatMap(section => section.items);
};

const getNavigationPages = (currentId: string) => {
  const allPages = getAllPages();
  const currentIndex = allPages.findIndex(page => page.id === currentId);
  return {
    previous: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null
  };
};

const getUrl = (itemId: string, newFramework?: string): string => {
  const targetFramework = newFramework || framework.value;
  let newUrl = `/docs/${brand.value}/${itemId}`;
  if (isFrameworkParam.value || newFramework) {
    newUrl = `/docs/${brand.value}/${targetFramework}/${itemId}`;
  }

  return newUrl
};

watch([activeSection, framework, isPrismReady], async () => {
  const currentItem = sidebarConfig.sections
      .flatMap(s => s.items)
      .find(i => i.id === activeSection.value);

  if (currentItem?.file) {
    // Procura a versão do framework selecionado ou cai de volta pra react/string base
    const content = typeof currentItem.file === 'string'
        ? currentItem.file
        : (currentItem.file[framework.value] || currentItem.file['react']);

    htmlContent.value = marked.parse(content) as string;

    const headingRegex = /^(#{1,2})\s+(.+)$/gm;
    const matches = [...content.matchAll(headingRegex)];
    headings.value = matches.map((m: any) => ({ id: generateId(m[2]), text: m[2], level: m[1].length }));

    if (typeof window !== 'undefined' && prismInstance) {
      await nextTick();
      prismInstance.highlightAll();

      if(window.scrollTo) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}, { immediate: true });

let handlePopState: () => void;

onMounted(async () => {
  if (typeof window !== 'undefined') {
    const PrismModule = await import('prismjs');
    prismInstance = PrismModule.default || PrismModule;

    await import('prismjs/components/prism-javascript');
    await import('prismjs/components/prism-typescript');
    await import('prismjs/components/prism-jsx');
    await import('prismjs/components/prism-tsx');
    await import('prismjs/components/prism-css');
    await import('prismjs/components/prism-bash');
    await import('prismjs/components/prism-json');
    await import('prismjs/components/prism-markdown');
    await import('prismjs/components/prism-markup');

    // Mapeamento seguro para frameworks usarem HTML highlight de base
    if (prismInstance.languages.markup) {
      prismInstance.languages.vue = prismInstance.languages.markup;
      prismInstance.languages.svelte = prismInstance.languages.markup;
    }

    isPrismReady.value = true;

    handlePopState = () => {
      const pathParts = window.location.pathname.split('/').filter(Boolean);

      if (pathParts.length >= 3) {
        const possibleFramework = pathParts[2];
        const possiblePageId = pathParts[3];

        if (availableFrameworks.some(f => f.id === possibleFramework)) {
          framework.value = possibleFramework;
          if (possiblePageId) {
            activeSection.value = possiblePageId;
          }
        } else {
          activeSection.value = possibleFramework;
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined' && handlePopState) {
    window.removeEventListener('popstate', handlePopState);
  }
});

</script>

<template>
  <div class="font-dm relative min-h-screen bg-black text-slate-400 selection:bg-white/10 isolate flex flex-col">

    <div class="relative z-10 flex flex-1 min-w-0 bg-transparent">
      <aside class="z-20 w-80 min-w-80 max-w-80 h-[calc(100vh-8rem)] mb-6 ml-6 sticky top-24 self-start hidden lg:flex flex-col rounded-2xl flex-none overflow-hidden shadow-2xl">

        <div class="p-4 border-b border-white/5 relative">
          <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="w-full cursor-pointer flex items-center justify-between p-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-xl transition-all group"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shadow-inner p-1.5" v-html="currentFrameworkData.iconHtml">
              </div>
              <div class="text-left">
                <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Using Framework</p>
                <p class="text-sm font-bold text-white leading-none capitalize">{{ currentFrameworkData.label }}</p>
              </div>
            </div>
            <ChevronDown :size="12" :class="`text-zinc-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`" />
          </button>

          <div v-if="isDropdownOpen" class="absolute top-[calc(100%-8px)] left-4 right-4 z-50 mt-2 p-1 bg-[#0f0f11] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl">
            <Link
                :href="getUrl(activeSection, fw.id)"
                v-for="fw in availableFrameworks"
                :key="fw.id"
                :class="`w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${framework === fw.id ? 'bg-white/5 text-white' : 'hover:bg-white/[0.03] text-zinc-400'}`"
            >
              <div class="w-4 h-4 flex items-center justify-center" v-html="fw.iconHtml"></div>
              <span class="text-sm font-medium">{{ fw.label }}</span>
            </Link>
          </div>
        </div>

        <nav class="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
          <div v-for="(section, idx) in sidebarConfig.sections" :key="idx" class="mb-8">
            <h3 class="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">
              {{ section.title }}
            </h3>
            <div class="space-y-1">
              <Link
                  :href="getUrl(item.id)"
                  v-for="item in section.items"
                  :key="item.id"
                  :class="`w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                  activeSection === item.id
                    ? 'bg-white/5 text-white ring-1 ring-white/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)]'
                    : 'hover:bg-white/[0.03] text-zinc-500 hover:text-zinc-200'
                }`"
              >
                <component :is="iconMap[item.icon] || FileText" :size="18" :class="activeSection === item.id ? 'text-white' : 'group-hover:text-zinc-300 transition-colors'" />
                <span class="text-sm font-medium tracking-wide truncate">{{ item.label }}</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Adicionado h-full e container de clipagem para segurar o fundo fixo sem vazar -->
      <main class="relative z-10 flex-1 min-w-0 [clip-path:inset(0)]">

        <!-- Alterado para fixed-container de modo a travar o scroll do background -->
        <div class="pointer-events-none fixed-bg-container z-0">
          <div class="grid-background"> </div>
          <div class="grid-corner-circle circle-top-left"> </div>
          <div class="grid-corner-circle circle-bottom-right" > </div>
        </div>

        <div class="flex flex-col min-w-0 relative z-10">
          <div class="scroll-content-container relative z-10 flex-1 min-h-0">
            <div class="max-w-[900px] mx-auto px-8 py-16 min-w-0">
              <article class="markdown-content bg-transparent prose prose-invert max-w-none">
                <div v-html="htmlContent"></div>
              </article>

              <footer class="mt-24 pt-12 border-t border-white/[0.05] grid grid-cols-2 gap-8">
                <div v-if="getNavigationPages(activeSection).previous">
                  <Link
                      :href="getUrl(getNavigationPages(activeSection).previous!.id)"
                      class="block w-full p-6 rounded-2xl cursor-pointer bg-white/[0.08] border border-white/[0.05] hover:border-white/20 transition-all text-left group"
                  >
                    <span class="text-xs text-zinc-600 flex items-center gap-2 mb-2"><ChevronLeft :size="14" /> Previous</span>
                    <div class="text-zinc-400 font-bold group-hover:text-white transition-colors">{{ getNavigationPages(activeSection).previous!.label }}</div>
                  </Link>
                </div>
                <div v-else></div>

                <div v-if="getNavigationPages(activeSection).next">
                  <Link
                      :href="getUrl(getNavigationPages(activeSection).next!.id)"
                      class="block w-full p-6 rounded-2xl cursor-pointer bg-white/[0.08] border border-white/[0.05] hover:border-white/20 transition-all text-right group"
                  >
                    <span class="text-xs text-zinc-600 flex items-center justify-end gap-2 mb-2">Next <ChevronRight :size="14" /></span>
                    <div class="text-zinc-400 font-bold group-hover:text-white transition-colors">{{ getNavigationPages(activeSection).next!.label }}</div>
                  </Link>
                </div>
                <div v-else></div>
              </footer>
            </div>
          </div>
        </div>
      </main>

      <aside class="z-20 w-72 min-w-72 max-w-72 h-[calc(100vh-8rem)] mb-6 mr-6 sticky top-24 self-start hidden xl:flex flex-col flex-none bg-black backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
        <div class="h-full p-8 overflow-y-auto custom-scrollbar">
          <div class="space-y-8">
            <div>
              <h4 class="text-[10px] font-bold text-zinc-200 uppercase tracking-widest mb-6 border-l-2 pl-4 border-zinc-700">On this page</h4>
              <div class="space-y-4">
                <a
                    v-for="(h, i) in headings"
                    :key="i"
                    :href="`#${h.id}`"
                    :class="`block text-sm transition-colors hover:text-white ${h.level > 1 ? 'ml-4 text-zinc-600' : 'text-zinc-500 font-medium'}`"
                >
                  {{ h.text }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
pre[class*="language-"] {
  background: transparent !important;
  text-shadow: none !important;
}

.code-block pre {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

/* Container fixo para prender o background na viewport e respeitar os limites do main */
.fixed-bg-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* CSS do Grid Background e Animações - Adicionado do component Landing */
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
    opacity: 0.3; /* <-- Diminua aqui (Ex: 0.2 ou 0.1 para ficar bem sutil) */
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

<script lang="ts">
import { Metadata } from "nytlex/vue";

export function generateMetadata(params: any): Metadata {
  const validFrameworks = ['react', 'vue', 'svelte'];
  const isFrameworkParam = validFrameworks.includes(params?.value2);
  const pageId = isFrameworkParam ? (params?.value3 || 'introduction') : (params?.value2 || 'introduction');

  const currentItem = sidebarConfig.sections.flatMap(s => s.items).find(i => i.id === pageId);
  return {
    title: `Docs | ${currentItem?.label || 'Documentation'}`
  }
}
</script>