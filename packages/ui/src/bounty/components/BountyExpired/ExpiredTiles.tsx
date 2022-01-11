import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TileSection } from '@/bounty/components/TileSection'
import { useGetBountyWorksCountQuery } from '@/bounty/queries'
import { Bounty, isFundingLimited } from '@/bounty/types/Bounty'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'

interface Props {
  bounty: Bounty
}

export const ExpiredTiles = ({ bounty }: Props) => {
  const { t } = useTranslation('bounty')
  const { data } = useGetBountyWorksCountQuery({
    variables: {
      where: {
        entry: {
          bounty: {
            id_eq: bounty.id,
          },
        },
      },
    },
  })

  const firstRow = useMemo(
    () => [
      {
        title: t('tiles.stage.title'),
        content: (
          <TextHuge value bold>
            {t('bountyFields.expired')}
          </TextHuge>
        ),
        tooltipText: t('tiles.stage.tooltip'),
      },
      {
        title: t('tiles.periodLength.title'),
        content: (
          <TextHuge value bold>
            {isFundingLimited(bounty.fundingType) ? 'Limited' : 'Perpetual'}
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
    []
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
    [data]
  )

  return <TileSection firstRow={firstRow} secondRow={secondRow} />
}
