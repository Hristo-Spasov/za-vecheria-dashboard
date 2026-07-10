import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreateView from '@/views/CreateView.vue'
import RecipeManagerView from '@/views/RecipeManagerView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      alias: '/home',
      children: [
        { path: '', name: 'dashboard', component: DashboardView },
        { path: 'recipe-manager', name: 'recipe-manager', component: RecipeManagerView },
        { path: 'create', name: 'create', component: CreateView },
        { path: 'create/:id', name: 'edit-recipe', component: CreateView },
        { path: 'profile', name: 'profile', component: ProfileView },
      ],
    },
  ],
})
router.beforeEach(async (_to, _from) => {
  const store = useAuthStore()
  if (!store.isAuthenticated && !store.loading) {
    await store.fetchSession()
  }

  if (!store.isAuthenticated) {
    window.location.href = 'http://localhost:3000/auth/login'
    return false
  }
})

export default router
