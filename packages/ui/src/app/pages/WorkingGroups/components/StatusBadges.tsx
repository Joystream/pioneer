import styled from 'styled-components'

import { Colors, Fonts, Overflow } from '@/common/constants'

export const StatusTitleGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 16px;
  align-items: center;
  width: fit-content;
`

export const StatusGroup = styled(StatusTitleGroup)`
  grid-column-gap: 8px;
`

export const StatusBadge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: 84px;
  height: 24px;
  padding: 0px 8px;
  font-family: ${Fonts.Grotesk};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Blue[700]};
  text-transform: uppercase;
  border: 1px solid ${Colors.Blue[100]};
  ${Overflow.FullDots};
`
