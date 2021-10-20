import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'
import { AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal'

export const AddProposalButton = () => {
  const { showModal } = useModal()
  const addNewProposalModal = useCallback(() => {
    showModal<AddNewProposalModalCall>({
      modal: 'AddNewProposalModal',
    })
  }, [])
  //only for development purposes - has to be delete
  const voteForProposalModal = useCallback(() => {
    showModal<VoteForProposalModalCall>({
      modal: 'VoteForProposalModal',
    })
    console.log('voteForProposal')
  }, [])

  return (
    <>
      <ButtonPrimary size="medium" onClick={addNewProposalModal}>
        <PlusIcon />
        Add new proposal
      </ButtonPrimary>
      {/*//only for development purposes*/}
      <ButtonPrimary size="medium" onClick={voteForProposalModal}>
        <PlusIcon />
        Vote for proposal
      </ButtonPrimary>
    </>
  )
}
