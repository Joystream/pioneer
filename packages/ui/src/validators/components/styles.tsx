import { TableListItem } from '@/common/components/List'
import { ButtonPrimary } from '@/common/components/buttons'
import { Colors } from '@/common/constants'
import styled from 'styled-components'


export const ValidatorOverviewTable = styled(TableListItem)`
  grid-column-gap: 12px;
  height: 92px;
  padding-right: 16px;
  background-color: ${({ $isPast }: { $isPast?: boolean }) => ($isPast ? Colors.Black[50] : Colors.White)};
`

export const ValidatorOverViewClaimButton = styled(ButtonPrimary)`
  margin-left: auto;
`
