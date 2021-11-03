import styled from 'styled-components'

import { Colors } from '../../constants'

import { TableListRowStyle } from './List'

export const ListHeaders = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  ${(props: { $colLayout?: string }) => TableListRowStyle(props.$colLayout)}
`
export const ListHeader = styled.span`
  display: flex;
  align-items: center;
  align-content: center;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: left;
  user-select: none;

  &:first-child {
    justify-content: flex-start;
    text-align: left;
  }
  &:nth-child(2) {
    justify-content: flex-start;
    text-align: left;
  }
  &:last-child {
    position: relative;
  }
`

export const EmptyListHeader = ListHeader
