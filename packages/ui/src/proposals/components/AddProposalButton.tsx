import React, { useCallback, useMemo } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useModal } from '@/common/hooks/useModal'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal'

export const AddProposalButton = () => {
  const { api } = useApi()
  const { showModal } = useModal()
  const addProposalModal = useCallback(() => showModal<AddNewProposalModalCall>({ modal: 'AddNewProposalModal' }), [])

  const maxProposals = useMemo(() => api?.consts.proposalsEngine.maxActiveProposalLimit, [api?.isConnected])
  const proposals = useFirstObservableValue(() => api?.query.proposalsEngine.activeProposalCount(), [api?.isConnected])
  const availableSlots = useMemo(() => Number(maxProposals) - Number(proposals), [proposals, maxProposals])

  const tooltipProps = useMemo(() => {
    if (!api?.isConnected) return { tooltipText: 'Connecting to api' }
    if (availableSlots > 0) {
      return {
        tooltipText: 'Use the proposal engine to suggest a change to the Council.',
        tooltipLinkText: 'Learn about the Proposal System',
        tooltipLinkURL: 'https://joystream.gitbook.io/testnet-workspace/system/proposal-system',
      }
    } else {
      return {
        tooltipTitle: 'Max active proposals limit reached',
        tooltipText: `The creation of proposals is currently disabled because the number of deciding or gracing proposals reached the limit of ${maxProposals}.`,
        tooltipLinkText: 'Proposal System Constants',
        tooltipLinkURL: 'https://joystream.gitbook.io/testnet-workspace/system/proposal-system#constants',
      }
    }
  }, [api?.isConnected, availableSlots])

  return (
    <TransactionButton
      style="primary"
      size="medium"
      tooltip={tooltipProps}
      onClick={addProposalModal}
      disabled={!(availableSlots > 0)}
    >
      <PlusIcon />
      Add new proposal
    </TransactionButton>
  )
}
