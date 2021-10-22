import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { TableListItem } from '@/common/components/List'
import { ListHeaders } from '@/common/components/List/ListHeader'
import { Colors } from '@/common/constants'

export const PastVoteColumns = '48px 176px 146px 156px 156px 72px 132px'

export const PastVoteListHeaders = styled(ListHeaders)`
  grid-column-gap: 12px;
  padding-right: 16px;
`

export const PastVoteTableListItem = styled(TableListItem)`
  grid-column-gap: 12px;
  height: 92px;
  padding-right: 16px;
  background-color: ${({ $isPast }: { $isPast?: boolean }) => ($isPast ? Colors.Black[50] : Colors.White)};
`

export const StakeRecoveringButton = styled(ButtonPrimary)`
  margin-left: auto;
`
