import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PastCouncilProposalsItem } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposalsItem'
import { PastCouncilTabsHeaders } from '@/council/components/pastCouncil/PastCouncilTabs'
import { usePastCouncilProposals } from '@/council/hooks/usePastCouncilProposals'
import { PastCouncilProps as Props } from '@/council/types'

export const PastCouncilProposals = ({ cycleId }: Props) => {
  const { isLoading, proposals } = usePastCouncilProposals(cycleId)

  if (isLoading) {
    return <Loading />
  }

  return (
    <RowGapBlock gap={4}>
      <PastCouncilTabsHeaders $colLayout={PastCouncilProposalsLayout}>
        <ListHeader>Proposal</ListHeader>
        <ListHeader>Stage</ListHeader>
        <ListHeader>Proposer</ListHeader>
      </PastCouncilTabsHeaders>
      <List>
        {proposals?.map((proposal) => (
          <ListItem key={proposal.id}>
            <PastCouncilProposalsItem proposal={proposal} />
          </ListItem>
        ))}
      </List>
    </RowGapBlock>
  )
}

export const PastCouncilProposalsLayout = '2fr repeat(3, 1fr)'
