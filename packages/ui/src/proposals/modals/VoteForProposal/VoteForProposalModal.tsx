import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { TextInlineMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useProposal } from '@/proposals/hooks/useProposal'
import { SuccessModal } from '@/proposals/modals/VoteForProposal/components/SuccessModal'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal/types'
import { VoteForProposalModalForm } from '@/proposals/modals/VoteForProposal/VoteForProposalModalForm'
import { VoteForProposalSignModal } from '@/proposals/modals/VoteForProposal/VoteForProposalSignModal'

import { VoteForProposalMachine as machine, VoteStatus } from './machine'

export const VoteForProposalModal = () => {
  const { hideModal, modalData } = useModal<VoteForProposalModalCall>()
  const { api } = useApi()
  const { active } = useMyMemberships()
  const { proposal, isLoading } = useProposal(modalData.id)
  const transactionFee = useMemo(
    () => (active?.id ? api?.tx.proposalsEngine.vote(active?.id, modalData.id, 'Approve', '') : undefined),
    [active?.id]
  )
  const feeInfo = useTransactionFee(active?.controllerAccount, transactionFee)

  const [state, send] = useMachine(machine)

  useEffect((): any => {
    if (state.matches('requirementsVerification')) {
      if (feeInfo && feeInfo.canAfford) {
        return send('PASS')
      }

      if (feeInfo && !feeInfo.canAfford) {
        return send('FAIL')
      }
    }
  }, [state, JSON.stringify(feeInfo)])

  if (isLoading || !proposal || !api || !active || !feeInfo) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  if (state.matches('vote')) {
    return (
      <VoteForProposalModalForm
        proposalTitle={proposal.title}
        proposalType={proposal.type}
        proposalRationale={proposal.rationale}
        proposalDetails={proposal.details}
        setStatus={(status: VoteStatus) => send('SET_VOTE_STATUS', { status })}
        setRationale={(rationale: string) => send('SET_RATIONALE', { rationale })}
        onNext={() => send('PASS')}
        rationale={proposal.rationale}
        recipient={proposal.proposer.rootAccount}
        proposalType={proposal.type}
      />
    )
  }

  if (state.matches('transaction')) {
    const status = state.context.voteStatus
    const rationale = state.context.rationale
    const proposalId = modalData.id
    const signer = active.controllerAccount
    const transaction = api.tx.proposalsEngine.vote(active.id, proposalId, status, rationale)

    return (
      <VoteForProposalSignModal
        proposalTitle={proposal.title}
        voteStatus={state.context.voteStatus}
        service={state.children.transaction}
        signer={signer}
        transaction={transaction}
      />
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} voteStatus={state.context.voteStatus} proposalTitle={proposal.title} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem while <TextInlineMedium bold>{state.context.voteStatus}</TextInlineMedium> proposal "
        {proposal.title}".
      </FailureModal>
    )
  }

  return null
}
