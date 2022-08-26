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
    avatarUri: formData.avatarUri,
  }),
  referrerId: formData.referrer?.id,
})
