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

      if (!res.ok) {
        user.value = null
        return
      }
      const data = await res.json()
      user.value = data
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      const csrfRes = await fetch(`${API_BASE}/api/auth/csrf`, { credentials: 'include' })
      const { csrfToken } = await csrfRes.json()
      await fetch(`${API_BASE}/api/auth/signout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `csrfToken=${encodeURIComponent(csrfToken)}`,
      })
    } catch {
      user.value = null
    }

    user.value = null
    window.location.href = 'http://localhost:3000/auth/login'
  }

  return { user, loading, isAuthenticated, fetchSession, logout }
})
