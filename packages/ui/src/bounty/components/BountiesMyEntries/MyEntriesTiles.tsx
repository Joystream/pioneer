import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TileSection } from '@/bounty/components/TileSection'
import { useUserBountiesStatistics } from '@/bounty/hooks/useUserBountiesStatistics'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const MyEntriesTiles = () => {
  const { t } = useTranslation('bounty')
  const { active } = useMyMemberships()
  const { statistics } = useUserBountiesStatistics(active?.id || '')

  const firstRow = useMemo(() => {
    const row = [
      {
        title: t('tiles.myEntries.title'),
        content: (
          <TextHuge value bold>
            {statistics.entriesSubmitted}
          </TextHuge>
        ),
        tooltipText: t('tiles.myEntries.tooltip'),
      },
      {
        title: t('tiles.earned.title'),
        content: <TokenValue value={statistics.amountEarned} size="l" />,
        tooltipText: t('tiles.earned.tooltip'),
      },
    ]

    if (statistics.amountContributed) {
      row.push({
        title: t('tiles.contributed.title'),
        content: <TokenValue value={statistics.amountContributed} size="l" />,
        tooltipText: t('tiles.contributed.tooltip'),
      })
    }

    return row
  }, [statistics])

  return <StyledTileSection firstRow={firstRow} />
}

const StyledTileSection = styled(TileSection)`
  > div {
    max-width: max(25%, 125px);
  }
`
