import React, { useCallback } from 'react'

import { AddBountyModalCall } from '@/bounty/modals/AddBountyModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'

export const AddBountyButton = () => {
  const { showModal } = useModal()
  const addBountyModal = useCallback(() => {
    showModal<AddBountyModalCall>({
      modal: 'AddBounty',
    })
  }, [])

  return (
    <TransactionButton style="primary" size="medium" onClick={addBountyModal}>
      <PlusIcon />
      Create Bounty
    </TransactionButton>
  )
}
