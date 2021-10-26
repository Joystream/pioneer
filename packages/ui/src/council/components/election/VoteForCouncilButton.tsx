import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { VoteForCouncilModalCall } from '@/council/modals/VoteForCouncil'

interface VoteForCouncilButtonProps {
  id: string
  again?: boolean
}

export const VoteForCouncilButton = ({ id, again }: VoteForCouncilButtonProps) => {
  const { showModal } = useModal<VoteForCouncilModalCall>()

  const vote = useCallback(
    () => showModal<VoteForCouncilModalCall>({ modal: 'VoteForCouncil', data: { id } }),
    [showModal]
  )

  return (
    <ButtonPrimary size="medium" onClick={vote}>
      {again ? 'Vote again' : 'Vote'}
    </ButtonPrimary>
  )
}
