import React from 'react'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { ProposalColLayout } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

import { ProposalListItem } from './ProposalListItem'

export interface ProposalListProps {
  proposals: Proposal[]
}

export const ProposalList = ({ proposals }: ProposalListProps) => (
  <>
    <ListHeaders colLayout={ProposalColLayout}>
      <ListHeader>Created</ListHeader>
      <ListHeader>Stage</ListHeader>
      <ListHeader>Type</ListHeader>
      <ListHeader>Proposer</ListHeader>
    </ListHeaders>
    <List>
      {proposals.map((proposal) => (
        <ProposalListItem key={proposal.id} {...proposal} />
      ))}
    </List>
  </>
)
