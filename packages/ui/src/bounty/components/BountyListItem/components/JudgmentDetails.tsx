import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'

interface Props {
  entrants?: Member[]
  worksSubmitted?: number
  withdrawals?: number
}

export const JudgmentDetails = memo(({ entrants, worksSubmitted, withdrawals }: Props) => {
  const { t } = useTranslation('bounty')

  return (
    <>
      {entrants?.length && (
        <DetailBox title={t('entries')}>
          <MemberStack members={entrants} max={5} />
        </DetailBox>
      )}
      <DetailBox title={t('submittedWorks')}>{worksSubmitted}</DetailBox>
      <DetailBox title={t('withdrawals')}>{withdrawals}</DetailBox>
    </>
  )
})
