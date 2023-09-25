import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PastCouncilProposalsItem } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposalsItem'
import { PastCouncilTabsHeaders } from '@/council/components/pastCouncil/PastCouncilTabs'
import { usePastCouncilProposals } from '@/council/hooks/usePastCouncilProposals'

interface Props {
  councilId: string
}

export const PastCouncilProposals = ({ councilId }: Props) => {
  const { isLoading, proposals } = usePastCouncilProposals(councilId)

  if (isLoading) {
    return <Loading />
  }

  return (
    <PastCouncilProposalsListWrapper gap={4}>
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
    </PastCouncilProposalsListWrapper>
  )
}

export const PastCouncilProposalsLayout = '2fr repeat(3, 1fr)'

const PastCouncilProposalsListWrapper = styled(RowGapBlock)`
  overflow: auto;
  li {
    min-width: 900px;
  }
`
