import React from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PastCouncilProposalsItem } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposalsItem'
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
    <RowGapBlock gap={4}>
      <PastCouncilProposalsHeaders $colLayout={PastCouncilProposalsLayout}>
        <ListHeader>Proposal</ListHeader>
        <ListHeader>Stage</ListHeader>
        <ListHeader>Proposer</ListHeader>
      </PastCouncilProposalsHeaders>
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

export const PastCouncilProposalsHeaders = styled(ListHeaders)`
  padding-right: 16px;
`
