import { Reducer, useReducer } from 'react'
import { AnyObjectSchema } from 'yup'

import { useFormValidation } from './useFormValidation'

type Action<T> = {
  type: keyof T
  value?: T[keyof T]
}

type FormReducer<T> = Reducer<T, Action<T>>

export const useForm = <T extends Record<any, any>>(schema: AnyObjectSchema, initializer: T) => {
  const formReducer: FormReducer<T> = (state: T, action): T => {
    return { ...state, [action.type]: action.value }
  }

  const [state, dispatch] = useReducer(formReducer, initializer)
  const { isValid, errors, validate } = useFormValidation<T>(schema)

  // TODO API design:
  // const [from, changeField, validation] = useForm<FormFields>({}, Validations)
  // validations.isValid
  return { state, dispatch, isValid, errors, validate }
}
