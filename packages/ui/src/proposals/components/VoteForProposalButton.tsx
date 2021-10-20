import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
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
    <ButtonPrimary size="medium" onClick={voteForProposalModal}>
      <PlusIcon />
      Vote for proposal
    </ButtonPrimary>
  )
}
