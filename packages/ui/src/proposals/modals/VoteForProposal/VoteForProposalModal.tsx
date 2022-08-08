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

import { VoteForProposalMachine as machine } from './machine'

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

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (feeInfo) {
        send(feeInfo.canAfford ? 'NEXT' : 'FAIL')
      }
    }
  }, [state.value, feeInfo?.canAfford])

  if (!proposal || !api || !active || !feeInfo) {
    if (!isLoading) {
      return <FailureModal onClose={hideModal}>Looks like we could not find this proposal</FailureModal>
    }

    return null
  }

  if (state.matches('requirementsFailed')) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  if (state.matches('vote')) {
    return <VoteForProposalModalForm proposal={proposal} send={send} context={state.context} />
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
    const proposalId = modalData.id
    return (
      <SuccessModal
        onClose={hideModal}
        voteStatus={state.context.voteStatus}
        proposalTitle={proposal.title}
        proposalId={proposalId}
      />
    )
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
