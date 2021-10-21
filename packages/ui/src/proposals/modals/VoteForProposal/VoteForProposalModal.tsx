import { useMachine } from '@xstate/react'
import React from 'react'

import { useApi } from '@/common/hooks/useApi'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { VoteForProposalModalForm } from '@/proposals/modals/VoteForProposal/VoteForProposalModalForm'
import { VoteForProposalSignModal } from '@/proposals/modals/VoteForProposal/VoteForProposalSignModal'

import { VoteForProposalMachine as machine, VoteStatus } from './machine'

export const VoteForProposalModal = () => {
  const { api } = useApi()
  const { active } = useMyMemberships()

  // api?.tx.proposalsEngine.vote()

  const [state, send] = useMachine(machine)

  if (state.matches('vote')) {
    return (
      <VoteForProposalModalForm
        setStatus={(status: VoteStatus) => send('SET_VOTE_STATUS', { status })}
        setRationale={(rationale: string) => send('SET_RATIONALE', { rationale })}
        onNext={() => send('PASS')}
      />
    )
  }

  if (state.matches('transaction') && api && active) {
    const status = state.context.voteStatus
    const rationale = state.context.rationale
    const proposalId = '0'
    const signer = active.controllerAccount
    const transaction = api.tx.proposalsEngine.vote(active.id, proposalId, status, rationale)

    return <VoteForProposalSignModal service={state.children.transaction} signer={signer} transaction={transaction} />
  }
  return null
}
