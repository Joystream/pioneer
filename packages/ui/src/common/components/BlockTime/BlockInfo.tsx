import React from 'react'
import styled, { css } from 'styled-components'

import { BlockIcon } from '@/common/components/icons'
import { TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { formatTokenValue } from '@/common/model/formatters'
import { Block } from '@/common/types'

export interface BlockInfoProp {
  block: Block
  lessInfo?: boolean
  inline?: boolean
}

export const BlockInfo = ({ block, lessInfo, inline }: BlockInfoProp) => (
  <BlockInfoContainer lessInfo={lessInfo} inline={inline}>
    <BlockIcon />
    <span>
      {formatTokenValue(block.number)} {lessInfo && 'block'}
    </span>
    {!lessInfo && <BlockNetworkInfo>on {block.network} network</BlockNetworkInfo>}
  </BlockInfoContainer>
)

export const BlockInfoContainer = styled.span<Omit<BlockInfoProp, 'block'>>`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: max-content;
  height: fit-content;
  color: ${Colors.Black[400]};
  ${({ lessInfo }) =>
    lessInfo &&
    css`
      font-weight: 700;
    `};
`

export const BlockNetworkInfo = styled(TextSmall).attrs({ lighter: true })``
