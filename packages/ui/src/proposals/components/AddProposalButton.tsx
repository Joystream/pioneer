import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal'

export const AddProposalButton = () => {
  const { showModal } = useModal()
  const addNewProposalModal = useCallback(() => {
    showModal<AddNewProposalModalCall>({
      modal: 'AddNewProposalModal',
    })
  }, [])

  return (
    <>
      <ButtonPrimary size="medium" onClick={addNewProposalModal}>
        <PlusIcon />
        Add new proposal
      </ButtonPrimary>
    </>
  )
}
