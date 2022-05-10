import BN from 'bn.js'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { TokenValue } from '@/common/components/typography'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'

interface Props {
  totalFunding: BN
  entrantStake: BN
  entrants?: Member[]
  worksSubmitted?: number
}

export const WorkingDetails = memo(({ totalFunding, entrantStake, entrants, worksSubmitted }: Props) => {
  const { t } = useTranslation('bounty')

  return (
    <>
      <DetailBox title={t('tabs.bounty')}>
        <TokenValue size="l" value={totalFunding} />
      </DetailBox>
      {!!entrants?.length && (
        <DetailBox title={t('entries')}>
          <MemberStack members={entrants} max={5} />
        </DetailBox>
      )}
      <DetailBox title={t('submittedWorks')}>{worksSubmitted}</DetailBox>
      <DetailBox title={t('stake')}>
        <TokenValue value={entrantStake} />
      </DetailBox>
    </>
  )
})
