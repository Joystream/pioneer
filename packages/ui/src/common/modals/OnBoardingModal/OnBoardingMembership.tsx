import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import React from 'react'

import { BuyMembershipForm, MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

interface OnBoardingMembershipProps {
  membershipPrice?: BalanceOf
  onSubmit: (params: MemberFormFields) => void
}

export const OnBoardingMembership = ({ membershipPrice, onSubmit }: OnBoardingMembershipProps) => {
  return <BuyMembershipForm membershipPrice={membershipPrice} onSubmit={onSubmit} />
}
