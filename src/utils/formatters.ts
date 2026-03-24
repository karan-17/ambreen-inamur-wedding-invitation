import { format, isValid, parseISO } from 'date-fns'

/**
 * Format date for wedding invitation display
 */
export const formatWeddingDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid Date'
  }
  
  return format(dateObj, 'EEEE, MMMM do, yyyy')
}

/**
 * Format time for wedding invitation display
 */
export const formatWeddingTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  
  if (!isValid(dateObj)) {
    return 'Invalid Time'
  }
  
  return format(dateObj, 'h:mm a')
}

/**
 * Format countdown numbers with leading zeros
 */
export const formatCountdownNumber = (num: number): string => {
  return num.toString().padStart(2, '0')
}

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

/**
 * Generate initials from full name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}