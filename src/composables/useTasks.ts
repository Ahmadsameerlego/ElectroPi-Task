import { computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import type { Task, TaskStatus } from '@/types'

/**
 * Task Management wrapper composable.
 * Abstract interface on top of Pinia state store to keep components decoupled from store imports.
 */
export function useTasks() {
  const store = useTasksStore()

  return {
    // State references
    tasks: computed<Task[]>(() => store.tasks),
    loading: computed<boolean>(() => store.loading),
    error: computed<string | null>(() => store.error),
    search: computed<string>(() => store.search),
    selectedStatus: computed<TaskStatus | null>(() => store.selectedStatus),

    // Getters
    filteredTasks: computed<Task[]>(() => store.filteredTasks),
    completedTasks: computed<Task[]>(() => store.completedTasks),
    pendingTasks: computed<Task[]>(() => store.pendingTasks),
    inProgressTasks: computed<Task[]>(() => store.inProgressTasks),
    taskCount: computed<number>(() => store.taskCount),

    // Actions
    fetchTasks: store.fetchTasks,
    fetchTaskById: store.fetchTaskById,
    createTask: store.createTask,
    updateTask: store.updateTask,
    deleteTask: store.deleteTask,
    setSearch: store.setSearch,
    setStatusFilter: store.setStatusFilter
  }
}
