<script setup lang="ts">
import "./style.css"
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';

// Ícones Lucide
import {
  Zap, Book, BookOpen, Package, ChevronLeft, ChevronRight, ChevronDown,
  Download, FileText, Settings, GitCompare, Github, Globe, Palette,
  Shield, Wrench, Code, Lock, Box, Workflow, Home, Search, Cog,
  Menu, X
} from 'lucide-vue-next';
import { Link } from "nytlex/vue";

import { sidebarConfig } from "@/web/lib/searchIndex";

import Navbar from "../../../../components/Navbar.vue";
import Footer from "../../../../components/Footer.vue";

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
    iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 98.1 118" style="enable-background:new 0 0 98.1 118;" xml:space="preserve">\n' +
        '<style type="text/css">\n' +
        '\t.st0{fill:#FF3E00;}\n' +
        '\t.st1{fill:#FFFFFF;}\n' +
        '</style>\n' +
        '<path class="st0" d="M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3  c-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1  c1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6"/>\n' +
        '<path class="st1" d="M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1  c3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72  c1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7  c-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5  c1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1  c-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1  c-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5  c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9"/>\n' +
        '</svg>'
  }
];

const getFrameworkData = (id: string) => availableFrameworks.find(f => f.id === id) || availableFrameworks[0];

// --- Configurações do Markdown e Shiki ---
const primaryColor = "#a8a8a8";
const generateId = (text: string) => String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

let highlighter: any = null;
const renderer = new marked.Renderer();

// Blidagem de Compatibilidade do Marked (v11- / v12+)
renderer.heading = (tokenOrText: any, depth?: any) => {
  const textContent = typeof tokenOrText === 'string' ? tokenOrText : (tokenOrText?.text || '');
  const level = typeof tokenOrText === 'string' ? depth : (tokenOrText?.depth || 1);
  const id = generateId(textContent);

  return `<h${level} id="${id}" class="group flex items-center gap-2">
            ${textContent}
            <a href="#${id}" class="opacity-0 group-hover:opacity-100 transition-opacity" style="color: ${primaryColor}">#</a>
          </h${level}>`;
};

renderer.code = (tokenOrText: any, paramLang?: any) => {
  const textContent = typeof tokenOrText === 'string' ? tokenOrText : (tokenOrText?.text || '');
  let validLanguage = typeof tokenOrText === 'string' ? paramLang : (tokenOrText?.lang || 'text');

  if (!validLanguage) validLanguage = 'text';
  if (validLanguage === 'vue' || validLanguage === 'svelte') {
    validLanguage = 'html';
  }

  let highlightedHTML = '';

  if (highlighter && highlighter.getLoadedLanguages().includes(validLanguage)) {
    highlightedHTML = highlighter.codeToHtml(textContent, {
      lang: validLanguage,
      theme: 'github-dark'
    });
  } else {
    const escapedText = String(textContent).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    highlightedHTML = `<pre><code>${escapedText}</code></pre>`;
  }

  // Previne injeção acidental de aspas duplas/simples no atributo data-code
  const safeCode = String(textContent).replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  return `
        <div class="font-jmono code-block my-8 group relative rounded-xl border border-white/5 bg-[#0a0a0c]">
            <div class="code-header flex justify-between items-center px-4 py-2 bg-white/[0.03] rounded-t-xl border-b border-white/5">
                <span class="text-[10px] uppercase tracking-widest font-bold text-zinc-500">${validLanguage}</span>
                <button class="copy-button p-1 text-zinc-600 hover:text-white transition-colors" onclick="navigator.clipboard.writeText(this.getAttribute('data-code'))" data-code="${safeCode}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
            </div>
            <div class="shiki-wrapper overflow-x-auto text-sm leading-relaxed p-6">
                ${highlightedHTML}
            </div>
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
const isMobileMenuOpen = ref(false);

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

watch(activeSection, () => {
  isMobileMenuOpen.value = false;
});

watch([activeSection, framework, isPrismReady], async () => {
  const currentItem = sidebarConfig.sections
      .flatMap(s => s.items)
      .find(i => i.id === activeSection.value);

  if (currentItem?.file) {
    const content = typeof currentItem.file === 'string'
        ? currentItem.file
        : (currentItem.file[framework.value as keyof typeof currentItem.file] || currentItem.file['react']);

    htmlContent.value = marked.parse(content) as string;

    const headingRegex = /^(#{1,2})\s+(.+)$/gm;
    const matches = [...content.matchAll(headingRegex)];
    headings.value = matches.map((m: any) => ({ id: generateId(m[2]), text: m[2], level: m[1].length }));

    if (typeof window !== 'undefined') {
      if(window.scrollTo) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}, { immediate: true });

let handlePopState: () => void;

onMounted(async () => {
  if (typeof window !== 'undefined') {
    highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: ['javascript', 'typescript', 'jsx', 'tsx', 'css', 'bash', 'json', 'markdown', 'html']
    });

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

      <div
          v-if="isMobileMenuOpen"
          @click="isMobileMenuOpen = false"
          class="fixed inset-0 bg-black/40 z-40 lg:hidden"
      ></div>

      <aside
          :class="[
          'z-50 flex flex-col flex-none overflow-hidden transition-transform duration-300',
          // Classes Mobile
          'fixed inset-y-0 left-0 w-[280px] sm:w-[320px] bg-[#0a0a0c] border-r border-white/10',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          // Classes Desktop
          'lg:static lg:translate-x-0 lg:z-20 lg:w-80 lg:min-w-80 lg:max-w-80 lg:h-[calc(100vh-8rem)] lg:mb-6 lg:ml-6 lg:sticky lg:top-24 lg:self-start lg:bg-transparent lg:border-none lg:rounded-2xl lg:shadow-2xl'
        ]"
      >
        <div class="lg:hidden flex justify-between items-center p-4 border-b border-white/5">
          <span class="text-sm font-bold text-white uppercase tracking-wider">Navigation</span>
          <button @click="isMobileMenuOpen = false" class="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5">
            <X :size="20" />
          </button>
        </div>

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
                <p class="text-sm font-bold text-white leading-none">{{ currentFrameworkData.label }}</p>
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

        <nav class="flex-1 min-h-0 px-4 py-6 overflow-y-auto overscroll-contain custom-scrollbar pb-20 lg:pb-6">
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
                <component :is="iconMap[item.icon] || FileText" size="18" :class="activeSection === item.id ? 'text-white' : 'group-hover:text-zinc-300 transition-colors'" />
                <span class="text-sm font-medium tracking-wide truncate">{{ item.label }}</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      <main class="relative z-10 flex-1 min-w-0 [clip-path:inset(0)]">

        <div class="pointer-events-none fixed-bg-container z-0">
          <div class="grid-background"> </div>
          <div class="grid-corner-circle circle-top-left"> </div>
          <div class="grid-corner-circle circle-bottom-right" > </div>
        </div>

        <div class="flex flex-col min-w-0 relative z-10">
          <div class="scroll-content-container relative z-10 flex-1 min-h-0">
            <div class="max-w-[900px] mx-auto px-6 md:px-8 py-8 md:py-16 min-w-0">

              <button
                  @click="isMobileMenuOpen = true"
                  class="lg:hidden flex items-center gap-2 text-zinc-300 hover:text-white mb-8 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/10 w-full transition-colors"
              >
                <Menu :size="18" />
                <span class="text-sm font-medium">Browse Documentation</span>
              </button>

              <article class="markdown-content bg-transparent prose prose-invert max-w-none">
                <div v-html="htmlContent"></div>
              </article>

              <footer class="mt-24 pt-12 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div v-if="getNavigationPages(activeSection).previous">
                  <Link
                      :href="getUrl(getNavigationPages(activeSection).previous!.id)"
                      class="block w-full p-6 rounded-2xl cursor-pointer bg-white/[0.08] border border-white/[0.05] hover:border-white/20 transition-all text-left group"
                  >
                    <span class="text-xs text-zinc-600 flex items-center gap-2 mb-2"><ChevronLeft :size="14" /> Previous</span>
                    <div class="text-zinc-400 font-bold group-hover:text-white transition-colors">{{ getNavigationPages(activeSection).previous!.label }}</div>
                  </Link>
                </div>
                <div v-else class="hidden md:block"></div>

                <div v-if="getNavigationPages(activeSection).next">
                  <Link
                      :href="getUrl(getNavigationPages(activeSection).next!.id)"
                      class="block w-full p-6 rounded-2xl cursor-pointer bg-white/[0.08] border border-white/[0.05] hover:border-white/20 transition-all text-right group"
                  >
                    <span class="text-xs text-zinc-600 flex items-center justify-end gap-2 mb-2">Next <ChevronRight :size="14" /></span>
                    <div class="text-zinc-400 font-bold group-hover:text-white transition-colors">{{ getNavigationPages(activeSection).next!.label }}</div>
                  </Link>
                </div>
                <div v-else class="hidden md:block"></div>
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
.shiki-wrapper pre {
  background: transparent !important;
  margin: 0 !important;
  padding: 0 !important;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}

.fixed-bg-container {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}

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
    opacity: 0.3;
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