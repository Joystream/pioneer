import React from 'react'
import styled from 'styled-components'

import { LabelLink } from '@/common/components/forms'
import { BlockIcon } from '@/common/components/icons'
import { TextSmall } from '@/common/components/typography'
import { Colors, Transitions } from '@/common/constants'
import { formatTokenValue } from '@/common/model/formatters'
import { Block } from '@/common/types'

export interface BlockInfoProp {
  block: Block
}

export const BlockInfo = ({ block }: BlockInfoProp) => (
  <BlockInfoContainer>
    <BlockIcon />
    <BlockNumber>{formatTokenValue(block.number)}</BlockNumber>
    <BlockNetworkInfo>on {block.network} network</BlockNetworkInfo>
  </BlockInfoContainer>
)

export const BlockInfoContainer = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${Colors.Black[400]};
`
export const BlockNetworkInfo = styled(TextSmall)`
  color: ${Colors.Black[400]};
`
const BlockNumber = styled(LabelLink)`
  font-size: inherit;
  line-height: inherit;
  transition: ${Transitions.all};
`
