import React, { MouseEventHandler, useCallback } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { VoteForCouncilModalCall } from '@/council/modals/VoteForCouncil'

interface VoteForCouncilButtonProps {
  id: string
  again?: boolean
}

export const VoteForCouncilButton = ({ id, again }: VoteForCouncilButtonProps) => {
  const { showModal } = useModal<VoteForCouncilModalCall>()

  const vote = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.stopPropagation()
      showModal<VoteForCouncilModalCall>({ modal: 'VoteForCouncil', data: { id } })
    },
    [showModal]
  )

  return (
    <TransactionButton style="primary" size="medium" onClick={vote}>
      {again ? 'Vote again' : 'Vote'}
    </TransactionButton>
  )
}
