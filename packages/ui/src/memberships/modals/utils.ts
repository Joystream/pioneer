import { MembershipMetadata } from '@joystream/metadata-protobuf'

import { metadataToBytes } from '@/common/model/JoystreamNode'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

export const toMemberTransactionParams = (formData: MemberFormFields) => ({
  invitingMemberId: formData.invitor?.id,
  rootAccount: formData.rootAccount?.address,
  controllerAccount: formData.controllerAccount?.address,
  handle: formData.handle,
  metadata: metadataToBytes(MembershipMetadata, {
    name: formData.name,
    about: formData.about,
    ...(formData.externalResources ? { externalResources: toExternalResources(formData.externalResources) } : {}),
    avatarUri: formData.avatarUri instanceof File ? null : formData.avatarUri,
  }),
  referrerId: formData.referrer?.id,
})

export const toExternalResources = (
  resources: MemberFormFields['externalResources']
): MembershipMetadata.IExternalResource[] =>
  Object.entries(resources).map(([social, value]) => ({
    type: MembershipMetadata.ExternalResource.ResourceType[
      social.toUpperCase() as keyof typeof MembershipMetadata.ExternalResource.ResourceType
    ],
    value,
  }))
