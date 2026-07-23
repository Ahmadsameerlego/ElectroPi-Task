import type { Task, ApiResponse } from '@/types'

/**
 * Task API communication layer.
 * Architecture stubs only; no actual network calls.
 */
export const taskApi = {
  getTasks(): Promise<ApiResponse<Task[]>> {
    throw new Error('Not implemented')
  },

  getTaskById(id: string): Promise<ApiResponse<Task>> {
    throw new Error(`Not implemented for ID: ${id}`)
  },

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Task>> {
    throw new Error(`Not implemented for task: ${JSON.stringify(task)}`)
  },

  updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task>> {
    throw new Error(`Not implemented for ID: ${id} and updates: ${JSON.stringify(updates)}`)
  },

  deleteTask(id: string): Promise<ApiResponse<void>> {
    throw new Error(`Not implemented for ID: ${id}`)
  }
}
