<script setup lang="ts">
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import type { TaskStatus } from '@/types'

const store = useTasksStore()

const currentFilter = computed<TaskStatus | null>({
  get: () => store.selectedStatus,
  set: (status) => store.setStatusFilter(status)
})

const filterTabs = computed(() => [
  { label: 'All', value: null, count: store.taskCount },
  { label: 'Pending', value: 'pending' as TaskStatus, count: store.pendingTasks.length },
  { label: 'In Progress', value: 'in_progress' as TaskStatus, count: store.inProgressTasks.length },
  { label: 'Done', value: 'done' as TaskStatus, count: store.completedTasks.length }
])
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="tab in filterTabs"
      :key="tab.label"
      type="button"
      @click="currentFilter = tab.value"
      :class="[
        'px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-2 border',
        currentFilter === tab.value
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100 dark:shadow-none'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
      ]"
    >
      <span>{{ tab.label }}</span>
      <span
        :class="[
          'px-1.5 py-0.5 rounded-md text-[10px] font-bold transition-colors',
          currentFilter === tab.value
            ? 'bg-indigo-700 text-white'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
        ]"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>
