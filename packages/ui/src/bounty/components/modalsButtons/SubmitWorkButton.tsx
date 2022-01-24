import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal'
import { Bounty } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  bounty: Bounty
}

export const SubmitWorkButton = React.memo(({ bounty }: Props) => {
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
