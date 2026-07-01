<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { user } from '@/data/user'
import UnSavedChangesWarning from '@/components/UnSavedChangesWarning.vue'
import { toast } from 'vue-sonner'

// --- Edit Profile ---
const isEditing = ref(false)
const unSavedChanges = ref(false)
const editForm = reactive({
  name: '',
  familyName: '',
  nickname: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
})

const startEdit = () => {
  editForm.name = user.name
  editForm.familyName = user.familyName
  editForm.nickname = user.nickname
  editForm.email = user.email
  editForm.phone = user.phone
  editForm.address = user.address
  editForm.city = user.city
  editForm.postalCode = user.postalCode
  editForm.country = user.country
  isEditing.value = true
  unSavedChanges.value = false
}

const saveEdit = () => {
  user.name = editForm.name
  user.familyName = editForm.familyName
  user.nickname = editForm.nickname
  user.email = editForm.email
  user.phone = editForm.phone
  user.address = editForm.address
  user.city = editForm.city
  user.postalCode = editForm.postalCode
  user.country = editForm.country
  isEditing.value = false
  unSavedChanges.value = false
  toast.success('Профила е обновен успешно!')
}
const cancelEdit = () => {
  isEditing.value = false
  unSavedChanges.value = false
}

// --- Password Change ---
const isChangingPassword = ref(false)
const passwordForm = reactive({
  current: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordError = ref('')

const startPasswordChange = () => {
  passwordForm.current = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  passwordError.value = ''
  isChangingPassword.value = true
}

const savePassword = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = 'Паролите не съвпадат!'
    return
  }
  // TODO: call API to change password
  isChangingPassword.value = false
  unSavedChanges.value = false
  toast.success('Паролата е променена успешно!')
}

const cancelPasswordChange = () => {
  isChangingPassword.value = false
  unSavedChanges.value = false
}

watch(
  editForm,
  () => {
    unSavedChanges.value = true
  },
  { deep: true },
)
watch(
  passwordForm,
  () => {
    if (isChangingPassword.value) unSavedChanges.value = true
  },
  { deep: true },
)
</script>

<template>
  <div class="p-4 md:p-8 relative">
    <!-- Unsaved changes warning -->
    <UnSavedChangesWarning v-model="unSavedChanges" />
    <!-- Header -->
    <div class="mb-6 md:mb-8">
      <h1 class="text-xl md:text-[1.75rem] font-bold text-brand-900 mb-1">Моят Профил</h1>
    </div>

    <div
      class="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-xl p-4 md:p-6 border border-brand-100 shadow-sm"
    >
      <!-- Upper summary profile -->
      <div class="flex-1 flex gap-2 items-center">
        <div
          class="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shrink-0"
        >
          {{ user.initials }}
        </div>
        <h2 class="text-lg font-semibold text-brand-900">{{ user.name }}</h2>
      </div>

      <div class="flex gap-2 shrink-0">
        <button
          v-if="!isEditing"
          class="px-4 py-2 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300"
          @click="startEdit"
        >
          Промени
        </button>
        <!-- Edit mode: two buttons -->
        <template v-else>
          <button
            @click="saveEdit"
            class="px-4 py-2 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            Запази
          </button>
          <button
            @click="cancelEdit"
            class="px-4 py-2 bg-white text-brand-700 font-semibold rounded-lg border border-brand-200 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            Отказ
          </button>
        </template>
      </div>
    </div>
    <!-- Personal information board -->
    <div class="mt-6 md:mt-8 bg-white rounded-xl p-4 md:p-6 border border-brand-100 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <h3 class="text-lg font-semibold text-brand-900">Лична информация</h3>
        <div class="sm:text-right">
          <p class="text-sm font-semibold text-brand-800">Роля</p>
          <p class="text-sm text-brand-600">{{ user.role }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-brand-800">Псевдоним</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.nickname }}</p>
          <input
            v-else
            v-model="editForm.nickname"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Име</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.name }}</p>
          <input
            v-else
            v-model="editForm.name"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Фамилия</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.familyName }}</p>
          <input
            v-else
            v-model="editForm.familyName"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Имейл</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.email }}</p>
          <input
            v-else
            v-model="editForm.email"
            type="email"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Телефон</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.phone }}</p>
          <input
            v-else
            v-model="editForm.phone"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Адрес</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.address }}</p>
          <input
            v-else
            v-model="editForm.address"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Град</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.city }}</p>
          <input
            v-else
            v-model="editForm.city"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Пощенски код</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.postalCode }}</p>
          <input
            v-else
            v-model="editForm.postalCode"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Държава</p>
          <p v-if="!isEditing" class="text-sm text-brand-600">{{ user.country }}</p>
          <input
            v-else
            v-model="editForm.country"
            type="text"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
      </div>
    </div>
    <!-- Password Change Section -->
    <div class="mt-6 md:mt-8 bg-white rounded-xl p-4 md:p-6 border border-brand-100 shadow-sm">
      <h3 class="text-lg font-semibold text-brand-900 mb-4">Промяна на парола</h3>

      <!-- Collapsed state -->
      <button
        v-if="!isChangingPassword"
        @click="startPasswordChange"
        class="px-4 py-2 bg-white text-brand-700 font-semibold rounded-lg border border-brand-200 hover:bg-brand-50"
      >
        Промени парола
      </button>

      <!-- Expanded form -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-semibold text-brand-800">Текуща парола</p>
          <input
            v-model="passwordForm.current"
            type="password"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Нова парола</p>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <div>
          <p class="text-sm font-semibold text-brand-800">Потвърди парола</p>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            class="mt-1 block w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
          />
        </div>
        <p v-if="passwordError" class="text-sm text-red-500 md:col-span-2">
          {{ passwordError }}
        </p>
        <div class="md:col-span-2 flex gap-2">
          <button
            @click="savePassword"
            class="px-4 py-2 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600"
          >
            Запази парола
          </button>
          <button
            @click="cancelPasswordChange"
            class="px-4 py-2 bg-white text-brand-700 font-semibold rounded-lg border border-brand-200 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            Отказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
