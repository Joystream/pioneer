import React from 'react'
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
export const SidePaneColumn = styled.div`
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
export const SidePaneWideRow = styled(SidePaneRow)`
  grid-template-columns: 1fr;
`
export const SidePaneText = styled(TextMedium)`
  color: ${Colors.Black[600]};
`

interface LabelProps {
  text: string
  className?: any
}

export const SidePaneLabel = React.memo(({ text, className }: LabelProps) => {
  return (
    <AboutLabel title={text} className={className}>
      {text}
    </AboutLabel>
  )
})

export const AboutLabel = styled.h6`
  width: fit-content;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`
