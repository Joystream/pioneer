import React from 'react'
import styled from 'styled-components'

import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextInlineSmall } from '@/common/components/typography'
import { Fonts } from '@/common/constants'
import { formatDateString } from '@/common/model/formatters'

import { BlockInfo, BlockInfoProp } from './BlockInfo'

export const BlockHistoryLine = ({ block }: BlockInfoProp) => (
  <BlockHistoryLineContainer>
    <TextInlineSmall lighter>{formatDateString(block.timestamp)}</TextInlineSmall>
    <Tooltip popupContent={<BlockInfo block={block} />}>
      <TooltipDefault />
    </Tooltip>
  </BlockHistoryLineContainer>
)

const BlockHistoryLineContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  ${TextInlineSmall} {
    font-family: ${Fonts.Inter};
  }
`
