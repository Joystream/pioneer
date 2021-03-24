import { Nullable } from './types'

export const hasAnyEdits = (form: Record<string, any>, initial: Record<string, any>) => {
  return !!getChangedFields(form, initial).length
}

export const getChangedFields = (form: Record<string, any>, initial: Record<string, any>) => {
  const changedFields = []

  for (const key of Object.keys(form)) {
    const initialValue = initial[key] || ''
    const formValue = form[key]?.address ?? (form[key] || '')
    if (initialValue !== formValue) {
      changedFields.push(key)
    }
  }

  return changedFields
}

export const changedOrNull = <T extends any>(form: Record<string, any>, initial: Record<string, any>): Nullable<T> => {
  const changedFields = getChangedFields(form, initial)

  return Object.entries(form).reduce((prev, [key, value]) => {
    return {
      ...prev,
      [key]: changedFields.includes(key) ? value : null,
    }
  }, {} as Nullable<T>)
}
