import React, { useEffect } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { useApi } from '@/api/hooks/useApi'
import { FailureModal } from '@/common/components/FailureModal'
import { TextInlineMedium, TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useProposal } from '@/proposals/hooks/useProposal'
import { SuccessModal } from '@/proposals/modals/VoteForProposal/components/SuccessModal'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal/types'
import { VoteForProposalModalForm } from '@/proposals/modals/VoteForProposal/VoteForProposalModalForm'

import { VoteForProposalMachine as machine } from './machine'

export const VoteForProposalModal = () => {
  const { hideModal, modalData } = useModal<VoteForProposalModalCall>()
  const { api } = useApi()
  const { active } = useMyMemberships()
  const { proposal, isLoading } = useProposal(modalData.id)

  const { feeInfo } = useTransactionFee(
    active?.controllerAccount,
    () => (active?.id ? api?.tx.proposalsEngine.vote(active?.id, modalData.id, 'Approve', '') : undefined),
    [active?.id]
  )

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
    const transaction = api.tx.proposalsEngine.vote(active.id, proposalId, status, rationale)

    return (
      <SignTransactionModal
        buttonText="Sign transaction and Vote"
        transaction={transaction}
        signer={active.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>
          You intend to <TextInlineMedium bold>{status}</TextInlineMedium> the Proposal "{proposal.title}".
        </TextMedium>
      </SignTransactionModal>
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
