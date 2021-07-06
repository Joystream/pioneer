import React from 'react'
import styled from 'styled-components'

import { BlockIcon } from '@/common/components/icons'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextInlineSmall } from '@/common/components/typography'
import { Fonts } from '@/common/constants'
import { formatDateString, formatTokenValue } from '@/common/model/formatters'
import { Block } from '@/common/types'

import { BlockInfo, BlockNetworkInfo, BlockNumber } from './components'

export interface BlockHistoryLineProps {
  block: Block
}
export const BlockHistoryLine = styled(({ block, ...props }: BlockHistoryLineProps) => (
  <div {...props}>
    <TextInlineSmall lighter>{formatDateString(block.timestamp)}</TextInlineSmall>
    <Tooltip
      popupContent={
        <BlockInfo>
          <BlockIcon />
          <BlockNumber>{formatTokenValue(block.number)}</BlockNumber>
          <BlockNetworkInfo>on {block.network} network</BlockNetworkInfo>
        </BlockInfo>
      }
    >
      <TooltipDefault />
    </Tooltip>
  </div>
))`
  display: flex;
  align-items: center;
  column-gap: 8px;

  ${TextInlineSmall} {
    font-family: ${Fonts.Inter};
  }
`
