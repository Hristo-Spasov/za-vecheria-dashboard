<script setup lang="ts">
import { ref, computed } from 'vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { Search, X, UtensilsCrossed } from '@lucide/vue'

const recipes = [
  {
    id: 1,
    title: 'Шопска салата',
    difficulty: 'Лесно',
    difficultyColor: 'text-green-500',
    time: '15 мин',
    status: 'Одобрена',
  },
  {
    id: 2,
    title: 'Мусака',
    difficulty: 'Средно',
    difficultyColor: 'text-orange-500',
    time: '90 мин',
    status: 'Одобрена',
  },
  {
    id: 3,
    title: 'Боб чорба',
    difficulty: 'Лесно',
    difficultyColor: 'text-green-500',
    time: '120 мин',
    status: 'Чакаща',
  },
  {
    id: 4,
    title: 'Каварма',
    difficulty: 'Трудно',
    difficultyColor: 'text-red-500',
    time: '75 мин',
    status: 'Одобрена',
  },
  {
    id: 5,
    title: 'Пълнени чушки',
    difficulty: 'Средно',
    difficultyColor: 'text-orange-500',
    time: '60 мин',
    status: 'Чакаща',
  },
  {
    id: 6,
    title: 'Таратор',
    difficulty: 'Лесно',
    difficultyColor: 'text-green-500',
    time: '10 мин',
    status: 'Одобрена',
  },
]

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
  <div class="p-4 md:p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
      <div>
        <h1 class="text-xl md:text-[1.75rem] font-bold text-brand-900 mb-1">Рецепти</h1>
        <p
          v-if="searchQuery || selectedCategory != 'Всички' || selectedStatus != 'Всички'"
          class="text-brand-600 text-sm md:text-[0.95rem]"
        >
          Управлявай своите рецепти — Показани {{ filteredRecipes.length }} от
          {{ recipes.length }} рецепти
        </p>
        <p v-else class="text-brand-600 text-sm md:text-[0.95rem]">
          Управлявай своите рецепти — общо {{ recipes.length }} рецепти
        </p>
      </div>
      <RouterLink
        to="create"
        class="px-4 py-2 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300 text-center sm:text-left shrink-0"
      >
        + Нова рецепта
      </RouterLink>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
      <!-- Search -->
      <div class="flex-1 relative">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Търси рецепта..."
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-200 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 bg-white"
        />
      </div>

      <div class="flex gap-3 sm:gap-4">
        <!-- Category filter -->
        <select
          v-model="selectedCategory"
          class="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-brand-200 text-sm text-brand-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 cursor-pointer"
        >
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <!-- Status filter -->
        <select
          v-model="selectedStatus"
          class="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-brand-200 text-sm text-brand-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 cursor-pointer"
        >
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- Filter badges -->
    <div
      v-if="searchQuery || selectedCategory != 'Всички' || selectedStatus != 'Всички'"
      class="flex flex-wrap gap-2 mb-6"
    >
      <span
        v-if="searchQuery"
        class="px-3 py-1 bg-brand-100 text-brand-600 text-sm rounded-full flex items-center justify-center"
      >
        {{ searchQuery }}
        <button
          @click="searchQuery = ''"
          class="ml-2 w-5 h-5 flex items-center justify-center text-brand-400 hover:text-brand-600 focus:outline-none"
        >
          <X :size="14" />
        </button>
      </span>
      <span
        v-if="selectedCategory != 'Всички'"
        class="px-3 py-1 bg-brand-100 text-brand-600 text-sm rounded-full flex items-center justify-center"
      >
        Категория: {{ selectedCategory }}
        <button
          @click="selectedCategory = 'Всички'"
          class="ml-2 w-5 h-5 flex items-center justify-center text-brand-400 hover:text-brand-600 focus:outline-none"
        >
          <X :size="14" />
        </button>
      </span>
      <span
        v-if="selectedStatus != 'Всички'"
        class="px-3 py-1 bg-brand-100 text-brand-600 text-sm rounded-full flex items-center justify-center"
      >
        Статус: {{ selectedStatus }}
        <button
          @click="selectedStatus = 'Всички'"
          class="ml-2 w-5 h-5 flex items-center justify-center text-brand-400 hover:text-brand-600 focus:outline-none"
        >
          <X :size="14" />
        </button>
      </span>
    </div>

    <!-- Recipe Grid -->
    <div
      v-if="filteredRecipes.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
    >
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
        @click="handleCardClick"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-16 text-center">
      <UtensilsCrossed :size="48" class="text-brand-300 mb-4" />
      <p class="text-brand-600 text-sm">Няма намерени рецепти.</p>
      <p class="text-brand-400 text-xs mt-1">Опитай с различни филтри или търсене.</p>
    </div>
  </div>
</template>
