import React, { useMemo } from 'react'

import { TileSection } from '@/bounty/components/TileSection'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const ExpiredTiles = () => {
  const { members } = useMyMemberships()

  const firstRow = useMemo(
    () => [
      {
        title: 'Stage',
        content: (
          <TextHuge value bold>
            Working Period
          </TextHuge>
        ),
        tooltipText: 'Lorem ipsum',
      },
      {
        title: 'Period Length',
        content: (
          <TextHuge value bold>
            Perpetual
          </TextHuge>
        ),
        tooltipText: 'Lorem ipsum',
      },
      {
        title: 'Bounty Creator',
        content: <MemberInfo member={members[0]} size="m" memberSize="m" hideGroup />,
      },
      {
        title: 'Oracle',
        content: <MemberInfo member={members[0]} size="m" memberSize="m" hideGroup />,
      },
    ],
    []
  )

  const secondRow = useMemo(
    () => [
      {
        title: 'Funded',
        content: <TokenValue value={10000} size="l" />,
        tooltipText: 'Lorem ipsum',
      },
      {
        title: 'Cherry',
        content: <TokenValue value={10000} size="l" />,
        tooltipText: 'Lorem ipsum',
      },
      {
        title: 'Work submitted',
        content: (
          <TextHuge value bold>
            10
          </TextHuge>
        ),
        tooltipText: 'Lorem ipsum',
      },
    ],
    []
  )

  return <TileSection firstRow={firstRow} secondRow={secondRow} />
}
