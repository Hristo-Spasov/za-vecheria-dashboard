<script setup lang="ts">
const user = {
  name: 'Иван',
  avatar: null as string | null,
  initials: 'ИП',
}
</script>

<template>
  <header class="flex items-center justify-between px-8 py-4 bg-white border-b border-brand-100 relative z-10">
    <div className="absolute inset-0 bg-[url('/bg-pattern.webp')] opacity-10 isolate pointer-events-none z-[-1]"></div>
    <h1 class="text-2xl font-bold text-brand-900 m-0">Табло</h1>

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