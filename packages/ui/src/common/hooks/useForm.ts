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
  const [fields, dispatch] = useReducer(formReducer as Reducer<T, Action<T>>, initializer)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [context, setContext] = useState<unknown>()

  const isValid = useMemo(() => {
    try {
      schema.validateSync(fields, { abortEarly: false, stripUnknown: true, context: context })
      setErrors([])
      return true
    } catch (error) {
      setErrors((error as any).inner)
      return false
    }
  }, [JSON.stringify(fields), JSON.stringify(context), schema])

  const changeField = (type: KeyName<T>, value: KeyValue<T>) => {
    dispatch({ type, value })
  }

  return {
    fields,
    changeField,
    validation: {
      isValid,
      errors,
      setContext,
    },
  }
}
