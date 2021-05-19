import React from 'react'
import styled, { css } from 'styled-components'

import { Colors, Transitions } from '../constants'
import { formatDateString, formatTokenValue } from '../model/formatters'
import { Block } from '../types'

import { LabelLink } from './forms'
import { BlockIcon, BlockIconStyles } from './icons'
import { TextMedium, TextSmall } from './typography'

interface Props {
  block: Block
  horizontal?: boolean
  dateLabel?: string
}

export const BlockTime = React.memo(({ block, horizontal, dateLabel }: Props) => (
  <Wrapper horizontal={horizontal}>
    <AboutText>
      {dateLabel && horizontal && dateLabel + ': '}
      {formatDateString(block.timestamp)}
    </AboutText>
    {horizontal && <Separator>{' | '}</Separator>}
    <BlockInfo>
      <BlockIcon />
      <BlockNumber>{formatTokenValue(block.number)}</BlockNumber>
      <BlockNetworkInfo>on {block.network} network</BlockNetworkInfo>
    </BlockInfo>
  </Wrapper>
))

const Separator = styled.span`
  font-size: inherit;
  line-height: inherit;
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
const Wrapper = styled.div<{ horizontal?: boolean }>`
  display: grid;
  width: fit-content;
  height: fit-content;

  ${({ horizontal }) => {
    if (horizontal) {
      return css`
        grid-auto-flow: column;
        grid-column-gap: 8px;
        align-items: center;

        ${AboutText} {
          font-size: 12px;
          line-height: 18px;
          color: ${Colors.Black[400]};
        }
        ${BlockIconStyles} {
          color: ${Colors.Black[500]};
        }
        ${Separator} {
          color: ${Colors.Black[400]};
        }
      `
    } else {
      return css`
        grid-row-gap: 4px;

        ${BlockIconStyles} {
          color: ${Colors.Black[900]};
        }
      `
    }
  }}
`
