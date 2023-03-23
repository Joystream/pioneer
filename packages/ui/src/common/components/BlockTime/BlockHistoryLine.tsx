import React from 'react'
import styled from 'styled-components'

import { Link } from '@/common/components/Link'
import { TextInlineSmall } from '@/common/components/typography'
import { Fonts, Colors } from '@/common/constants'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { formatDateString } from '@/common/model/formatters'

import { BlockInfoProp } from './BlockInfo'

export const BlockHistoryLine = ({ block }: BlockInfoProp) => {
  const [endpoints] = useNetworkEndpoints()
  return (
    <BlockHistoryLineContainer>
      <BlockLink
        href={`https://polkadot.js.org/apps/?rpc=${endpoints.nodeRpcEndpoint}/ws-rpc#/explorer/query/${block.number}`}
      >
        <TextInlineSmall lighter>{formatDateString(block.timestamp)}</TextInlineSmall>
      </BlockLink>
    </BlockHistoryLineContainer>
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
const BlockHistoryLineContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  ${TextInlineSmall} {
    font-family: ${Fonts.Inter};
  }
`
