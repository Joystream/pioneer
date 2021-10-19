import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { VoteForCouncilModalCall } from '@/council/modals/VoteForCouncil'

export const VoteForCouncilButton = (data: VoteForCouncilModalCall['data']) => {
  const { showModal } = useModal<VoteForCouncilModalCall>()

  const vote = useCallback(
    () => showModal<VoteForCouncilModalCall>({ modal: 'VoteForCouncil', data }),
    [showModal]
  )
  return (
    <ButtonPrimary size="medium" onClick={vote}>
      Vote
    </ButtonPrimary>
  )
}
