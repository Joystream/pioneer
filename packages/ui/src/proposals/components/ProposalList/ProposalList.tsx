import React from 'react'
import styled from 'styled-components'

import { sortingOptions } from '@/bounty/helpers'
import { ProposalOrderByInput } from '@/common/api/queries'
import { List } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SimpleSelect } from '@/common/components/selects'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { GetSortProps } from '@/common/hooks/useSort'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ProposalColLayout, ProposalsListHeaders, ProposalListHeader } from '@/proposals/constants'
import { Proposal } from '@/proposals/types'

import { ProposalListItem } from './ProposalListItem'

export interface ProposalListProps {
  proposals: Proposal[]
  getSortProps?: GetSortProps<ProposalOrderByInput>
  isPast?: boolean
}

const SelectWrapper = styled.div`
  max-width: 150px;
`

export const ProposalList = ({ proposals, getSortProps, isPast }: ProposalListProps) => {
  const { active } = useMyMemberships()
  const { onSort, isDescending } = getSortProps?.('createdAt') || {}
  const isCouncilMember = active?.isCouncilMember

  if (!proposals.length) {
    return <NotFoundText>No proposals matching search criteria</NotFoundText>
  }
  return (
    <RowGapBlock gap={4}>
      <ProposalsListHeaders $colLayout={ProposalColLayout}>
        <ProposalListHeader />
        <ProposalListHeader>Stage</ProposalListHeader>
        <ProposalListHeader>Proposer</ProposalListHeader>
        {isCouncilMember && <ProposalListHeader>My vote</ProposalListHeader>}
        {getSortProps && onSort ? (
          <SelectWrapper>
            <SimpleSelect
              options={sortingOptions}
              value={isDescending ? sortingOptions[0] : sortingOptions[1]}
              onChange={onSort}
            />
          </SelectWrapper>
        ) : null}
      </ProposalsListHeaders>
      <List as="div">
        {proposals.map((proposal) => (
          <ProposalListItem
            key={proposal.id}
            proposal={proposal}
            isPast={isPast}
            memberId={active?.id}
            isCouncilMember={isCouncilMember}
          />
        ))}
      </List>
    </RowGapBlock>
  )
}
