<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, User, ExternalLink, LogOut, UserCircle } from '@lucide/vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

defineEmits<{
  toggleSidebar: []
}>()

const router = useRouter()
const { user, logout } = useAuthStore()

const menuOpen = ref(false)
const menuRef = ref<HTMLDivElement | null>(null)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const goToProfile = () => {
  menuOpen.value = false
  router.push('/profile')
}

const handleLogout = () => {
  menuOpen.value = false
  logout()
}

const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <header
    class="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b border-brand-100 relative z-10"
  >
    <div
      class="absolute inset-0 bg-[url('/bg-pattern.webp')] opacity-10 isolate pointer-events-none z-[-1]"
    ></div>
    <!-- Left side: hamburger + link to main app -->
    <div class="flex items-center gap-3">
      <button
        class="md:hidden p-2 rounded-lg text-brand-700 hover:bg-brand-50 transition-colors"
        @click="$emit('toggleSidebar')"
      >
        <Menu :size="22" />
      </button>
      <a
        href="http://localhost:3000/main"
        class="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors shadow-sm"
      >
        <ExternalLink :size="16" />
        <span>Към сайта</span>
      </a>
    </div>
    <!-- Right side: user dropdown -->
    <div ref="menuRef" class="relative">
      <button class="flex items-center gap-2 cursor-pointer" @click="toggleMenu">
        <span class="text-sm font-semibold text-brand-800">
          {{ user?.nickname || user?.name || 'Потребител' }}
        </span>
        <div
          class="w-10 h-10 rounded-full bg-brand-500 text-white flex overflow-hidden items-center justify-center font-bold text-sm"
        >
          <img
            v-if="user?.avatarUrl"
            :src="user.avatarUrl"
            :alt="user?.name || ''"
            class="w-full h-full object-cover"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
          <User v-else :size="18" />
        </div>
      </button>

      <!-- Dropdown -->
      <Transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="menuOpen"
          class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-brand-100 py-1 z-50"
        >
          <button
            class="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-brand-700 hover:bg-brand-50 transition-colors text-left"
            @click="goToProfile"
          >
            <UserCircle :size="16" />
            <span>Профил</span>
          </button>
          <button
            class="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
            @click="handleLogout"
          >
            <LogOut :size="16" />
            <span>Изход</span>
          </button>
        </div>
      </Transition>
    </div>
  </header>
</template>
