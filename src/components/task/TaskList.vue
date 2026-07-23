<script setup lang="ts">
import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import type { Task, TaskStatus } from '@/types'
import TaskCard from './TaskCard.vue'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const store = useTasksStore()

const emit = defineEmits<{
  (e: 'edit', task: Task): void
  (e: 'delete', id: string): void
  (e: 'create-click'): void
}>()

const isSearchOrFilterActive = computed(() => {
  return !!store.search || store.selectedStatus !== null
})

const handleStatusChange = async (id: string, newStatus: TaskStatus) => {
  try {
    await store.updateTask(id, { status: newStatus })
  } catch {
    // Error is logged/stored in Pinia, parent can handle toast notifications
  }
}

const clearFilters = () => {
  store.setSearch('')
  store.setStatusFilter(null)
}
</script>

<template>
  <div class="space-y-6">
    <!-- 1. LOADING STATE (skeleton shown during initial load when tasks array is empty) -->
    <div
      v-if="store.loading && store.tasks.length === 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm"
      >
        <LoadingSkeleton avatar />
      </div>
    </div>

    <!-- 2. ERROR STATE (with Retry action) -->
    <div
      v-else-if="store.error"
      class="flex flex-col items-center justify-center p-8 text-center border border-rose-100 dark:border-rose-950/30 rounded-2xl bg-rose-50/50 dark:bg-rose-950/10"
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
        API Connection Issue
      </h3>
      <p class="mt-2 text-xs text-rose-600 dark:text-rose-400 max-w-sm">
        {{ store.error }}
      </p>
      <div class="mt-6">
        <BaseButton @click="store.fetchTasks" variant="danger" :loading="store.loading">
          Retry Request
        </BaseButton>
      </div>
    </div>

    <!-- 3. EMPTY STATE (filters active or no tasks created) -->
    <div v-else-if="store.filteredTasks.length === 0" class="py-6">
      <EmptyState
        v-if="isSearchOrFilterActive"
        title="No tasks match criteria"
        description="Try adjusting your keyword search query or modifying the status tabs."
      >
        <template #action>
          <BaseButton @click="clearFilters" variant="outline" size="sm">
            Reset Active Filters
          </BaseButton>
        </template>
      </EmptyState>

      <EmptyState
        v-else
        title="No tasks found"
        description="There are currently no tasks created. Tap the button below to add your first work item."
      >
        <template #action>
          <BaseButton @click="emit('create-click')" size="sm"> Add First Task </BaseButton>
        </template>
      </EmptyState>
    </div>

    <!-- 4. RENDERED GRID LIST -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Transition Group for smooth list updates -->
      <TransitionGroup name="list">
        <TaskCard
          v-for="task in store.filteredTasks"
          :key="task.id"
          :task="task"
          :disabled="store.loading"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
          @status-change="handleStatusChange"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
