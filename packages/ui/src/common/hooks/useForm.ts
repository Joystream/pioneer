import { Reducer, useEffect, useReducer, useState } from 'react'
import { AnyObjectSchema, ValidationError } from 'yup'

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
  const [isValid, setValid] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])

  const [data, setData] = useState<T>()
  const [context, setContext] = useState()

  useEffect(() => {
    let stillWaiting = true
    setValid(false)

    schema
      .validate(data, { abortEarly: false, stripUnknown: true, context: context })
      .then(() => {
        if (stillWaiting) {
          setValid(true)
          setErrors([])
        }
      })
      .catch((error) => {
        if (stillWaiting) {
          setValid(false)
          setErrors(error.inner)
        }
      })

    return () => {
      stillWaiting = false
    }
  }, [data, context])

  const validate = (data: T, context: any) => {
    setData(data)
    setContext(context)
  }

  // TODO API design:
  // const [from, changeField, validation] = useForm<FormFields>({}, Validations)
  // validations.isValid
  return { state, dispatch, isValid, errors, validate }
}
