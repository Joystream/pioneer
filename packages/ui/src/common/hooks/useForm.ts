import { Reducer, useMemo, useReducer, useState } from 'react'
import { AnyObjectSchema, ValidationError } from 'yup'

type KeyName<T> = keyof T
type KeyValue<T> = T[keyof T]

type Action<T> = {
  type: KeyName<T>
  value?: KeyValue<T>
}

const formReducer = <T extends Record<any, any>>(state: T, action: Action<T>): T => {
  return { ...state, [action.type]: action.value }
}

export const useForm = <T extends Record<any, any>>(initializer: T, schema: AnyObjectSchema) => {
  const [state, dispatch] = useReducer(formReducer as Reducer<T, Action<T>>, initializer)
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
