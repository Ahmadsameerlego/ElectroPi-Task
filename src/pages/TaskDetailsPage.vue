<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const taskId = route.params.id as string
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Task Details</h1>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Viewing details for task:
        <span class="font-mono text-indigo-600 dark:text-indigo-400">{{ taskId }}</span>
      </p>
    </div>

    <div
      class="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
    >
      <p class="text-slate-600 dark:text-slate-300">
        Task Details content placeholder (Milestone 1)
      </p>
    </div>
  </div>
</template>
