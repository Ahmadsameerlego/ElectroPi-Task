<script setup lang="ts">
interface Props {
  lines?: number
  avatar?: boolean
  height?: string
}

withDefaults(defineProps<Props>(), {
  lines: 3,
  avatar: false,
  height: 'h-4'
})
</script>

<template>
  <div class="animate-pulse space-y-4 w-full">
    <div v-if="avatar" class="flex items-center gap-4">
      <div class="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>

    <div v-if="!avatar" class="space-y-3">
      <div
        v-for="i in lines"
        :key="i"
        :class="[
          'bg-slate-200 dark:bg-slate-700 rounded',
          height,
          i === lines && lines > 1 ? 'w-2/3' : 'w-full'
        ]"
      ></div>
    </div>
  </div>
</template>
