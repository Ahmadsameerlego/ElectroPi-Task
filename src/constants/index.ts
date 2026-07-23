export const ROUTES = {
  HOME: '/',
  TASKS: '/tasks',
  TASK_DETAILS: '/tasks/:id'
} as const

export const TASK_STATUSES = {
  BACKLOG: 'backlog',
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const

export const TASK_STATUS_LABELS = {
  [TASK_STATUSES.BACKLOG]: 'Backlog',
  [TASK_STATUSES.TODO]: 'To Do',
  [TASK_STATUSES.IN_PROGRESS]: 'In Progress',
  [TASK_STATUSES.COMPLETED]: 'Completed'
} as const

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be at most ${max} characters`,
  INVALID_DATE: 'Please enter a valid date',
  FUTURE_DATE: 'Date must be in the future'
} as const

export const API_ENDPOINTS = {
  TASKS: {
    BASE: '/tasks',
    DETAILS: (id: string) => `/tasks/${id}`
  }
} as const
