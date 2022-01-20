import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'
import membersMock from '@/mocks/data/raw/members.json'

interface Props {
  entrants?: Member[]
}

export const JudgmentDetails = memo(({ entrants }: Props) => {
  const { t } = useTranslation('bounty')

  return (
    <>
      {entrants?.length && (
        <DetailBox title={t('entries')}>
          <MemberStack members={membersMock} max={5} />
        </DetailBox>
      )}
      {/* TODO: handle works counting */}
      <DetailBox title={t('submittedWorks')}>2</DetailBox>
      <DetailBox title={t('withdrawals')}>0</DetailBox>
    </>
  )
})
