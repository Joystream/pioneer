import React from 'react'
import styled from 'styled-components'

import { Colors, Transitions } from '../constants'
import { formatDateString, formatTokenValue } from '../model/formatters'
import { Block } from '../types'

import { LabelLink } from './forms'
import { BlockIcon } from './icons'
import { TextMedium, TextSmall } from './typography'

interface Props {
  block: Block
  time: string
}

export const AboutDateColumn = React.memo(({ time, block }: Props) => (
  <Column>
    <AboutText>{formatDateString(time)}</AboutText>
    <BlockInfo>
      <BlockIcon />
      <BlockNumber>{formatTokenValue(block.number)}</BlockNumber>
      <BlockNetworkInfo>on {block.network} network</BlockNetworkInfo>
    </BlockInfo>
  </Column>
))

const Column = styled.div`
  display: grid;
  grid-row-gap: 4px;
  width: 100%;
  height: fit-content;
`
const AboutText = styled(TextMedium)`
  color: ${Colors.Black[600]};
`
const BlockInfo = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${Colors.Black[400]};
`
const BlockNetworkInfo = styled(TextSmall)`
  color: ${Colors.Black[400]};
`
const BlockNumber = styled(LabelLink)`
  font-size: inherit;
  line-height: inherit;
  transition: ${Transitions.all};
`
