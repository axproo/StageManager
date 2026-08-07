import { reactive } from 'vue'

export function useFormValidation<T extends Record<string, any>>() {
  const errors = reactive<Record<string, string>>({})

  const setError = (field: keyof T, message: string) => {
    errors[field as string] = message
  }

  const clearError = (field: keyof T) => {
    errors[field as string] = ''
  }

  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key] = ''
    })
  }

  return {
    errors,
    setError,
    clearError,
    clearErrors,
  }
}
