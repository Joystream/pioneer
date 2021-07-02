import React from 'react'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { ProposalColLayout } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

import { ProposalListItem } from './ProposalListItem'

export interface ProposalListProps {
  proposals: Proposal[]
  isPast?: boolean
}

export const ProposalList = ({ proposals, isPast }: ProposalListProps) => (
  <RowGapBlock gap={4}>
    <ListHeaders colLayout={ProposalColLayout}>
      <ListHeader>{isPast ? 'Ended' : 'Created'}</ListHeader>
      <ListHeader>Stage</ListHeader>
      <ListHeader>Type</ListHeader>
      <ListHeader>Proposer</ListHeader>
    </ListHeaders>
    <List as="div">
      {proposals.map((proposal) => (
        <ProposalListItem key={proposal.id} proposal={proposal} />
      ))}
    </List>
  </RowGapBlock>
)
