import styled from 'styled-components'

import { Colors } from '../../constants'
import { TextMedium } from '../typography'

export const SidePaneTable = styled.ul`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
  padding: 24px;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    visibility: hidden;
  }
`
export const SidePaneColumn = styled.li`
  display: grid;
  grid-row-gap: 8px;
  width: 100%;
  height: fit-content;
`
export const SidePaneRow = styled.li`
  display: grid;
  grid-template-columns: 168px 1fr;
  grid-column-gap: 24px;
`
export const SidePaneText = styled(TextMedium)`
  color: ${Colors.Black[600]};
`
