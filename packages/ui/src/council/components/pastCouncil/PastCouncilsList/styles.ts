import styled from 'styled-components'

import { TableListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { ListHeaders } from '@/common/components/List/ListHeader'
import { Colors } from '@/common/constants'

export const PastCouncilColLayout = '48px 176px 156px 156px 112px 112px'

export const PastCouncilListHeaders = styled(ListHeaders)`
  grid-column-gap: 36px;
  padding-right: 16px;
`

export const PastCouncilTableListItem = styled(TableListItem)`
  grid-column-gap: 36px;
  height: 80px;
  padding-right: 16px;
  background-color: ${({ $isPast }: { $isPast?: boolean }) => ($isPast ? Colors.Black[50] : Colors.White)};

  ${TableListItemAsLinkHover};
`
