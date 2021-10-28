import React from 'react'

import { List, ListItem } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PastCouncilMembersItem } from '@/council/components/pastCouncil/PastCouncilMembers/PastCouncilMembersItem'
import { PastCouncilProposalsItem } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposalsItem'
import { usePastCouncilMembers } from '@/council/hooks/usePastCouncilMembers'
import { usePastCouncilProposalsStats } from '@/council/hooks/usePastCouncilProposalsStats'
import { Proposal } from '@/proposals/types'

interface Props {
  councilId: string
}

export const PastCouncilProposals = ({ councilId }: Props) => {
  // const { isLoading, proposals } = usePastCouncilProposalsStats(councilId)
  //
  // if (isLoading) {
  //   return <Loading />
  // }

  const proposals: Proposal[] = []

  return (
    <RowGapBlock gap={4}>
      <ListHeaders $colLayout={PastCouncilProposalsLayout}>
        <ListHeader>Proposal</ListHeader>
        <ListHeader>Stage</ListHeader>
        <ListHeader>Proposer</ListHeader>
      </ListHeaders>
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
