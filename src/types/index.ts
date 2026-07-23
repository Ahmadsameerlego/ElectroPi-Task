export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'backlog'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  dueDate: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export interface ApiError {
  message: string
  code?: string
  errors?: Record<string, string[]>
}
