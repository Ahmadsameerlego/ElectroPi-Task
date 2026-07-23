import { isFutureDate } from '@/utils/date'
import { VALIDATION_MESSAGES } from '@/constants'

/**
 * Composable for form field validation checks.
 * Enforces title required rules and checks if dates are valid and set in the future.
 */
export function useValidation() {
  const validateTitle = (title: string): string => {
    if (!title || !title.trim()) {
      return VALIDATION_MESSAGES.REQUIRED
    }
    return ''
  }

  const validateDueDate = (dueDate: string): string => {
    if (!dueDate) {
      return VALIDATION_MESSAGES.REQUIRED
    }

    const parsedTime = Date.parse(dueDate)
    if (isNaN(parsedTime)) {
      return VALIDATION_MESSAGES.INVALID_DATE
    }

    if (!isFutureDate(dueDate)) {
      return VALIDATION_MESSAGES.FUTURE_DATE
    }

    return ''
  }

  return {
    validateTitle,
    validateDueDate
  }
}
