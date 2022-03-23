import React from 'react'
import { useTranslation } from 'react-i18next'

import { BountyHeaderButtonsProps } from '@/bounty/components/BountyPreviewHeader/types'

export const BountyHeaderStatistics = React.memo(({ bounty }: BountyHeaderButtonsProps) => {
  const { t } = useTranslation('bounty')

  return (
    <>
      <div>
        {t('bountyFields.cherry')} {bounty.cherry.toNumber()}
      </div>
      <div>
        {t('bountyFields.entrantStake')} {bounty.entrantStake.toNumber()}
      </div>
    </>
  )
})
