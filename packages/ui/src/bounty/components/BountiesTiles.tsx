import BN from 'bn.js'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TileProps, TileSection } from '@/bounty/components/TileSection'
import { useUserBountiesStatistics } from '@/bounty/hooks/useUserBountiesStatistics'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  onlyContributed?: boolean
}

export const BountiesTiles = ({ onlyContributed = false }: Props) => {
  const { t } = useTranslation('bounty')
  const { active } = useMyMemberships()
  const { statistics } = useUserBountiesStatistics(active?.id || '')
  const firstRow = useMemo(() => {
    const row: TileProps[] = []
    if (!onlyContributed) {
      row.push(
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
          content: <TokenValue value={new BN(statistics.amountEarned ?? 0)} size="l" />,
          tooltipText: t('tiles.earned.tooltip'),
        }
      )
    }

    if (statistics.amountContributed || onlyContributed) {
      row.push({
        title: t('tiles.contributed.title'),
        content: <TokenValue value={statistics.amountContributed} size="l" />,
        tooltipText: t('tiles.contributed.tooltip'),
      })
    }

    return row
  }, [statistics, onlyContributed])

  return <StyledTileSection firstRow={firstRow} />
}

const StyledTileSection = styled(TileSection)`
  > div {
    max-width: max(25%, 125px);
  }
`
