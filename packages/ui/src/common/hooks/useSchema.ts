import { useMemo, useState } from 'react'
import { AnyObjectSchema, ValidationError } from 'yup'

export const useSchema = <T>(fields: Record<string, any>, schema: AnyObjectSchema) => {
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [context, setContext] = useState<T>()

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

  return {
    isValid,
    errors,
    setContext,
  }
}
