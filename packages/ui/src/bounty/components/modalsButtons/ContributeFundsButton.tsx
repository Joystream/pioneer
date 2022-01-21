import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal'
import { Bounty } from '@/bounty/types/Bounty'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'

interface Props {
  bounty: Bounty
}

export const ContributeFundsButton = ({ bounty }: Props) => {
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
}
