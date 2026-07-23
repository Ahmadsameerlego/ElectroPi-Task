import type { Task, ApiResponse } from '@/types'
import { sleep } from '@/utils/promise'
import { generateId } from '@/utils/id'

// Seeded tasks in the in-memory mock database
const mockDb: Task[] = [
  {
    id: 'task-1',
    title: 'Configure Vue Router and Layout Shell',
    description:
      'Verify responsive sidebar toggles, desktop drawers, page transition animations, and Route redirections.',
    status: 'done',
    dueDate: '2026-07-31',
    createdAt: '2026-07-23T10:00:00Z',
    updatedAt: '2026-07-23T10:00:00Z'
  },
  {
    id: 'task-2',
    title: 'Implement Pinia Store Actions & Service Layer',
    description:
      'Deconstruct business flows into store actions and delegator services, avoiding direct API imports in components.',
    status: 'in_progress',
    dueDate: '2026-08-05',
    createdAt: '2026-07-23T10:10:00Z',
    updatedAt: '2026-07-23T10:15:00Z'
  },
  {
    id: 'task-3',
    title: 'Add Toast Alerts and Validation Rules',
    description:
      'Enforce non-empty titles, check for future due dates, and trigger feedback toasts on API operations.',
    status: 'pending',
    dueDate: '2026-08-10',
    createdAt: '2026-07-23T10:20:00Z',
    updatedAt: '2026-07-23T10:20:00Z'
  }
]

/**
 * Simulates random network latency (800ms-1200ms) and triggers a 15% random failure rate.
 */
async function simulateNetwork() {
  const latency = Math.floor(Math.random() * (1200 - 800 + 1)) + 800
  await sleep(latency)

  if (Math.random() < 0.15) {
    throw {
      message: 'Simulated API failure. Please click the Retry button to try again.',
      code: 'ERR_SIMULATED_FAILURE'
    }
  }
}

export const taskApi = {
  async getTasks(): Promise<ApiResponse<Task[]>> {
    await simulateNetwork()
    return {
      data: JSON.parse(JSON.stringify(mockDb)), // Deep copy to prevent outside references
      status: 200,
      message: 'Tasks fetched successfully'
    }
  },

  async getTaskById(id: string): Promise<ApiResponse<Task>> {
    await simulateNetwork()
    const task = mockDb.find((t) => t.id === id)
    if (!task) {
      throw {
        message: `Task with ID ${id} not found`,
        code: 'ERR_NOT_FOUND'
      }
    }
    return {
      data: JSON.parse(JSON.stringify(task)),
      status: 200
    }
  },

  async createTask(
    taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Task>> {
    await simulateNetwork()
    const now = new Date().toISOString()
    const newTask: Task = {
      ...taskData,
      id: `task-${generateId()}`,
      createdAt: now,
      updatedAt: now
    }
    mockDb.push(newTask)
    return {
      data: JSON.parse(JSON.stringify(newTask)),
      status: 201,
      message: 'Task created successfully'
    }
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<ApiResponse<Task>> {
    await simulateNetwork()
    const index = mockDb.findIndex((t) => t.id === id)
    if (index === -1) {
      throw {
        message: `Task with ID ${id} not found`,
        code: 'ERR_NOT_FOUND'
      }
    }

    const updatedTask: Task = {
      ...mockDb[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    mockDb[index] = updatedTask

    return {
      data: JSON.parse(JSON.stringify(updatedTask)),
      status: 200,
      message: 'Task updated successfully'
    }
  },

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    await simulateNetwork()
    const index = mockDb.findIndex((t) => t.id === id)
    if (index === -1) {
      throw {
        message: `Task with ID ${id} not found`,
        code: 'ERR_NOT_FOUND'
      }
    }

    mockDb.splice(index, 1)

    return {
      data: undefined as unknown as void,
      status: 200,
      message: 'Task deleted successfully'
    }
  }
}
