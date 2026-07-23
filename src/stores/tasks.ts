import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { taskService } from '@/services/task.service'
import type { Task, TaskStatus } from '@/types'

/**
 * Tasks Pinia Store.
 * Governs the client-side state for task lists, status filters, and search inputs.
 */
export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const search = ref<string>('')
  const selectedStatus = ref<TaskStatus | null>(null)

  // Getters
  const completedTasks = computed<Task[]>(() => tasks.value.filter((t) => t.status === 'done'))
  const pendingTasks = computed<Task[]>(() => tasks.value.filter((t) => t.status === 'pending'))
  const inProgressTasks = computed<Task[]>(() =>
    tasks.value.filter((t) => t.status === 'in_progress')
  )
  const taskCount = computed<number>(() => tasks.value.length)

  const filteredTasks = computed<Task[]>(() => {
    return tasks.value.filter((task) => {
      // Case-insensitive search by task title
      const matchesSearch = task.title.toLowerCase().includes(search.value.toLowerCase())

      // Filter matching
      const matchesStatus = !selectedStatus.value || task.status === selectedStatus.value

      return matchesSearch && matchesStatus
    })
  })

  // Actions
  const setSearch = (query: string) => {
    search.value = query
  }

  const setStatusFilter = (status: TaskStatus | null) => {
    selectedStatus.value = status
  }

  const fetchTasks = async () => {
    loading.value = true
    error.value = null
    try {
      tasks.value = await taskService.fetchTasks()
    } catch (err) {
      const errorObject = err as { message?: string }
      error.value = errorObject.message || 'Failed to fetch tasks'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    loading.value = true
    error.value = null
    try {
      const newTask = await taskService.createTask(taskData)
      tasks.value.push(newTask)
      return newTask
    } catch (err) {
      const errorObject = err as { message?: string }
      error.value = errorObject.message || 'Failed to create task'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    loading.value = true
    error.value = null
    try {
      const updatedTask = await taskService.updateTask(id, updates)
      const index = tasks.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
      return updatedTask
    } catch (err) {
      const errorObject = err as { message?: string }
      error.value = errorObject.message || 'Failed to update task'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await taskService.deleteTask(id)
      tasks.value = tasks.value.filter((t) => t.id !== id)
    } catch (err) {
      const errorObject = err as { message?: string }
      error.value = errorObject.message || 'Failed to delete task'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    search,
    selectedStatus,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    taskCount,
    filteredTasks,
    setSearch,
    setStatusFilter,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  }
})
