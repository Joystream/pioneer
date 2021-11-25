import React from 'react'

import { SetMembershipAccount } from '@/common/providers/onboarding/types'
import { BuyMembershipForm, MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'

interface OnBoardingMembershipProps {
  membershipAccount: string
  setMembershipAccount: SetMembershipAccount
  onSubmit: (params: MemberFormFields) => void
}

export const OnBoardingMembership = ({
  membershipAccount,
  setMembershipAccount,
  onSubmit,
}: OnBoardingMembershipProps) => {
  return (
    <BuyMembershipForm
      type="onBoarding"
      membershipAccount={membershipAccount}
      changeMembershipAccount={() => setMembershipAccount(undefined)}
      onSubmit={onSubmit}
    />
  )
}
