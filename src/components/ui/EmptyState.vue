<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No items found',
  description: 'Try adjusting your filters or search criteria.'
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
  >
    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300"
    >
      <slot name="icon">
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
            d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.5A2.25 2.25 0 0118 22.5H6a2.25 2.25 0 01-2.25-2.25v-4.5m18-6A2.25 2.25 0 0018 7.5H6a2.25 2.25 0 00-2.25 2.25m18 0v3.75a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V9.75m18 0A2.25 2.25 0 0018 7.5h-1.5m-9 0H6A2.25 2.25 0 003.75 9.75M9 7.5V3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V7.5"
          />
        </svg>
      </slot>
    </div>

    <h3 class="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
      {{ title }}
    </h3>

    <p class="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
      {{ description }}
    </p>

    <div v-if="$slots.action" class="mt-6">
      <slot name="action" />
    </div>
  </div>
</template>
