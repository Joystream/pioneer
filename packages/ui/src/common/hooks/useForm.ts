import { Reducer, useCallback, useEffect, useReducer, useState } from 'react'
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
  const [isValid, setValid] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])

  const [data, setData] = useState<T>()
  const [context, setContext] = useState()

  useEffect(() => {
    setValid(false)

    try {
      schema.validateSync(data, { abortEarly: false, stripUnknown: true, context: context })
      setValid(true)
    } catch (error) {
      setErrors(error.inner)
      setValid(false)
    }
  }, [data, context])

  const validate = useCallback(
    (data: T, context: any) => {
      setData(data)
      setContext(context)
    },
    [setData, setContext]
  )

  const changeField = (type: KeyName<T>, value: KeyValue<T>) => {
    dispatch({ type, value })
  }

  // TODO API design:
  // const [from, changeField, validation] = useForm<FormFields>({}, Validations)
  // validations.isValid
  return { state, isValid, errors, changeField, validate }
}
