import React from 'react'
import { ValidationError } from 'yup'
import { ValidationErrorInfo } from './Input'

const getError = <T extends any>(field: keyof T, errors: ValidationError[]) =>
  errors.find((error) => error.path === field)

export const hasError = <T extends any>(field: keyof T, errors: ValidationError[]) =>
  !(!getError<T>(field, errors)?.value ?? true)

interface Props<T> {
  name: keyof T
  errors: ValidationError[]
}

export const FieldError = <T extends any>({ name, errors }: Props<T>) => {
  const error = getError<T>(name, errors)

  if (error && error.value) {
    return (
      <>
        <ValidationErrorInfo>{error.message}</ValidationErrorInfo>
      </>
    )
  }

  return null
}
