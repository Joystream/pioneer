import styled from 'styled-components'

import { Colors } from '../../constants'

export const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: ${(props: Partial<{ colLayout?: string }>) => props.colLayout ?? 'repeat(auto-fill, 100px)'};
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
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
  cursor: pointer;

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
