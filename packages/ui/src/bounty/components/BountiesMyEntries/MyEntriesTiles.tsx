import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TileSection } from '@/bounty/components/TileSection'
import { Bounty } from '@/bounty/types/Bounty'
import { TextHuge } from '@/common/components/typography'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

const isContributor = true

interface Props {
  bounty: Bounty
}

export const MyEntriesTiles = ({ bounty }: Props) => {
  const { t } = useTranslation('bounty')
  const { active } = useMyMemberships()

  const firstRow = useMemo(() => {
    const activeMemberEntries = bounty.entries?.filter((entry) => entry.worker.id === active?.id)

    const row = [
      {
        title: t('tiles.myEntries.title'),
        content: (
          <TextHuge value bold>
            {activeMemberEntries?.length || 0}
          </TextHuge>
        ),
        tooltipText: t('tiles.myEntries.tooltip'),
      },
      {
        title: t('tiles.earned.title'),
        content: (
          <TextHuge value bold>
            content
          </TextHuge>
        ),
        tooltipText: t('tiles.earned.tooltip'),
      },
    ]

    if (isContributor) {
      row.push({
        title: t('tiles.contributed.title'),
        content: (
          <TextHuge value bold>
            content
          </TextHuge>
        ),
        tooltipText: t('tiles.contributed.tooltip'),
      })
    }

    return row
  }, [])

  return <TileSection firstRow={firstRow} />
}
