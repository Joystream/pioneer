import React from 'react'
import styled, { css } from 'styled-components'

import { BlockIcon } from '@/common/components/icons'
import { Link } from '@/common/components/Link'
import { Tooltip } from '@/common/components/Tooltip'
import { TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { formatTokenValue } from '@/common/model/formatters'
import { Block } from '@/common/types'

export interface BlockInfoProp {
  block: Block
  lessInfo?: boolean
  inline?: boolean
}

export const BlockInfo = ({ block, lessInfo, inline }: BlockInfoProp) => {
  const [endpoints] = useNetworkEndpoints()
  const explorerURLBase = `https://polkadot.js.org/apps/?rpc=${endpoints.nodeRpcEndpoint}/ws-rpc#/explorer/query/`
  const tooltipLinkURL = explorerURLBase + block.number
  const tooltipText = <BlockNetworkInfo>Produced on {block.network} network.</BlockNetworkInfo>

  return (
    <BlockInfoContainer lessInfo={lessInfo} inline={inline}>
      <Tooltip
        tooltipTitle="Block"
        tooltipText={tooltipText}
        tooltipLinkURL={tooltipLinkURL}
        tooltipLinkText="Open in Block Explorer"
      >
        <BlockIcon />
        <span>
          {lessInfo && 'Block'} {formatTokenValue(block.number)}
        </span>
      </Tooltip>
    </BlockInfoContainer>
  )
}

const BlockLink = styled(Link)`
  svg,
  span {
    color: ${Colors.Black[900]};
  }
  :hover {
    svg,
    span {
      color: ${Colors.LogoPurple};
    }
  }
`

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
