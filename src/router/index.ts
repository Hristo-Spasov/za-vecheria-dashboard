import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreateView from '@/views/CreateView.vue'
import RecipeManagerView from '@/views/RecipeManagerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'dashboard',component: DashboardView },
        { path: 'recipe-manager', name: 'recipe-manager',component: RecipeManagerView },
        { path: 'create', name: 'create',component: CreateView },
        { path: 'profile', name: 'profile',component: ProfileView },
      ]
    },
  ],
})

export default router