import { useMachine } from '@xstate/react'
import React from 'react'

import { useApi } from '@/common/hooks/useApi'
import { VoteForProposalModalForm } from '@/proposals/modals/VoteForProposal/VoteForProposalModalForm'
import { VoteForProposalSignModal } from '@/proposals/modals/VoteForProposal/VoteForProposalSignModal'

import { VoteForProposalMachine as machine } from './machine'

export const VoteForProposalModal = () => {
  const { api } = useApi()

  // api?.tx.proposalsEngine.vote()

  const [state] = useMachine(machine)

  if (state.matches('vote')) {
    return <VoteForProposalModalForm />
  }

  if (state.matches('transaction')) {
    return <VoteForProposalSignModal />
  }
  return null
}
