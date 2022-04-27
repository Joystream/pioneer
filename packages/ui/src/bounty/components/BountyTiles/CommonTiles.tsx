import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TileSection } from '@/bounty/components/TileSection'
import { useGetBountyWorksCountQuery } from '@/bounty/queries'
import { Bounty } from '@/bounty/types/Bounty'
import { formatDuration } from '@/common/components/statistics/BlockDurationStatistics'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { SECONDS_PER_BLOCK } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'

interface Props {
  bounty: Bounty
  period: 'working' | 'judgement' | 'expired' | 'terminated'
}

const getSecondsPast = (createdAt: string) => (new Date().getTime() - new Date(createdAt).getTime()) / 1000

export const CommonTiles = React.memo(({ bounty, period }: Props) => {
  const { t } = useTranslation('bounty')
  const { data } = useGetBountyWorksCountQuery({
    variables: {
      where: {
        bounty: {
          id_eq: bounty.id,
        },
      },
    },
  })
  const periodLength = useMemo(() => {
    // Block left here is incorrect, instead of bounty.createdAt, it should be timestamp of BountyFundedEvent timestamp.
    // Reason behind it is that we don't know when funding period ended
    const blocksLeft = bounty.workPeriod - getSecondsPast(bounty.createdAt) / SECONDS_PER_BLOCK
    switch (period) {
      case 'working':
        return <DurationValue value={formatDuration(1000)} blocksLeft={blocksLeft} />
      case 'judgement':
        return <DurationValue value={formatDuration(bounty.judgingPeriod)} />
      case 'expired':
      case 'terminated':
        return t('tiles.periodLength.closed')
    }
  }, [t, bounty, period])

  const firstRow = useMemo(
    () => [
      {
        title: t('tiles.stage.title'),
        content: (
          <TextHuge value bold>
            {t(`bountyFields.${period}`)}
          </TextHuge>
        ),
        tooltipText: t('tiles.stage.tooltip'),
      },
      {
        title: t('tiles.periodLength.title'),
        content: (
          <TextHuge value bold>
            {periodLength}
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
        content: bounty.oracle && <MemberInfo member={bounty.oracle} size="m" memberSize="m" hideGroup />,
      },
    ],
    [t, bounty]
  )

  const secondRow = useMemo(
    () => [
      {
        title: t('tiles.funded.title'),
        content: <TokenValue value={bounty.totalFunding} size="l" />,
        tooltipText: t('tiles.funded.tooltip'),
      },
      {
        title: t('tiles.cherry.title'),
        content: <TokenValue value={bounty.cherry} size="l" />,
        tooltipText: t('tiles.cherry.tooltip'),
      },
      {
        title: t('tiles.worksSubmitted.title'),
        content: (
          <TextHuge value bold>
            {data?.workSubmittedEventsConnection.totalCount}
          </TextHuge>
        ),
        tooltipText: t('tiles.worksSubmitted.tooltip'),
      },
    ],
    [data, t, bounty]
  )

  return <TileSection firstRow={firstRow} secondRow={secondRow} />
})
