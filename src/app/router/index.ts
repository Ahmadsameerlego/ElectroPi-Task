import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/constants'

const routes = [
  {
    path: ROUTES.HOME,
    redirect: ROUTES.TASKS
  },
  {
    path: ROUTES.TASKS,
    name: 'tasks',
    component: () => import('@/pages/TasksPage.vue')
  },
  {
    path: ROUTES.TASK_DETAILS,
    name: 'task-details',
    component: () => import('@/pages/TaskDetailsPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
