import dayjs from 'dayjs'

/**
 * Formats a date string or Date object using dayjs.
 * @param date The date to format
 * @param formatStr The format template (default: 'YYYY-MM-DD')
 */
export function formatDate(date: string | Date, formatStr: string = 'YYYY-MM-DD'): string {
  if (!date) return ''
  return dayjs(date).format(formatStr)
}

/**
 * Checks if a given date is in the future relative to the current time.
 * @param date The date to check
 */
export function isFutureDate(date: string | Date): boolean {
  if (!date) return false
  return dayjs(date).isAfter(dayjs())
}
