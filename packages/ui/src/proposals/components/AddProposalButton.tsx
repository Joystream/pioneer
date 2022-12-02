import React, { useCallback } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { Tooltip } from '@/common/components/Tooltip'
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

  const txButton = () => (
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

  if (!api) return <Tooltip tooltipText="Connecting to api">{txButton()}</Tooltip>

  if (!areProposalSlotsAvailable)
    return (
      <Tooltip
        tooltipTitle="MAX_ACTIVE_PROPOSALS"
        tooltipText="The creation of new proposals is currently disabled because the number of deciding or gracing proposals is restricted to 20."
        tooltipLinkText="Proposal System Constants"
        tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/proposal-system#constants"
        placement="bottom-end"
      >
        {txButton()}
      </Tooltip>
    )

  return txButton()
}
