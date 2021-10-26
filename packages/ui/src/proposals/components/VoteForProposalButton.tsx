import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
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
    <ButtonPrimary size="small" onClick={voteForProposalModal}>
      Vote
    </ButtonPrimary>
  )
}
