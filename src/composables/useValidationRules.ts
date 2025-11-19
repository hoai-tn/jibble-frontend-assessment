/**
 * Validation rules for form inputs
 */

export function noSpecialChars (value: string): boolean | string {
  if (!value) {
    return true
  }
  // Allow alphanumeric, spaces, hyphens, apostrophes, periods, and commas
  const validPattern = /^[a-zA-Z0-9\s\-'.,]+$/
  return (
    validPattern.test(value) || 'Only letters, numbers, spaces, and basic punctuation are allowed'
  )
}

export function useValidationRules () {
  return {
    noSpecialChars,
  }
}
