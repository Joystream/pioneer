import styled from 'styled-components'

import { ListHeaders, ListHeader } from '@/common/components/List/ListHeader'

export const ProposalColLayout = '296px 148px 156px 60px'
export const ProposalColLayoutWithVoteDetails = ProposalColLayout + ' 80px'

export const ProposalsListHeaders = styled(ListHeaders)`
  padding-right: 16px;
  grid-column-gap: 36px;
  @media (max-width: 1439px) {
    display: none;
  }
`
export const ProposalListHeader = styled(ListHeader)`
  &:last-child {
    position: static;
    justify-content: flex-start;
    text-align: left;
  }
`
export const VoteDisplay = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const VoteStatus = styled.span`
  display: flex;
  align-items: center;
`
