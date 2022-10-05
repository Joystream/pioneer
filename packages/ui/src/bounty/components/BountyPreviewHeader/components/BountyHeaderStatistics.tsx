import React from 'react'
import { useTranslation } from 'react-i18next'

import { Bounty } from '@/bounty/types/Bounty'

export const BountyHeaderStatistics = React.memo(({ bounty }: { bounty: Bounty }) => {
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
