import { describe, it, expect } from 'vitest'
import { useValidation } from './useValidation'
import { VALIDATION_MESSAGES } from '@/constants'
import dayjs from 'dayjs'

describe('Validation Composable', () => {
  const { validateTitle, validateDueDate } = useValidation()

  describe('validateTitle', () => {
    it('should return error message when title is empty or only whitespace', () => {
      expect(validateTitle('')).toBe(VALIDATION_MESSAGES.REQUIRED)
      expect(validateTitle('   ')).toBe(VALIDATION_MESSAGES.REQUIRED)
    })

    it('should return empty string when title is valid', () => {
      expect(validateTitle('Code task board view')).toBe('')
    })
  })

  describe('validateDueDate', () => {
    it('should return error message when date is empty', () => {
      expect(validateDueDate('')).toBe(VALIDATION_MESSAGES.REQUIRED)
    })

    it('should return error message when date is in an invalid format', () => {
      expect(validateDueDate('invalid-date')).toBe(VALIDATION_MESSAGES.INVALID_DATE)
    })

    it('should return error message when date is set in the past', () => {
      const pastDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      expect(validateDueDate(pastDate)).toBe(VALIDATION_MESSAGES.FUTURE_DATE)
    })

    it('should return empty string when date is set in the future', () => {
      const futureDate = dayjs().add(2, 'day').format('YYYY-MM-DD')
      expect(validateDueDate(futureDate)).toBe('')
    })
  })
})
