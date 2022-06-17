import { MembershipMetadata } from '@joystream/metadata-protobuf'
import BN from 'bn.js'

import { metadataToBytes } from '@/common/model/JoystreamNode'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

import ResourceType = MembershipMetadata.ExternalResource.ResourceType

export const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the membership creation. You need at least ${fee?.toString()} tJOY on your account for this action.`
}

export const toMemberTransactionParams = (formData: MemberFormFields) => ({
  inviting_member_id: formData.invitor?.id,
  root_account: formData.rootAccount?.address,
  controller_account: formData.controllerAccount?.address,
  handle: formData.handle,
  metadata: metadataToBytes(MembershipMetadata, {
    name: formData.name,
    about: formData.about,
    avatarUri: formData.avatarUri,
    externalResources: toExternalResources(formData.externalResources),
  }),
  referrer_id: formData.referrer?.id,
})

const toExternalResources = (
  resources: MemberFormFields['externalResources']
): MembershipMetadata.IExternalResource[] =>
  Object.entries(resources).map(([social, value]) => ({
    type: ResourceType[social.toUpperCase() as keyof typeof ResourceType],
    value,
  }))
