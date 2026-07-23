<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hoverable?: boolean
  noPadding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  noPadding: false
})

const cardClasses = computed(() => {
  const base =
    'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm transition-all duration-200 overflow-hidden'
  const hoverEffect = props.hoverable
    ? 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5'
    : ''
  return `${base} ${hoverEffect}`
})
</script>

<template>
  <div :class="cardClasses">
    <!-- Card Header -->
    <div
      v-if="$slots.header"
      class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between"
    >
      <slot name="header" />
    </div>

    <!-- Card Content -->
    <div :class="noPadding ? '' : 'p-6'">
      <slot />
    </div>

    <!-- Card Footer -->
    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-end gap-3"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
