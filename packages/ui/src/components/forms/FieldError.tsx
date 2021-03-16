import React from 'react'
import { ValidationError } from 'yup'
import { ValidationErrorInfo } from './Input'

const getError = (field: string, errors: ValidationError[]) => {
  return errors.find((error) => error.path === field)
}
export const hasError = (field: string, errors: ValidationError[]) => !(!getError(field, errors)?.value ?? true)

interface Props {
  name: string
  errors: ValidationError[]
}

export const FieldError = ({ name, errors }: Props) => {
  const error = getError(name, errors)

  if (error && error.value) {
    return (
      <>
        <ValidationErrorInfo>{error.message}</ValidationErrorInfo>
      </>
    )
  }

  return null
}
