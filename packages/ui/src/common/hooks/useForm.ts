import { Reducer, useMemo, useReducer, useState } from 'react'
import { AnyObjectSchema, ValidationError } from 'yup'

type KeyName<T> = keyof T
type KeyValue<T> = T[keyof T]

type Action<T> = {
  type: KeyName<T>
  value?: KeyValue<T>
}

type FormReducer<T> = Reducer<T, Action<T>>

export const useForm = <T extends Record<any, any>>(schema: AnyObjectSchema, initializer: T) => {
  const formReducer: FormReducer<T> = (state: T, action): T => {
    return { ...state, [action.type]: action.value }
  }

  const [state, dispatch] = useReducer(formReducer, initializer)
  const [errors, setErrors] = useState<ValidationError[]>([])

  const [context, setContext] = useState<unknown>()

  const isValid = useMemo(() => {
    try {
      schema.validateSync(state, { abortEarly: false, stripUnknown: true, context: context })
      return true
    } catch (error) {
      setErrors(error.inner)
      return false
    }
  }, [JSON.stringify(state), JSON.stringify(context)])

  const changeField = (type: KeyName<T>, value: KeyValue<T>) => {
    dispatch({ type, value })
  }

  // TODO API design:
  // const [form, changeField, validation] = useForm<FormFields>({}, Validations)
  // validations.isValid
  return { state, isValid, errors, changeField, updateContext: setContext }
}
