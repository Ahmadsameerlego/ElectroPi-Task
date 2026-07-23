import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTasksStore } from './tasks'
import { taskService } from '@/services/task.service'
import type { Task } from '@/types'

// Mock the taskService module to isolate store state logic from mock API latency
vi.mock('@/services/task.service', () => {
  return {
    taskService: {
      fetchTasks: vi.fn(),
      createTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
      getTaskById: vi.fn()
    }
  }
})

describe('Tasks Pinia Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with correct default state values', () => {
    const store = useTasksStore()
    expect(store.tasks).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.search).toBe('')
    expect(store.selectedStatus).toBeNull()
  })

  it('should dynamically calculate getter filters for status segments and search queries', () => {
    const store = useTasksStore()
    const mockList: Task[] = [
      {
        id: '1',
        title: 'Create Vitest configurations',
        description: 'Write unit tests',
        status: 'pending',
        dueDate: '2026-08-01',
        createdAt: '',
        updatedAt: ''
      },
      {
        id: '2',
        title: 'Audit accessibility attributes',
        description: 'Add aria properties',
        status: 'in_progress',
        dueDate: '2026-08-05',
        createdAt: '',
        updatedAt: ''
      },
      {
        id: '3',
        title: 'Publish dashboard boilerplate',
        description: 'Merge production code',
        status: 'done',
        dueDate: '2026-08-10',
        createdAt: '',
        updatedAt: ''
      }
    ]
    store.tasks = mockList

    // Check count getters
    expect(store.taskCount).toBe(3)
    expect(store.completedTasks).toHaveLength(1)
    expect(store.pendingTasks).toHaveLength(1)
    expect(store.inProgressTasks).toHaveLength(1)

    // Test Search query filter (case-insensitive)
    store.setSearch('vitest')
    expect(store.filteredTasks).toHaveLength(1)
    expect(store.filteredTasks[0].id).toBe('1')

    // Test search reset
    store.setSearch('')
    expect(store.filteredTasks).toHaveLength(3)

    // Test joint Search + Status Filters
    store.setSearch('audit')
    store.setStatusFilter('in_progress')
    expect(store.filteredTasks).toHaveLength(1)
    expect(store.filteredTasks[0].id).toBe('2')

    // Changing status filter to mismatched value should result in 0 hits
    store.setStatusFilter('done')
    expect(store.filteredTasks).toHaveLength(0)
  })

  it('should trigger taskService.fetchTasks, toggling loaders and populating store tasks', async () => {
    const store = useTasksStore()
    const mockTasks: Task[] = [
      {
        id: 'task-1',
        title: 'Mock Task 1',
        description: '',
        status: 'pending',
        dueDate: '2026-08-10',
        createdAt: '',
        updatedAt: ''
      }
    ]
    vi.mocked(taskService.fetchTasks).mockResolvedValue(mockTasks)

    await store.fetchTasks()

    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.tasks).toEqual(mockTasks)
    expect(taskService.fetchTasks).toHaveBeenCalledTimes(1)
  })

  it('should capture service failure and record the error message inside state', async () => {
    const store = useTasksStore()
    const errorMsg = 'Backend simulator offline'
    vi.mocked(taskService.fetchTasks).mockRejectedValue(new Error(errorMsg))

    await expect(store.fetchTasks()).rejects.toThrow(errorMsg)

    expect(store.loading).toBe(false)
    expect(store.error).toBe(errorMsg)
    expect(store.tasks).toEqual([])
  })

  it('should trigger taskService.createTask, appending the result task to the list', async () => {
    const store = useTasksStore()
    const inputTask = {
      title: 'Review PR',
      description: '',
      status: 'pending' as const,
      dueDate: '2026-08-12'
    }
    const responseTask: Task = {
      id: 'new-id-99',
      ...inputTask,
      createdAt: '2026-07-23T00:00:00Z',
      updatedAt: '2026-07-23T00:00:00Z'
    }
    vi.mocked(taskService.createTask).mockResolvedValue(responseTask)

    await store.createTask(inputTask)

    expect(store.tasks).toContainEqual(responseTask)
    expect(taskService.createTask).toHaveBeenCalledWith(inputTask)
  })

  it('should trigger taskService.updateTask, replacing the local array reference', async () => {
    const store = useTasksStore()
    store.tasks = [
      {
        id: 'task-5',
        title: 'Initial Title',
        description: '',
        status: 'pending',
        dueDate: '2026-08-01',
        createdAt: '',
        updatedAt: ''
      }
    ]
    const updatedTask: Task = {
      id: 'task-5',
      title: 'Modified Title',
      description: '',
      status: 'done',
      dueDate: '2026-08-01',
      createdAt: '',
      updatedAt: ''
    }
    vi.mocked(taskService.updateTask).mockResolvedValue(updatedTask)

    await store.updateTask('task-5', { title: 'Modified Title', status: 'done' })

    expect(store.tasks[0]).toEqual(updatedTask)
    expect(taskService.updateTask).toHaveBeenCalledWith('task-5', {
      title: 'Modified Title',
      status: 'done'
    })
  })

  it('should trigger taskService.deleteTask, removing the task from the local array list', async () => {
    const store = useTasksStore()
    store.tasks = [
      {
        id: '1',
        title: 'Task A',
        description: '',
        status: 'pending',
        dueDate: '2026-08-01',
        createdAt: '',
        updatedAt: ''
      },
      {
        id: '2',
        title: 'Task B',
        description: '',
        status: 'done',
        dueDate: '2026-08-02',
        createdAt: '',
        updatedAt: ''
      }
    ]
    vi.mocked(taskService.deleteTask).mockResolvedValue(undefined)

    await store.deleteTask('1')

    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].id).toBe('2')
    expect(taskService.deleteTask).toHaveBeenCalledWith('1')
  })
})
