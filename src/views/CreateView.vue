<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { toast } from 'vue-sonner'
import UnSavedChangesWarning from '@/components/UnSavedChangesWarning.vue'
import { useRoute } from 'vue-router'
import { Camera, Plus, X } from '@lucide/vue'

const route = useRoute()
const isEditing = computed(() => Boolean(route.params.id))

// TODO: Replace with real data from Strapi (Units, Categories, DifficultyLevels)
const units = [
  { id: 1, name: 'грама', identifier: 'г' },
  { id: 2, name: 'милилитри', identifier: 'мл' },
  { id: 3, name: 'брой', identifier: 'бр' },
  { id: 4, name: 'чаена лъжица', identifier: 'ч.л.' },
  { id: 5, name: 'супена лъжица', identifier: 'с.л.' },
  { id: 6, name: 'щипка', identifier: 'щипка' },
  { id: 7, name: 'чаша', identifier: 'чаша' },
]

const categories = [
  { id: 1, name: 'Салати' },
  { id: 2, name: 'Основни' },
  { id: 3, name: 'Супи' },
  { id: 4, name: 'Десерти' },
  { id: 5, name: 'Разни' },
]

const difficultyLevels = [
  { id: 1, name: 'Лесно' },
  { id: 2, name: 'Средно' },
  { id: 3, name: 'Трудно' },
]

// --- Form State ---
interface Ingredient {
  name: string
  quantity: string
  unitId: string
  preparation: string
  rawText: string
}
const unSavedChanges = ref(false)
const form = reactive({
  title: '',
  instructions: '',
  prepTime: null as number | null,
  cookingTime: null as number | null,
  totalTime: null as number | null,
  selectedCategoryIds: [] as number[],
  selectedDifficultyId: null as number | null,
  images: [] as string[], // TODO: replace with actual file handling
})

const ingredients = reactive<Ingredient[]>([
  { name: '', quantity: '', unitId: '', preparation: '', rawText: '' },
])

// TODO: Wire up these functions
const addIngredient = () => {
  ingredients.push({ name: '', quantity: '', unitId: '', preparation: '', rawText: '' })
}

const removeIngredient = (index: number) => {
  ingredients.splice(index, 1)
}

const toggleCategory = (id: number) => {
  const idx = form.selectedCategoryIds.indexOf(id)
  if (idx === -1) {
    form.selectedCategoryIds.push(id)
  } else {
    form.selectedCategoryIds.splice(idx, 1)
  }
}

const handleSave = () => {
  unSavedChanges.value = false
  toast.success('Рецептата е запазена успешно!')
  // TODO: Build payload, POST to your backend API
  // Backend attaches submittedBy (current user UUID), then posts to Strapi
  console.log('Save recipe:', { form, ingredients })
}

const handleDelete = () => {
  unSavedChanges.value = false
  toast.error('Рецептата е изтрита успешно!')
  // TODO: Confirm dialog, then DELETE via backend API
  console.log('Delete recipe')
}

watch(
  [form, ingredients],
  () => {
    unSavedChanges.value = true
  },
  { deep: true },
)
</script>

<template>
  <div class="p-4 md:p-8 relative">
    <!-- Unsaved changes warning -->
    <UnSavedChangesWarning v-model="unSavedChanges" />

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
      <div>
        <h1 class="text-xl md:text-[1.75rem] font-bold text-brand-900 mb-1">
          {{ isEditing ? 'Редактирай Рецепта' : 'Създай Рецепта' }}
        </h1>
        <p class="text-brand-600 text-sm md:text-[0.95rem]">
          {{ isEditing ? 'Промени данните за рецептата.' : 'Попълни данните за новата рецепта.' }}
        </p>
      </div>
      <button
        class="disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300 shrink-0"
        @click="handleSave"
        :disabled="!unSavedChanges"
      >
        Запази
      </button>
    </div>

    <!-- Two-column layout -->
    <div class="flex flex-col lg:flex-row gap-6 items-start">
      <!-- LEFT: Main content -->
      <div class="flex-1 space-y-6 min-w-0">
        <!-- Title -->
        <div class="bg-white rounded-xl p-4 md:p-6 border border-brand-100 shadow-sm">
          <label class="block text-sm font-semibold text-brand-800 mb-2">Заглавие *</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="напр. Шопска салата"
            class="w-full rounded-lg border border-brand-200 px-4 py-2.5 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>

        <!-- Images -->
        <div class="bg-white rounded-xl p-4 md:p-6 border border-brand-100 shadow-sm">
          <label class="block text-sm font-semibold text-brand-800 mb-3">Снимки</label>
          <div class="flex gap-3 flex-wrap">
            <!-- Existing image placeholders -->
            <div
              v-for="(_, index) in form.images"
              :key="index"
              class="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-linear-to-br from-brand-100 to-brand-200 flex items-center justify-center relative group cursor-pointer"
            >
              <Camera :size="24" class="text-brand-400" />
              <div
                class="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span class="text-white text-xs font-semibold">Премахни</span>
              </div>
            </div>
            <!-- Add image button -->
            <button
              class="w-20 h-20 md:w-24 md:h-24 rounded-lg border-2 border-dashed border-brand-200 flex flex-col items-center justify-center text-brand-400 hover:border-brand-400 hover:text-brand-500 transition-colors"
            >
              <Plus :size="20" />
              <span class="text-[0.65rem] mt-1">Качи</span>
            </button>
          </div>
          <p class="text-xs text-brand-400 mt-2">Позволени формати: JPG, PNG, WEBP</p>
        </div>

        <!-- Ingredients -->
        <div class="bg-white rounded-xl p-4 md:p-6 border border-brand-100 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <label class="text-sm font-semibold text-brand-800">Продукти</label>
            <button
              class="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
              @click="addIngredient"
            >
              + Добави продукт
            </button>
          </div>

          <!-- Ingredient rows -->
          <div class="space-y-3">
            <div
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="flex flex-col sm:flex-row gap-2 items-start"
            >
              <p class="text-sm font-semibold text-brand-600 mt-1.5 hidden sm:block">
                {{ index + 1 }}.
              </p>
              <div class="flex gap-2 w-full sm:w-auto">
                <input
                  v-model="ingredient.quantity"
                  type="text"
                  placeholder="Кол."
                  class="w-20 rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                />
                <select
                  v-model="ingredient.unitId"
                  class="w-28 rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 cursor-pointer"
                >
                  <option value="" disabled>Единица</option>
                  <option v-for="unit in units" :key="unit.id" :value="unit.id">
                    {{ unit.identifier }}
                  </option>
                </select>
                <button
                  class="sm:hidden p-2 text-brand-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 ml-auto"
                  @click="removeIngredient(index)"
                >
                  <X :size="16" />
                </button>
              </div>
              <div class="flex gap-2 w-full sm:w-auto sm:flex-1">
                <input
                  v-model="ingredient.name"
                  type="text"
                  placeholder="Име на продукта *"
                  class="flex-1 min-w-0 rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                />
                <input
                  v-model="ingredient.preparation"
                  type="text"
                  placeholder="Подготовка"
                  class="w-full sm:w-40 rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                />
                <button
                  class="hidden sm:block p-2 text-brand-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  @click="removeIngredient(index)"
                >
                  <X :size="16" />
                </button>
              </div>
            </div>
          </div>

          <p v-if="ingredients.length === 0" class="text-sm text-brand-400 text-center py-4">
            Няма добавени продукти.
          </p>
        </div>

        <!-- Instructions (Richtext) -->
        <div class="bg-white rounded-xl p-4 md:p-6 border border-brand-100 shadow-sm">
          <label class="block text-sm font-semibold text-brand-800 mb-2">Начин на приготвяне</label>
          <p class="text-xs text-brand-400 mb-3">Опиши стъпките за приготвяне на рецептата.</p>
          <!-- TODO: Replace textarea with Tiptap rich text editor when connecting to Strapi -->
          <textarea
            v-model="form.instructions"
            rows="10"
            placeholder="1. Нарежете доматите и краставиците на кубчета...&#10;2. Добавете натрошеното сирене...&#10;3. Подправете със сол и зехтин..."
            class="w-full rounded-lg border border-brand-200 px-4 py-3 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 resize-y"
          ></textarea>
        </div>
      </div>

      <!-- RIGHT: Sidebar -->
      <div class="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-8">
        <!-- Publish -->
        <div class="bg-white rounded-xl p-5 border border-brand-100 shadow-sm">
          <h3 class="text-sm font-semibold text-brand-800 mb-3">Публикуване</h3>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span class="text-sm text-brand-700">Чернова</span>
          </div>
          <p class="text-xs text-brand-400 mt-1">Рецептата ще бъде прегледана преди публикуване.</p>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-xl p-5 border border-brand-100 shadow-sm">
          <h3 class="text-sm font-semibold text-brand-800 mb-3">Категории</h3>
          <div class="space-y-2">
            <label
              v-for="cat in categories"
              :key="cat.id"
              class="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                :checked="form.selectedCategoryIds.includes(cat.id)"
                class="w-4 h-4 rounded border-brand-300 text-brand-500 focus:ring-brand-300 accent-brand-500"
                @change="toggleCategory(cat.id)"
              />
              <span class="text-sm text-brand-700">{{ cat.name }}</span>
            </label>
          </div>
        </div>

        <!-- Difficulty -->
        <div class="bg-white rounded-xl p-5 border border-brand-100 shadow-sm">
          <h3 class="text-sm font-semibold text-brand-800 mb-3">Трудност</h3>
          <select
            v-model="form.selectedDifficultyId"
            class="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 cursor-pointer"
          >
            <option :value="null" disabled>Избери трудност</option>
            <option v-for="level in difficultyLevels" :key="level.id" :value="level.id">
              {{ level.name }}
            </option>
          </select>
        </div>

        <!-- Time -->
        <div class="bg-white rounded-xl p-5 border border-brand-100 shadow-sm">
          <h3 class="text-sm font-semibold text-brand-800 mb-3">Време</h3>
          <div class="grid grid-cols-3 sm:grid-cols-1 gap-3">
            <div>
              <label class="block text-xs font-medium text-brand-600 mb-1">Подготовка (мин)</label>
              <input
                v-model.number="form.prepTime"
                type="number"
                min="0"
                placeholder="0"
                class="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-brand-600 mb-1">Готвене (мин)</label>
              <input
                v-model.number="form.cookingTime"
                type="number"
                min="0"
                placeholder="0"
                class="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-brand-600 mb-1">Общо (мин)</label>
              <!-- TODO: Auto-calculate as prepTime + cookingTime, but allow manual override -->
              <input
                v-model.number="form.totalTime"
                type="number"
                min="0"
                placeholder="0"
                class="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-xl p-5 border border-brand-100 shadow-sm space-y-2">
          <button
            class="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300"
            @click="handleSave"
            :disabled="!unSavedChanges"
          >
            Запази
          </button>
          <button
            v-if="isEditing"
            class="disabled:opacity-50 disabled:cursor-not-allowed w-full px-4 py-2.5 bg-white text-red-600 font-semibold rounded-lg border border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
            @click="handleDelete"
          >
            Изтрий
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
