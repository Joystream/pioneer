import { useReducer } from 'react'
import { AnyObjectSchema } from 'yup'

import { FormReducer } from '../types/form'

import { useFormValidation } from './useFormValidation'

export const useForm = <T extends Record<any, any>>(schema: AnyObjectSchema, initializer: T) => {
  const formReducer: FormReducer<T> = (state: T, action): T => {
    return { ...state, [action.type]: action.value }
  }

  const [state, dispatch] = useReducer(formReducer, initializer)
  const { isValid, errors, validate } = useFormValidation<T>(schema)

  return { state, dispatch, isValid, errors, validate }
}
