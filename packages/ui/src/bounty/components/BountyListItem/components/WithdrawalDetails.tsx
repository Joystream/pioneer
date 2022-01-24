import BN from 'bn.js'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'

interface Props {
  winners?: Member[]
  entrants?: Member[]
  unwithdrawnFunds: BN
}

export const WithdrawalDetails = memo(({ winners, entrants, unwithdrawnFunds }: Props) => {
  const { t } = useTranslation('bounty')

  return (
    <>
      <DetailBox title={t('tiles.winners.title')}>
        {winners?.length ? (
          <MemberStack members={winners} max={5} />
        ) : (
          <TextMedium black bold>
            {t('common:none')}
          </TextMedium>
        )}
      </DetailBox>
      {entrants?.length && (
        <DetailBox title={t('entries')}>
          <MemberStack members={entrants} max={5} />
        </DetailBox>
      )}
      <DetailBox title={t('tiles.unwithdrawnFunds.title')}>
        <TokenValue value={unwithdrawnFunds} />
      </DetailBox>
    </>
  )
})
