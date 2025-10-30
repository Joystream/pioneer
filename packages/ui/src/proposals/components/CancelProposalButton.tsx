import React, { useCallback } from 'react'

import { ButtonSecondary } from '@/common/components/buttons'
import { useModal } from '@/common/hooks/useModal'
import { Member } from '@/memberships/types'

import { CancelProposalModalCall } from '../modals/CancelProposal'

interface Props {
  member: Member
  proposalId: string
}

export const CancelProposalButton = ({ member, proposalId }: Props) => {
  const { showModal } = useModal()
  const cancelProposalModal = useCallback(() => {
    showModal<CancelProposalModalCall>({
      modal: 'CancelProposalModal',
      data: { member, proposalId },
    })
  }, [])
  return (
    <ButtonSecondary onClick={cancelProposalModal} size="medium">
      Cancel Proposal
    </ButtonSecondary>
  )
}
