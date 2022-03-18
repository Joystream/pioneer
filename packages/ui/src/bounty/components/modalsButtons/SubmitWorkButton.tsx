import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

export const SubmitWorkButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const submitWorkModal = useCallback(() => {
    showModal<SubmitWorkModalCall>({
      modal: 'SubmitWork',
      data: {
        bounty,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={submitWorkModal}>
      {t('buttons.submitWork')}
    </TransactionButton>
  )
})
