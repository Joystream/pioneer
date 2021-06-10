import React from 'react'
import styled, { css } from 'styled-components'

import { Colors, Transitions } from '../constants'
import { formatDateString, formatTokenValue } from '../model/formatters'
import { Block } from '../types'

import { LabelLink } from './forms'
import { BlockIcon, BlockIconStyles } from './icons'
import { TextMedium, TextSmall } from './typography'

export interface BlockTimeProps extends BlockTimeLayoutProps {
  block: Block
  dateLabel?: string
}

interface BlockTimeLayoutProps {
  layout?: 'row' | 'column' | 'reverse'
}

export const BlockTime = React.memo(({ block, layout, dateLabel }: BlockTimeProps) => (
  <Wrapper layout={layout}>
    <AboutText>
      {dateLabel && layout == 'row' && dateLabel + ': '}
      {formatDateString(block.timestamp)}
    </AboutText>
    {layout == 'row' && <Separator>{' | '}</Separator>}
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
const Wrapper = styled.div<BlockTimeLayoutProps>`
  display: grid;
  width: fit-content;
  height: fit-content;

  ${({ layout }) => {
    switch (layout) {
      case 'row':
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
      case 'column':
        return css`
          grid-row-gap: 4px;

          ${BlockIconStyles} {
            color: ${Colors.Black[900]};
          }
        `
      case 'reverse':
      default:
        return css`
          grid-row-gap: 8px;
          ${AboutText} {
            font-size: 12px;
            line-height: 18px;
            color: ${Colors.Black[500]};
            order: 1;
          }
          ${BlockIconStyles} {
            color: ${Colors.Black[900]};
          }
          ${BlockInfo} {
            color: ${Colors.Black[900]};
          }
          ${BlockNetworkInfo} {
            color: ${Colors.Black[900]};
          }
        `
    }
  }}
`
