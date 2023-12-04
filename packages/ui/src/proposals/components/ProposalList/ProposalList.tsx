import React from 'react'
import styled from 'styled-components'

import { ProposalOrderByInput } from '@/common/api/queries'
import { List } from '@/common/components/List'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
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
  isLoading: boolean
}

export const ProposalList = ({ proposals, getSortProps, isPast, isLoading }: ProposalListProps) => {
  const { active } = useMyMemberships()
  const isCouncilMember = active?.isCouncilMember

  if (isLoading) {
    return <Loading />
  }

  if (!proposals.length) {
    return <NotFoundText>No proposals matching search criteria</NotFoundText>
  }

  return (
    <RowGapBlock gap={4}>
      <ProposalsListHeaders $colLayout={ProposalColLayout(isCouncilMember, isPast)}>
        {getSortProps ? <SortHeader {...getSortProps('title')}>Title</SortHeader> : <ProposalListHeader />}
        <ProposalListHeader>Stage</ProposalListHeader>
        <ProposalListHeader>Proposer</ProposalListHeader>
        {isPast && getSortProps && <SortHeader {...getSortProps('createdAt')}>Ended</SortHeader>}
        <ProposalListHeader>{isCouncilMember && 'My vote'}</ProposalListHeader>
      </ProposalsListHeaders>
      <ProposalListWarpper as="div">
        {proposals.map((proposal) => (
          <ProposalListItem
            key={proposal.id}
            proposal={proposal}
            isPast={isPast}
            memberId={active?.id}
            isCouncilMember={isCouncilMember}
          />
        ))}
      </ProposalListWarpper>
    </RowGapBlock>
  )
}

const ProposalListWarpper = styled(List)`
  @media (max-width: 1439px) {
    row-gap: 16px;
  }
`
