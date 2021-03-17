import { useEffect, useState } from 'react'
import { AnyObjectSchema, ValidationError } from 'yup'

export const useFormValidation = <T extends any>(schema: AnyObjectSchema) => {
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

  return {
    isValid,
    errors,
    validate: (data: any, context: any) => {
      setData(data)
      setContext(context)
    },
  }
}
