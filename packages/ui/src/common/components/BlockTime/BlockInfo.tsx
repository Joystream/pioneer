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
}

export const BlockInfo = ({ block, lessInfo }: BlockInfoProp) => (
  <BlockInfoContainer lessInfo={lessInfo}>
    <BlockIcon />
    <span>
      {formatTokenValue(block.number)} {lessInfo && 'block'}
    </span>
    {!lessInfo && <BlockNetworkInfo>on {block.network} network</BlockNetworkInfo>}
  </BlockInfoContainer>
)

export const BlockInfoContainer = styled.span<{ lessInfo?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${Colors.Black[400]};
  ${({ lessInfo }) =>
    lessInfo &&
    css`
      margin-left: auto;
      font-weight: 700;
    `};
`

export const BlockNetworkInfo = styled(TextSmall).attrs({ lighter: true })``
