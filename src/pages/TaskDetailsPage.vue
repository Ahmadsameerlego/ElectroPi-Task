<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasks } from '@/composables/useTasks'
import { formatDate } from '@/utils/date'
import type { Task } from '@/types'
import BaseButton from '@/components/ui/BaseButton.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { fetchTaskById } = useTasks()

const taskId = route.params.id as string
const task = ref<Task | null>(null)
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const loadTask = async () => {
  loading.value = true
  error.value = null
  try {
    task.value = await fetchTaskById(taskId)
  } catch (err) {
    const errorObject = err as { message?: string; code?: string }
    if (errorObject.message?.includes('not found') || errorObject.code === 'ERR_NOT_FOUND') {
      task.value = null
    } else {
      error.value = errorObject.message || 'An error occurred while loading the task.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTask()
})

const goBack = () => {
  router.push('/tasks')
}

// Status badge styling classes mapping
const statusBadgeClasses = computed<string>(() => {
  if (!task.value) return ''
  const base =
    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border'

  if (task.value.status === 'done') {
    return `${base} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50`
  }
  if (task.value.status === 'in_progress') {
    return `${base} bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50`
  }
  return `${base} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50`
})

const statusLabel = computed<string>(() => {
  if (!task.value) return ''
  if (task.value.status === 'done') return 'Done'
  if (task.value.status === 'in_progress') return 'In Progress'
  return 'Pending'
})
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- Back Header Navigation -->
    <div class="flex items-center justify-between">
      <button
        @click="goBack"
        type="button"
        class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-lg"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Dashboard
      </button>
    </div>

    <!-- 1. LOADING ELEMENT -->
    <div
      v-if="loading"
      class="p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[300px]"
    >
      <LoadingSpinner size="lg" />
      <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading task details...</p>
    </div>

    <!-- 2. ERROR OVERLAY STATE -->
    <div
      v-else-if="error"
      class="p-8 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-950/30 rounded-2xl flex flex-col items-center justify-center text-center min-h-[300px]"
    >
      <div
        class="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <h3 class="mt-4 text-sm font-semibold text-rose-900 dark:text-rose-200">
        Failed to Load Task
      </h3>
      <p class="mt-2 text-xs text-rose-600 dark:text-rose-400 max-w-sm">{{ error }}</p>
      <div class="mt-6">
        <BaseButton @click="loadTask" variant="danger">Retry Loading</BaseButton>
      </div>
    </div>

    <!-- 3. NOT FOUND / EMPTY STATE -->
    <div v-else-if="!task" class="min-h-[300px] flex items-center justify-center">
      <EmptyState
        title="Task Not Found"
        description="The task you are trying to view does not exist or may have been deleted from the pipeline."
      >
        <template #action>
          <BaseButton @click="goBack" size="sm">Return to Board</BaseButton>
        </template>
      </EmptyState>
    </div>

    <!-- 4. CONTENT BLOCK -->
    <div
      v-else
      class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden"
    >
      <!-- Title Card Header Banner -->
      <div
        class="px-8 py-6 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50"
      >
        <div class="space-y-1">
          <span
            class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase"
            >Task ID: {{ task.id }}</span
          >
          <h2 class="text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {{ task.title }}
          </h2>
        </div>
        <div>
          <span :class="statusBadgeClasses">
            <span
              :class="[
                'h-1.5 w-1.5 rounded-full',
                task.status === 'done'
                  ? 'bg-emerald-500'
                  : task.status === 'in_progress'
                    ? 'bg-blue-500'
                    : 'bg-amber-500'
              ]"
            ></span>
            {{ statusLabel }}
          </span>
        </div>
      </div>

      <!-- Description and Details Meta Grid -->
      <div class="p-8 space-y-6">
        <div class="space-y-2">
          <h4 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Description
          </h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {{ task.description || 'No description provided for this task.' }}
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-700/50"
        >
          <div>
            <span
              class="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
              >Due Date</span
            >
            <span class="mt-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">
              {{ formatDate(task.dueDate, 'MMMM D, YYYY') }}
            </span>
          </div>
          <div>
            <span
              class="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
              >Created At</span
            >
            <span class="mt-1.5 block text-sm text-slate-600 dark:text-slate-400">
              {{ formatDate(task.createdAt, 'MMM D, YYYY h:mm A') }}
            </span>
          </div>
          <div>
            <span
              class="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
              >Last Updated</span
            >
            <span class="mt-1.5 block text-sm text-slate-600 dark:text-slate-400">
              {{ formatDate(task.updatedAt, 'MMM D, YYYY h:mm A') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
