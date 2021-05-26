import React from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Colors } from '@/common/constants'
import { ProposalColLayout } from '@/proposals/constants'
import { PastProposal, Proposal } from '@/proposals/types'

import { ProposalListItem } from './ProposalListItem'

export type ProposalListProps = CurrentProposalList | PastProposalList
interface CurrentProposalList {
  proposals: Proposal[]
  past?: false
}
interface PastProposalList {
  proposals: PastProposal[]
  past: true
}

export const ProposalList = (props: ProposalListProps) => (
  <ListContainer past={props.past}>
    <ListHeaders colLayout={ProposalColLayout}>
      <ListHeader>{props.past ? 'Created' : 'Ended'}</ListHeader>
      <ListHeader>Stage</ListHeader>
      <ListHeader>Type</ListHeader>
      <ListHeader>Proposer</ListHeader>
    </ListHeaders>
    <List>{props.past ? pastProposalItems(props.proposals) : proposalItems(props.proposals)}</List>
  </ListContainer>
)

const proposalItems = (proposals: Proposal[]) =>
  proposals.map(({ createdAt, ...props }) => <ProposalListItem key={props.id} date={createdAt} {...props} />)

const pastProposalItems = (proposals: PastProposal[]) =>
  proposals.map(({ endedAt, ...props }) => <ProposalListItem key={props.id} date={endedAt} {...props} />)

const ListContainer = styled.div`
  --items-background-color: ${({ past }: { past?: boolean }) => (past ? Colors.Black[50] : Colors.White)};
`
