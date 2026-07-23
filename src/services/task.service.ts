import type { Task } from '@/types'

/**
 * Task Service layer handling business workflow delegations.
 * Architecture stubs only; all methods throw "Not implemented".
 */
export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    throw new Error('Not implemented')
  },

  async createTask(_taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    throw new Error('Not implemented')
  },

  async updateTask(_id: string, _taskData: Partial<Task>): Promise<Task> {
    throw new Error('Not implemented')
  },

  async deleteTask(_id: string): Promise<void> {
    throw new Error('Not implemented')
  }
}
