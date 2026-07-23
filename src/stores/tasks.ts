import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task, TaskStatus } from '@/types'

/**
 * Tasks Pinia store.
 * Holds only state properties for milestone 1; actions will be added later.
 */
export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const search = ref<string>('')
  const selectedStatus = ref<TaskStatus | null>(null)

  return {
    tasks,
    loading,
    error,
    search,
    selectedStatus
  }
})
