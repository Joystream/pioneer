import React, { useCallback } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useModal } from '@/common/hooks/useModal'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal'

export const AddProposalButton = () => {
  const { showModal } = useModal()
  const addNewProposalModal = useCallback(() => {
    showModal<AddNewProposalModalCall>({
      modal: 'AddNewProposalModal',
    })
  }, [])

  const { api } = useApi()
  const maxProposals = api?.consts.proposalsEngine.maxActiveProposalLimit
  const currentProposals = useFirstObservableValue(
    () => api?.query.proposalsEngine.activeProposalCount(),
    [api?.isConnected]
  )
  const areProposalSlotsAvailable = api && maxProposals && currentProposals?.lt(maxProposals)

  return (
    <TransactionButton
      style="primary"
      size="medium"
      onClick={addNewProposalModal}
      disabled={!areProposalSlotsAvailable}
    >
      <PlusIcon />
      Add new proposal
    </TransactionButton>
  )
}
