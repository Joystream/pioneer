import React from 'react'
import styled, { css } from 'styled-components'

import { spacing } from '@/common/utils/styles'

import { Colors, Transitions } from '../constants'
import { formatDateString, formatTokenValue } from '../model/formatters'
import { Block } from '../types'

import { LabelLink } from './forms'
import { BlockIcon } from './icons'
import { TextMedium, TextSmall } from './typography'

interface Props {
  block: Block
  horizontal?: boolean
}

export const AboutDateColumn = React.memo(({ block, horizontal }: Props) => (
  <Wrapper horizontal={horizontal}>
    <AboutText>{formatDateString(block.timestamp)}</AboutText>
    {horizontal && <Separator>|</Separator>}
    <BlockInfo>
      <BlockIcon />
      <BlockNumber>{formatTokenValue(block.number)}</BlockNumber>
      <BlockNetworkInfo>on {block.network} network</BlockNetworkInfo>
    </BlockInfo>
  </Wrapper>
))

const Separator = styled.span`
  margin: ${spacing(0, 1)};
`

const Wrapper = styled.div<{ horizontal?: boolean }>`
  width: 100%;
  height: fit-content;

  ${({ horizontal }) => {
    if (!horizontal) {
      return css`
        display: grid;
        grid-row-gap: 4px;
      `
    }
    return css`
      display: flex;
      align-items: center;
    `
  }}
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
