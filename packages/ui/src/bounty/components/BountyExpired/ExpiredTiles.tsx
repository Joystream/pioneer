import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TileSection } from '@/bounty/components/TileSection'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const ExpiredTiles = () => {
  const { t } = useTranslation('bounty')
  const { members } = useMyMemberships()

  const firstRow = useMemo(
    () => [
      {
        title: t('tiles.stage.title'),
        content: (
          <TextHuge value bold>
            Working Period
          </TextHuge>
        ),
        tooltipText: t('tiles.stage.tooltip'),
      },
      {
        title: t('tiles.periodLength.title'),
        content: (
          <TextHuge value bold>
            Perpetual
          </TextHuge>
        ),
        tooltipText: t('tiles.periodLength.tooltip'),
      },
      {
        title: t('tiles.bountyCreator.title'),
        content: <MemberInfo member={members[0]} size="m" memberSize="m" hideGroup />,
      },
      {
        title: t('tiles.oracle.title'),
        content: <MemberInfo member={members[0]} size="m" memberSize="m" hideGroup />,
      },
    ],
    []
  )

  const secondRow = useMemo(
    () => [
      {
        title: t('tiles.funded.title'),
        content: <TokenValue value={10000} size="l" />,
        tooltipText: t('tiles.funded.tooltip'),
      },
      {
        title: t('tiles.cherry.title'),
        content: <TokenValue value={10000} size="l" />,
        tooltipText: t('tiles.cherry.tooltip'),
      },
      {
        title: t('tiles.worksSubmitted.title'),
        content: (
          <TextHuge value bold>
            10
          </TextHuge>
        ),
        tooltipText: t('tiles.worksSubmitted.tooltip'),
      },
    ],
    []
  )

  return <TileSection firstRow={firstRow} secondRow={secondRow} />
}
