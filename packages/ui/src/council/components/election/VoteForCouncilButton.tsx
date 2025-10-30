import React, { MouseEventHandler } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { VoteForCouncilModalCall } from '@/council/modals/VoteForCouncil'

interface VoteForCouncilButtonProps {
  id: string
  again?: boolean
}

export const VoteForCouncilButton = ({ id, again }: VoteForCouncilButtonProps) => {
  const { showModal } = useModal<VoteForCouncilModalCall>()

  const vote: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    showModal<VoteForCouncilModalCall>({ modal: 'VoteForCouncil', data: { id } })
  }

  return (
    <TransactionButton style="primary" size="medium" onClick={vote}>
      {again ? 'Vote again' : 'Vote'}
    </TransactionButton>
  )
}
