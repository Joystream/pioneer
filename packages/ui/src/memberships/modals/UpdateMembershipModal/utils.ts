import { MembershipMetadata } from '@joystream/metadata-protobuf'
import { SubmittableExtrinsic } from '@polkadot/api/types'

import { Api } from '@/api'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { WithNullableValues } from '@/common/types/form'
import { definedValues } from '@/common/utils'
import { UpdateMemberForm } from '@/memberships/modals/UpdateMembershipModal/types'
import { toExternalResources } from '@/memberships/modals/utils'
import { Member, MemberWithDetails } from '@/memberships/types'

export const hasAnyEdits = (form: Record<string, any>, initial: Record<string, any>) => {
  return !!getChangedFields(form, initial).length
}

export const hasAnyMetadateChanges = (form: Record<string, any>, initial: Record<string, any>) => {
  const metadataFields = ['about', 'avatarUri', 'externalResources', 'validatorAccounts']
  return metadataFields.some((key) => {
    const initialValue = initial[key === 'avatarUri' ? 'avatar' : key] || ''
    const formValue = form[key] || ''
    if (initialValue !== formValue) {
      if (key === 'externalResources' || key === 'validatorAccounts') {
        return JSON.stringify(initialValue) !== JSON.stringify(formValue)
      }
      return true
    }
    return false
  })
}

export const getChangedFields = (form: Record<string, any>, initial: Record<string, any>) => {
  const changedFields = []

  for (const key of Object.keys(form)) {
    if (key === 'validatorCandidate') continue
    const initialValue = initial[key === 'avatarUri' ? 'avatar' : key] || ''
    const formValue = form[key]?.address ?? (form[key] || '')
    if (initialValue !== formValue) {
      if (key === 'externalResources' || key === 'validatorAccounts') {
        if (JSON.stringify(initialValue) !== JSON.stringify(formValue)) changedFields.push(key)
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

const hasEdits = (object: Record<string, any>, fields: string[]) => {
  return fields.some((field) => !!object[field])
}

export function createBatch(
  transactionParams: WithNullableValues<UpdateMemberForm>,
  api: Api | undefined,
  member: Member
) {
  const hasProfileEdits = hasEdits(transactionParams, ['about', 'handle', 'avatarUri', 'name', 'externalResources'])
  const hasAccountsEdits = hasEdits(transactionParams, ['rootAccount', 'controllerAccount'])

  const transactions: SubmittableExtrinsic<'rxjs'>[] = []

  if (!api || !(hasProfileEdits || hasAccountsEdits)) {
    return
  }

  if (hasProfileEdits && !(transactionParams.avatarUri instanceof File)) {
    const updateProfile = api.tx.members.updateProfile(
      member.id,
      transactionParams.handle ?? null,
      metadataToBytes(MembershipMetadata, {
        about: transactionParams.about ?? null,
        name: transactionParams.name ?? null,
        avatarUri: transactionParams.avatarUri ?? null,
        externalResources: transactionParams.externalResources
          ? toExternalResources(definedValues(transactionParams.externalResources))
          : null,
      })
    )
    transactions.push(updateProfile)
  }

  if (hasAccountsEdits) {
    const updateAccounts = api.tx.members.updateAccounts(
      member.id,
      transactionParams.rootAccount?.address || null,
      transactionParams.controllerAccount?.address || null
    )
    transactions.push(updateAccounts)
  }

  return api.tx.utility.batch(transactions)
}
