<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import { Toaster } from 'vue-sonner'
// import { useAuthStore } from '@/stores/auth'

const isSidebarOpen = ref(false)
// const { isAuthenticated } = useAuthStore()

// console.log(isAuthenticated)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="flex min-h-screen bg-brand-50">
    <AppSidebar :is-open="isSidebarOpen" @close="closeSidebar" />
    <div class="flex-1 flex flex-col min-w-0">
      <Toaster position="top-center" richColors />
      <AppHeader @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
