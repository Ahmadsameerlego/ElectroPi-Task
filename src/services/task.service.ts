import { taskApi } from '@/api/task.api'
import type { Task } from '@/types'

/**
 * Task Service layer handling business workflows and API integration.
 * Mediates communication between store state and network APIs.
 */
export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    const response = await taskApi.getTasks()
    return response.data
  },

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const response = await taskApi.createTask(taskData)
    return response.data
  },

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const response = await taskApi.updateTask(id, taskData)
    return response.data
  },

  async deleteTask(id: string): Promise<void> {
    await taskApi.deleteTask(id)
  }
}
