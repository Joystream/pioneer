import { WithNullableValues } from '@/common/types/form'
import { MemberWithDetails } from '@/memberships/types'

export const hasAnyEdits = (form: Record<string, any>, initial: Record<string, any>) => {
  return !!getChangedFields(form, initial).length
}

export const getChangedFields = (form: Record<string, any>, initial: Record<string, any>) => {
  const changedFields = []

  for (const key of Object.keys(form)) {
    const initialValue = initial[key] || ''
    const formValue = form[key]?.address ?? (form[key] || '')
    if (initialValue !== formValue) {
      if (key === 'externalResources') {
        const convertedInitialValue = membershipExternalResourceToObject(initialValue)
        if (JSON.stringify(convertedInitialValue) !== JSON.stringify(formValue)) changedFields.push(key)
      } else {
        changedFields.push(key)
      }
    }
  }

  return changedFields
}

export const changedOrNull = <T extends any>(
  form: Record<string, any>,
  initial: Record<string, any>
): WithNullableValues<T> => {
  const changedFields = getChangedFields(form, initial)

  return Object.entries(form).reduce((prev, [key, value]) => {
    return {
      ...prev,
      [key]: changedFields.includes(key) ? value : null,
    }
  }, {} as WithNullableValues<T>)
}

export const membershipExternalResourceToObject = (externalResources: MemberWithDetails['externalResources']) =>
  externalResources?.reduce((prev, next) => {
    const source = next.source.toString()
    return { ...prev, [source]: next.value }
  }, {})
