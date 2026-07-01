<script setup lang="ts">
import { Home, BookOpen, PlusCircle, User, LogOut } from '@lucide/vue'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const navItems = [
  { icon: Home, label: 'Начало', path: '/' },
  { icon: BookOpen, label: 'Рецепти', path: 'recipe-manager' },
  { icon: PlusCircle, label: 'Създай', path: 'create' },
  { icon: User, label: 'Профил', path: 'profile' },
]
</script>

<template>
  <!-- Mobile backdrop -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-40 md:hidden" @click="$emit('close')"></div>

  <!-- Sidebar -->
  <aside
    class="fixed md:static inset-y-0 left-0 z-50 w-62.5 min-h-screen bg-stone-900 text-white flex flex-col transition-transform duration-300 md:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div
      class="absolute inset-0 bg-[url('/bg-pattern.webp')] opacity-10 isolate pointer-events-none z-[-1]"
    ></div>
    <!-- Logo -->
    <RouterLink
      to="/"
      class="flex items-center gap-3 px-5 py-6 border-b border-amber-50"
      @click="$emit('close')"
    >
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
            @click="$emit('close')"
          >
            <component :is="item.icon" :size="18" class="w-6 text-center" />
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
        <LogOut :size="18" class="w-6 text-center" />
        <span>Изход</span>
      </a>
    </div>
  </aside>
</template>
