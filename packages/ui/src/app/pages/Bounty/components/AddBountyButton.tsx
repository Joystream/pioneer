import React, { useCallback } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
// import { useModal } from '@/common/hooks/useModal'

export const AddBountyButton = () => {
  // TODO: uncomment when modalCall is ready:
  // const { showModal } = useModal()
  const addNewBountyModal = useCallback(() => {
    // showModal<AddNewBountyModalCall>({
    //   modal: 'AddNewBountyModal',
    // })
    undefined
  }, [])

  return (
    <TransactionButton style="primary" size="medium" onClick={addNewBountyModal}>
      <PlusIcon />
      Create Bounty
    </TransactionButton>
  )
}
