import styled from 'styled-components'

import { ListHeaders, ListHeader } from '@/common/components/List/ListHeader'

export const ProposalColLayout = '296px 148px 1fr 1fr'

export const ProposalsListHeaders = styled(ListHeaders)`
  padding-right: 16px;
  grid-column-gap: 36px;
`
export const ProposalListHeader = styled(ListHeader)`
  &:last-child {
    position: static;
    justify-content: flex-start;
    text-align: left;
  }
`