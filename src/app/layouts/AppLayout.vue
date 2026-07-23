<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ROUTES } from '@/constants'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(false)

const navigationItems = [
  {
    name: 'Tasks',
    path: ROUTES.TASKS,
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
  }
]

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  isSidebarOpen.value = false
}

const isActive = (path: string) => {
  if (path === ROUTES.TASKS) {
    return route.path.startsWith(ROUTES.TASKS)
  }
  return route.path === path
}
</script>

<template>
  <div class="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
    <!-- Mobile Sidebar Backdrop -->
    <div
      v-if="isSidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
    ></div>

    <!-- Sidebar Container -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar Header -->
      <div class="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-sm shadow-indigo-200 dark:shadow-none"
          >
            AG
          </div>
          <div>
            <h2 class="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
              Antigravity
            </h2>
            <span class="text-xs text-slate-400 dark:text-slate-500">SaaS Platform</span>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
        <button
          v-for="item in navigationItems"
          :key="item.name"
          @click="navigateTo(item.path)"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150',
            isActive(item.path)
              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
          ]"
        >
          <svg
            class="h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>
          {{ item.name }}
        </button>
      </nav>

      <!-- Sidebar Footer (User info placeholder) -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-700">
        <div class="flex items-center gap-3 p-2 rounded-xl">
          <div
            class="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-medium text-slate-600 dark:text-slate-300"
          >
            JD
          </div>
          <div class="overflow-hidden">
            <h4 class="text-xs font-semibold text-slate-900 dark:text-white truncate">John Doe</h4>
            <span class="text-[10px] text-slate-400 dark:text-slate-500 truncate block"
              >john.doe@example.com</span
            >
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Navbar -->
      <header
        class="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-30"
      >
        <!-- Sidebar Toggle Button (Mobile) -->
        <button
          @click="toggleSidebar"
          class="lg:hidden p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
          aria-label="Toggle Sidebar"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Search / Breadcrumb Placeholder -->
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-slate-400 dark:text-slate-500">Dashboard</span>
          <span class="text-slate-300 dark:text-slate-600">/</span>
          <span class="text-sm font-semibold text-slate-800 dark:text-slate-100 capitalize">
            {{ route.name === 'task-details' ? 'Task Details' : route.name || 'Dashboard' }}
          </span>
        </div>

        <!-- Navbar Right Side (Placeholders) -->
        <div class="flex items-center gap-4">
          <!-- Notification Bell Placeholder -->
          <button
            class="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 relative"
          >
            <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
      </header>

      <!-- Page Content Area -->
      <main class="flex-1 overflow-y-auto p-6 md:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
