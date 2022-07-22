import { MembershipMetadata } from '@joystream/metadata-protobuf'
import BN from 'bn.js'

import { CurrencyName } from '@/app/constants/currency'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

export const getMessage = (fee?: BN) => {
  return `Insufficient funds to cover the membership creation. You need at least ${fee?.toString()} ${
    CurrencyName.integerValue
  } on your account for this action.`
}

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
