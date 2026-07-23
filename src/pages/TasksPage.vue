<script setup lang="ts">
// Page component for task list
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Tasks</h1>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage, track, and organize your daily work assignments.
        </p>
      </div>
    </div>

    <!-- Placeholder for tasks dashboard components -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-6">
        <div
          class="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
        >
          <p class="text-slate-600 dark:text-slate-300">Task Board Placeholder (Milestone 1)</p>
        </div>
      </div>
      <div class="space-y-6">
        <div
          class="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
        >
          <p class="text-slate-600 dark:text-slate-300">Filters & Actions Sidebar Placeholder</p>
        </div>
      </div>
    </div>
  </div>
</template>
