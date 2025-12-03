import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { useMyStakingRewards } from '@/validators/hooks/useMyStakingRewards'

export const ClaimAllButton = () => {
  const { showModal } = useModal()
  const stakingRewards = useMyStakingRewards()

  const hasClaimableRewards = stakingRewards && stakingRewards.claimableRewards.gtn(0)

  return (
    <ButtonPrimary
      size="small"
      onClick={() => showModal({ modal: 'ClaimStakingRewardsModal' })}
      disabled={!hasClaimableRewards}
    >
      Claim All
    </ButtonPrimary>
  )
}
