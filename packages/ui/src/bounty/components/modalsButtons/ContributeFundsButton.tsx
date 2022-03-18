import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'
import { BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

export const ContributeFundsButton = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')
  const { showModal } = useModal()
  const contributeFundsModal = useCallback(() => {
    showModal<BountyContributeFundsModalCall>({
      modal: 'BountyContributeFundsModal',
      data: {
        bounty,
      },
    })
  }, [])

  return (
    <TransactionButton style="primary" size="large" onClick={contributeFundsModal}>
      {t('buttons.contributeFunds')}
    </TransactionButton>
  )
})
