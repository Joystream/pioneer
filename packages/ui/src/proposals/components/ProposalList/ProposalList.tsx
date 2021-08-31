import React from 'react'

import { List } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { ProposalColLayout, ProposalsListHeaders } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

import { ProposalListItem } from './ProposalListItem'

export interface ProposalListProps {
  proposals: Proposal[]
  isPast?: boolean
}

export const ProposalList = ({ proposals, isPast }: ProposalListProps) => {
  if (!proposals.length) {
    return <NotFoundText>No proposals matching search criteria</NotFoundText>
  }
  return (
    <RowGapBlock gap={4}>
      <ProposalsListHeaders $colLayout={ProposalColLayout}>
        <ListHeader />
        <ListHeader>Stage</ListHeader>
        <ListHeader>Proposer</ListHeader>
        <ListHeader />
      </ProposalsListHeaders>
      <List as="div">
        {proposals.map((proposal) => (
          <ProposalListItem key={proposal.id} proposal={proposal} isPast={isPast} />
        ))}
      </List>
    </RowGapBlock>
  )
}
