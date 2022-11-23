import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TileSection } from '@/bounty/components/TileSection'
import { getFundingPeriodLength } from '@/bounty/helpers'
import { Bounty, isFundingLimited } from '@/bounty/types/Bounty'
import { formatDuration } from '@/common/components/statistics'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { MemberInfo } from '@/memberships/components'

interface Props {
  bounty: Bounty
}

export const FundingTiles = React.memo(({ bounty }: Props) => {
  const { t } = useTranslation('bounty')
  const fundingPeriod = getFundingPeriodLength(bounty.fundingType) ?? 0
  const firstRow = useMemo(
    () => [
      {
        title: t('tiles.stage.title'),
        content: (
          <TextHuge value bold>
            {t('bountyFields.fundingPeriod')}
          </TextHuge>
        ),
        tooltipText: t('tiles.stage.tooltip'),
      },
      {
        title: t('tiles.periodLength.title'),
        content: (
          <TextHuge value bold>
            {isFundingLimited(bounty.fundingType) ? (
              <DurationValue value={formatDuration(fundingPeriod)} blocksLeft={bounty.periodTimeLeft} />
            ) : (
              t('bountyFields.perpetual')
            )}
          </TextHuge>
        ),
        tooltipText: t('tiles.periodLength.tooltip'),
      },
      {
        title: t('tiles.duration.title'),
        content: (
          <TextHuge value bold>
            {!isFundingLimited(bounty.fundingType) ? t('tiles.duration.value') : '-'}
          </TextHuge>
        ),
        tooltipText: t('tiles.duration.tooltip'),
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
    return [
      {
        title: t('tiles.cherry.title'),
        content: <TokenValue value={bounty.cherry} size="l" />,
        tooltipText: t('tiles.cherry.tooltip'),
      },
      {
        title: t('tiles.entrantStake.title'),
        content: <TokenValue value={bounty.entrantStake} size="l" />,
        tooltipText: t('tiles.entrantStake.tooltip'),
      },
    ]
  }, [t, bounty])

  const fundedDetails = useMemo(() => {
    const funding = bounty.fundingType
    const isLimited = isFundingLimited(funding)
    const minRangeValue = isLimited ? funding.minAmount : undefined
    const maxRangeValue = isLimited ? funding.maxAmount : funding.target
    return {
      rangeValue: bounty.totalFunding,
      minRangeValue,
      maxRangeValue,
    }
  }, [bounty])

  return <TileSection firstRow={firstRow} secondRow={secondRow} fundedDetails={fundedDetails} />
})
