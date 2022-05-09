import { ValidationError } from 'yup'

export const getError = <T extends any>(field: keyof T, errors: ValidationError[]) =>
  errors?.find((error) => error.path === field)

export const getErrorMessage = <T extends any>(field: keyof T, errors: ValidationError[]) => {
  const error = getError(field, errors)
  return error?.message
}

export const hasError = <T extends any>(field: keyof T, errors: ValidationError[]) => {
  return !!getError<T>(field, errors)?.message
}
