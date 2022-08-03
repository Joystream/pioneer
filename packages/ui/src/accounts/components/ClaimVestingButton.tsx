import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'

export const ClaimVestingButton = () => {
  const { showModal } = useModal()

  return (
    <ButtonPrimary size="medium" onClick={() => showModal({ modal: 'ClaimVestingModal' })}>
      Claim vesting
    </ButtonPrimary>
  )
}
