<script setup lang="ts">
import { user } from '@/data/user'
import { Menu } from '@lucide/vue'

defineEmits<{
  toggleSidebar: []
}>()
</script>

<template>
  <header
    class="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-brand-100 relative z-10"
  >
    <div
      class="absolute inset-0 bg-[url('/bg-pattern.webp')] opacity-10 isolate pointer-events-none z-[-1]"
    ></div>
    <!-- Hamburger (mobile only) -->
    <button
      class="md:hidden p-2 rounded-lg text-brand-700 hover:bg-brand-50 transition-colors"
      @click="$emit('toggleSidebar')"
    >
      <Menu :size="22" />
    </button>
    <!-- Spacer for desktop -->
    <div class="hidden md:block"></div>
    <div class="flex items-center gap-3">
      <span class="text-sm font-semibold text-brand-800">{{ user.name }}</span>
      <div
        class="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm"
      >
        {{ user.initials }}
      </div>
    </div>
  </header>
</template>
