<script setup lang="ts">
import { ref, computed } from 'vue'
import { recipes } from '@/data/recipes'
import type { Recipe } from '@/data/recipes'
import RecipeCard from '@/components/RecipeCard.vue'

const searchQuery = ref('')
const selectedCategory = ref('Всички')
const selectedStatus = ref('Всички')

const categories = computed(() => {
  const cats = [...new Set(recipes.map((r) => r.category))]
  return ['Всички', ...cats]
})

const statuses = computed(() => {
  const stats = [...new Set(recipes.map((r) => r.status))]
  return ['Всички', ...stats]
})

const filteredRecipes = computed(() => {
  return recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'Всички' || recipe.category === selectedCategory.value
    const matchesStatus =
      selectedStatus.value === 'Всички' || recipe.status === selectedStatus.value
    return matchesSearch && matchesCategory && matchesStatus
  })
})

const handleCardClick = (recipe: Recipe) => {
  // TODO: navigate to recipe detail or open side panel
  console.log('Clicked recipe:', recipe.title)
}
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-[1.75rem] font-bold text-brand-900 mb-1">Рецепти</h1>
        <p class="text-brand-600 text-[0.95rem]">
          Управлявай своите рецепти — общо {{ recipes.length }}
        </p>
      </div>
      <button
        class="px-4 py-2 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300"
      >
        + Нова рецепта
      </button>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center gap-4 mb-6">
      <!-- Search -->
      <div class="flex-1 relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Търси рецепта..."
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-200 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 bg-white"
        />
      </div>

      <!-- Category filter -->
      <select
        v-model="selectedCategory"
        class="px-3 py-2 rounded-lg border border-brand-200 text-sm text-brand-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 cursor-pointer"
      >
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <!-- Status filter -->
      <select
        v-model="selectedStatus"
        class="px-3 py-2 rounded-lg border border-brand-200 text-sm text-brand-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 cursor-pointer"
      >
        <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
      </select>
    </div>

    <!-- Recipe Grid -->
    <div v-if="filteredRecipes.length" class="grid grid-cols-4 gap-5">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @click="handleCardClick"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
      <span class="text-5xl mb-4">🍽️</span>
      <p class="text-brand-600 text-sm">Няма намерени рецепти.</p>
      <p class="text-brand-400 text-xs mt-1">Опитай с различни филтри или търсене.</p>
    </div>
  </div>
</template>
