import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { TextInlineSmall } from '@/common/components/typography'
import { Fonts } from '@/common/constants'

// import { formatDateString } from '@/common/model/formatters'
import { BlockInfoProp } from './BlockInfo'

export const BlockHistoryLine = ({ block }: BlockInfoProp) => {
  return (
    <BlockHistoryLineContainer>
      <BlockTime block={block} layout="reverse-start" lessInfo />

      {/* <TextInlineSmall lighter>{formatDateString(block.timestamp)}</TextInlineSmall> */}
    </BlockHistoryLineContainer>
  )
}

const BlockHistoryLineContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  ${TextInlineSmall} {
    font-family: ${Fonts.Inter};
  }
`
