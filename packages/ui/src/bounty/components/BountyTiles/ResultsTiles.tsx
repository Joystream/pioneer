import BN from 'bn.js'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TileSection } from '@/bounty/components/TileSection'
import { Bounty, isFundingLimited } from '@/bounty/types/Bounty'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { MemberStack } from '@/memberships/components/MemberStack'

interface Props {
  bounty: Bounty
}

export const ResultsTiles = React.memo(({ bounty }: Props) => {
  const { t } = useTranslation('bounty')

  const unwithdrawnFunds = useMemo(() => {
    const withdrawnContributionsAmount = bounty.contributors.reduce(
      (prev, next) => (next.hasWithdrawn ? prev.add(new BN(next.amount)) : prev),
      BN_ZERO
    )

    return bounty.totalFunding.sub(withdrawnContributionsAmount)
  }, [bounty])

  const firstRow = useMemo(
    () => [
      {
        title: t('tiles.stage.title'),
        content: (
          <TextHuge value bold>
            {t(bounty.stage === 'successful' ? 'bountyFields.successful' : 'bountyFields.withdrawalPeriod')}
          </TextHuge>
        ),
        tooltipText: t('tiles.stage.tooltip'),
      },
      {
        title: t('tiles.periodLength.title'),
        content: (
          <TextHuge value bold>
            {isFundingLimited(bounty.fundingType) ? t('bountyFields.limited') : t('bountyFields.perpetual')}
          </TextHuge>
        ),
        tooltipText: t('tiles.periodLength.tooltip'),
      },
      {
        title: t('tiles.bountyCreator.title'),
        content: bounty.creator ? (
          <MemberInfo member={bounty.creator} size="m" memberSize="m" hideGroup />
        ) : (
          <TextHuge value bold>
            {t('common:council')}
          </TextHuge>
        ),
      },
      {
        title: t('tiles.oracle.title'),
        content: bounty.creator ? (
          <MemberInfo member={bounty.creator} size="m" memberSize="m" hideGroup />
        ) : (
          <TextHuge value bold>
            {t('common:council')}
          </TextHuge>
        ),
      },
    ],
    [t, bounty]
  )
  const secondRow = useMemo(() => {
    const winners = bounty.entries?.filter((entry) => entry.winner === true)
    return [
      {
        title: t('tiles.unwithdrawnFunds.title'),
        content: <TokenValue value={unwithdrawnFunds} size="l" />,
        tooltipText: t('tiles.unwithdrawnFunds.tooltip'),
      },
      {
        title: t('tiles.cherry.title'),
        content: <TokenValue value={bounty.cherry} size="l" />,
        tooltipText: t('tiles.cherry.tooltip'),
      },
      {
        title: t('tiles.winners.title'),
        content: winners?.length ? (
          <MemberStack members={winners.map((winner) => winner.worker)} />
        ) : (
          <TextHuge value bold>
            {t('common:none')}
          </TextHuge>
        ),
        tooltipText: t('tiles.winners.tooltip'),
      },
    ]
  }, [t, bounty, unwithdrawnFunds])

  return <TileSection firstRow={firstRow} secondRow={secondRow} />
})
