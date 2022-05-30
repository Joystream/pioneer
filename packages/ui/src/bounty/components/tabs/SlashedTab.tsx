import React, { useMemo } from 'react'

import { BountySlashedListItem } from '@/bounty/components/BountySlashedListItem/BountySlashedListItem'
import { Bounty } from '@/bounty/types/Bounty'
import { List } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { NotFoundText } from '@/common/components/typography/NotFoundText'

interface Props {
  bounty: Bounty
}

export const SlashedTab = ({ bounty }: Props) => {
  const slashedComponents = useMemo(() => {
    const slashedWorkers = bounty?.entries?.filter((entry) => entry.rejected) ?? []
    if (slashedWorkers.length) {
      return (
        <List as="div">
          {slashedWorkers
            .filter((entry) => entry.rejected)
            .map((entry) => (
              <BountySlashedListItem entrant={entry.worker} stake={entry.stake} inBlock={bounty.judgement?.inBlock} />
            ))}
        </List>
      )
    }

    return <NotFoundText>No slashed workers</NotFoundText>
  }, [bounty])

  return <RowGapBlock gap={4}>{slashedComponents}</RowGapBlock>
}
