<script setup lang="ts">
import { FileText, CheckCircle, Clock, XCircle, Utensils, Timer } from '@lucide/vue'
import { markRaw } from 'vue'

const stats = [
  { label: 'Рецепти', value: 12, icon: markRaw(FileText) },
  { label: 'Одобрени', value: 8, icon: markRaw(CheckCircle) },
  { label: 'Чакащи', value: 3, icon: markRaw(Clock) },
  { label: 'Отхвърлени', value: 1, icon: markRaw(XCircle) },
]

const recentActivity = [
  { action: 'Създаде', recipe: 'Шопска салата', time: 'преди 2 часа' },
  { action: 'Обнови', recipe: 'Мусака', time: 'преди 1 ден' },
  { action: 'Създаде', recipe: 'Боб чорба', time: 'преди 3 дни' },
  { action: 'Обнови', recipe: 'Шопска салата', time: 'преди 5 дни' },
]

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
</script>

<template>
  <div class="p-4 md:p-8">
    <!-- Welcome -->
    <div class="mb-6 md:mb-8">
      <h2 class="text-xl md:text-[1.75rem] font-bold text-brand-900 mb-1">
        Добре дошъл, Иванe! 👋
      </h2>
      <p class="text-brand-600 text-sm md:text-[0.95rem]">Ето какво се случва с твоите рецепти.</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl p-4 md:p-5 flex items-center gap-3 md:gap-4 border border-brand-100 shadow-sm"
      >
        <component :is="stat.icon" :size="24" class="text-brand-500 shrink-0" />
        <div class="flex flex-col">
          <span class="text-xl md:text-2xl font-bold text-brand-900">{{ stat.value }}</span>
          <span class="text-xs font-medium text-brand-600">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
      <!-- Activity -->
      <div class="bg-white rounded-xl p-5 md:p-6 border border-brand-100 shadow-sm">
        <h3 class="text-lg font-bold text-brand-900 mb-5">Последна активност</h3>
        <ul v-if="recentActivity.length > 0">
          <li
            v-for="(item, index) in recentActivity"
            :key="index"
            class="flex items-start gap-3 mb-4"
          >
            <div class="w-2 h-2 rounded-full bg-brand-500 mt-1.75 shrink-0"></div>
            <div class="flex flex-col">
              <span class="text-sm text-brand-800">
                {{ item.action }} <strong>{{ item.recipe }}</strong>
              </span>
              <span class="text-xs text-brand-400">{{ item.time }}</span>
            </div>
          </li>
        </ul>
        <p v-else class="text-sm text-brand-400">Няма активност.</p>
      </div>

      <!-- Recipes -->
      <div class="bg-white rounded-xl p-5 md:p-6 border border-brand-100 shadow-sm">
        <h3 class="text-lg font-bold text-brand-900 mb-5">Твоите рецепти</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="recipe in recipes"
            :key="recipe.id"
            class="border border-brand-100 rounded-[10px] overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <!-- Image placeholder -->
            <div
              class="h-25 bg-linear-to-br from-brand-100 to-brand-200 flex items-center justify-center"
            >
              <Utensils :size="32" class="text-brand-400" />
            </div>
            <!-- Info -->
            <div class="p-3">
              <h4 class="text-sm font-semibold text-brand-900 mb-1">{{ recipe.title }}</h4>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-brand-500 flex items-center gap-1">
                  <Timer :size="12" /> {{ recipe.time }}
                </span>
                <span class="text-xs font-semibold" :class="recipe.difficultyColor">
                  {{ recipe.difficulty }}
                </span>
              </div>
              <span
                class="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full inline-block"
                :class="
                  recipe.status === 'Одобрена'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                "
              >
                {{ recipe.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
