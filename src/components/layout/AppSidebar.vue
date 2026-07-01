<script setup lang="ts">
import { reactive } from 'vue'

const navItems = reactive([
  { icon: '🏠', label: 'Начало', active: true, path: '/' },
  { icon: '📝', label: 'Рецепти', active: false, path: 'recipe-manager' },
  { icon: '➕', label: 'Създай', active: false, path: 'create' },
  { icon: '👤', label: 'Профил', active: false, path: 'profile' },
])
</script>

<template>
  <aside class="w-62.5 min-h-screen bg-stone-900 text-white flex flex-col relative z-10">
    <div
      class="absolute inset-0 bg-[url('/bg-pattern.webp')] opacity-10 isolate pointer-events-none z-[-1]"
    ></div>
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-3 px-5 py-6 border-b border-amber-50">
      <img src="/zavecheria_logo.png" alt="logo" />
    </RouterLink>

    <!-- Navigation -->
    <nav class="flex-1 p-3">
      <ul>
        <li v-for="item in navItems" :key="item.label">
          <RouterLink
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 mb-1 text-stone-300 hover:bg-white/10 hover:text-white"
            exactActiveClass="bg-brand-500 text-white"
          >
            <span class="text-base w-6 text-center">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="p-3 border-t border-amber-50">
      <a
        href="#"
        class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-stone-300 hover:bg-white/10 hover:text-white transition-colors duration-150"
      >
        <span class="text-base w-6 text-center">🚪</span>
        <span>Изход</span>
      </a>
    </div>
  </aside>
</template>
