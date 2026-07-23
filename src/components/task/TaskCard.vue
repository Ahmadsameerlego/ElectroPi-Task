<script setup lang="ts">
import { computed } from 'vue'
import type { Task, TaskStatus } from '@/types'
import { formatDate } from '@/utils/date'
import BaseCard from '@/components/ui/BaseCard.vue'

interface Props {
  task: Task
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: 'edit', task: Task): void
  (e: 'delete', id: string): void
  (e: 'status-change', id: string, status: TaskStatus): void
}>()

const formattedDueDate = computed(() => {
  return formatDate(props.task.dueDate, 'MMM D, YYYY')
})

const statusBadgeClasses = computed(() => {
  const base =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border'

  if (props.task.status === 'done') {
    return `${base} bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50`
  }
  if (props.task.status === 'in_progress') {
    return `${base} bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50`
  }
  return `${base} bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50`
})

const statusLabel = computed(() => {
  if (props.task.status === 'done') return 'Done'
  if (props.task.status === 'in_progress') return 'In Progress'
  return 'Pending'
})
</script>

<template>
  <BaseCard hoverable>
    <div class="flex flex-col h-full justify-between gap-4">
      <!-- Card Content -->
      <div class="space-y-3">
        <div class="flex items-start justify-between gap-4">
          <h3
            class="text-base font-semibold text-slate-900 dark:text-white break-words flex-1 leading-snug"
          >
            {{ task.title }}
          </h3>
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

        <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
          {{ task.description || 'No description provided.' }}
        </p>
      </div>

      <!-- Footer Info and Action Buttons -->
      <div
        class="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-2"
      >
        <!-- Due Date Info -->
        <div class="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
          <svg
            class="h-4.5 w-4.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          <span class="text-xs font-medium">{{ formattedDueDate }}</span>
        </div>

        <!-- Action Items -->
        <div class="flex items-center gap-1">
          <!-- Quick Status Switcher Actions -->
          <button
            v-if="task.status !== 'done'"
            type="button"
            :disabled="disabled"
            @click="
              emit('status-change', task.id, task.status === 'pending' ? 'in_progress' : 'done')
            "
            class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 transition cursor-pointer"
            :title="task.status === 'pending' ? 'Start Progress' : 'Mark as Completed'"
          >
            <!-- Play icon for Pending -->
            <svg
              v-if="task.status === 'pending'"
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
            <!-- Check icon for In Progress -->
            <svg
              v-else
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>

          <button
            v-if="task.status === 'done'"
            type="button"
            :disabled="disabled"
            @click="emit('status-change', task.id, 'pending')"
            class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-50 transition cursor-pointer"
            title="Mark as Pending"
          >
            <!-- Undo icon -->
            <svg
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </button>

          <!-- Edit button -->
          <button
            type="button"
            :disabled="disabled"
            @click="emit('edit', task)"
            class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 transition cursor-pointer"
            title="Edit Task"
          >
            <svg
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>

          <!-- Delete button -->
          <button
            type="button"
            :disabled="disabled"
            @click="emit('delete', task.id)"
            class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-rose-600 dark:hover:text-rose-400 disabled:opacity-50 transition cursor-pointer"
            title="Delete Task"
          >
            <svg
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
