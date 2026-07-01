<script setup lang="ts">
import type { Recipe } from '@/data/recipes'

defineProps<{
  recipe: Recipe
}>()

defineEmits<{
  click: [recipe: Recipe]
}>()
</script>

<template>
  <div
    class="border border-brand-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white"
    @click="$emit('click', recipe)"
  >
    <!-- Image placeholder -->
    <div class="h-32 bg-linear-to-br from-brand-100 to-brand-200 flex items-center justify-center">
      <span class="text-5xl">{{ recipe.imagePlaceholder }}</span>
    </div>
    <!-- Info -->
    <div class="p-4">
      <div class="flex items-start justify-between mb-1">
        <h4 class="text-sm font-semibold text-brand-900">{{ recipe.title }}</h4>
        <span
          class="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2"
          :class="
            recipe.status === 'Одобрена'
              ? 'bg-green-100 text-green-600'
              : recipe.status === 'Чакаща'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-red-100 text-red-600'
          "
        >
          {{ recipe.status }}
        </span>
      </div>
      <p class="text-xs text-brand-500 mb-3 line-clamp-2">{{ recipe.description }}</p>
      <div class="flex items-center justify-between">
        <span class="text-xs text-brand-500">⏱️ {{ recipe.time }}</span>
        <span class="text-xs font-semibold" :class="recipe.difficultyColor">
          {{ recipe.difficulty }}
        </span>
      </div>
      <div class="mt-2 flex items-center gap-1">
        <span class="text-xs text-brand-400">{{ recipe.category }}</span>
        <span class="text-xs text-brand-300">•</span>
        <span class="text-xs text-brand-400">{{ recipe.servings }} порции</span>
      </div>
    </div>
  </div>
</template>
