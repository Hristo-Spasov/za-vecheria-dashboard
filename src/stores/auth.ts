import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/userTypes'

const API_BASE = 'http://localhost:3000'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => user.value !== null)

  async function fetchSession() {
    loading.value = true
    try {
      const res = await fetch(`${API_BASE}/api/user/profile`, {
        credentials: 'include',
      })

      user.value = res.ok ? await res.json() : null

      const data = await res.json()
      user.value = data
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    window.location.href = `${API_BASE}/api/auth/signout`
  }

  return { user, loading, isAuthenticated, fetchSession, logout }
})
