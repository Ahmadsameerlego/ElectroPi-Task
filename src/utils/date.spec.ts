import { describe, it, expect } from 'vitest'
import { formatDate, isFutureDate } from './date'
import dayjs from 'dayjs'

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format date string properly according to format template', () => {
      expect(formatDate('2026-07-23', 'YYYY-MM-DD')).toBe('2026-07-23')
      expect(formatDate('2026-07-23', 'MMM D, YYYY')).toBe('Jul 23, 2026')
    })

    it('should return empty string if input date is empty or invalid', () => {
      expect(formatDate('')).toBe('')
    })
  })

  describe('isFutureDate', () => {
    it('should return true for dates in the future', () => {
      const futureDate = dayjs().add(2, 'day').format('YYYY-MM-DD')
      expect(isFutureDate(futureDate)).toBe(true)
    })

    it('should return false for dates in the past', () => {
      const pastDate = dayjs().subtract(2, 'day').format('YYYY-MM-DD')
      expect(isFutureDate(pastDate)).toBe(false)
    })

    it('should return false for current date or empty value', () => {
      expect(isFutureDate('')).toBe(false)
    })
  })
})
