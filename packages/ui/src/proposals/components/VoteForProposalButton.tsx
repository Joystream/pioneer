import React, { useCallback } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal'

interface Props {
  id: string
}

export const VoteForProposalButton = ({ id }: Props) => {
  const { showModal } = useModal()
  const voteForProposalModal = useCallback(() => {
    showModal<VoteForProposalModalCall>({
      modal: 'VoteForProposalModal',
      data: { id },
    })
  }, [])
  return (
    <TransactionButton style="primary" size="small" onClick={voteForProposalModal}>
      Vote
    </TransactionButton>
  )
}
