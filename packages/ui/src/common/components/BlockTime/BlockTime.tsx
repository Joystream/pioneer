import React from 'react'
import styled, { css } from 'styled-components'

import { BlockIconStyles } from '@/common/components/icons'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { formatDateString } from '@/common/model/formatters'
import { Block } from '@/common/types'

import { BlockInfo, BlockInfoContainer, BlockNetworkInfo } from './BlockInfo'

export interface BlockTimeProps extends BlockTimeLayoutProps {
  block: Block
  dateLabel?: string
  lessInfo?: boolean
}

interface BlockTimeLayoutProps {
  layout?: 'row' | 'column' | 'reverse' | 'reverse-start'
  position?: 'start' | 'end'
}

export const BlockTime = React.memo(({ block, layout, dateLabel, lessInfo, position = 'start' }: BlockTimeProps) => (
  <BlockTimeWrapper layout={layout} position={position}>
    <AboutText>
      {dateLabel && layout == 'row' && dateLabel + ': '}
      {formatDateString(block.timestamp)}
    </AboutText>
    {layout == 'row' && <Separator>{' | '}</Separator>}
    <BlockInfo block={block} lessInfo={lessInfo} />
  </BlockTimeWrapper>
))

const Separator = styled.span`
  font-size: inherit;
  line-height: inherit;
`

const AboutText = styled(TextMedium)`
  color: ${Colors.Black[600]};
  width: max-content;
`

export const BlockTimeWrapper = styled.div<BlockTimeLayoutProps>`
  display: grid;
  width: fit-content;
  height: fit-content;
  justify-items: ${({ position }) => position ?? 'start'};

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
            white-space: nowrap;
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
      case 'reverse-start':
        return css`
          justify-content: start;
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

          ${BlockInfoContainer} {
            color: ${Colors.Black[900]};
            margin-left: 0;
          }

          ${BlockNetworkInfo} {
            color: ${Colors.Black[900]};
          }
        `
      case 'reverse':
      default:
        return css`
          justify-content: end;
          text-align: right;
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

          ${BlockInfoContainer} {
            color: ${Colors.Black[900]};
          }

          ${BlockNetworkInfo} {
            color: ${Colors.Black[900]};
          }
        `
    }
  }}
`
