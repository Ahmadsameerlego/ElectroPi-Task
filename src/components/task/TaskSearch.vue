<script setup lang="ts">
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import BaseInput from '@/components/ui/BaseInput.vue'

const store = useTasksStore()

const searchQuery = computed<string>({
  get: () => store.search,
  set: (val) => store.setSearch(val)
})
</script>

<template>
  <div class="w-full">
    <BaseInput v-model="searchQuery" placeholder="Search tasks by title..." class="w-full">
      <template #prefix>
        <svg
          class="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z"
          />
        </svg>
      </template>
      <template #suffix v-if="searchQuery">
        <button
          type="button"
          @click="searchQuery = ''"
          class="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition cursor-pointer"
        >
          <svg
            class="h-4 w-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </template>
    </BaseInput>
  </div>
</template>
