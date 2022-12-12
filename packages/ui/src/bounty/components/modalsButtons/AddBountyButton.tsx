import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

// import { AddBountyModalCall } from '@/bounty/modals/AddBountyModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { useModal } from '@/common/hooks/useModal'

export const AddBountyButton = () => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const addBountyModal = useCallback(() => {
    showModal({
      modal: 'AddBounty',
    })
  }, [])

  return (
    <TransactionButton style="primary" size="medium" onClick={addBountyModal}>
      <PlusIcon />
      {t('buttons.createBounty')}
    </TransactionButton>
  )
}
