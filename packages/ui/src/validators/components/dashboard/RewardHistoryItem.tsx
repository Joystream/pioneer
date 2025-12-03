import React from 'react'
import styled from 'styled-components'

import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { BlockIcon } from '@/common/components/icons'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { RewardPayoutEvent } from '@/validators/hooks/useRewardHistory'

interface RewardHistoryItemProps {
  reward: RewardPayoutEvent
}

export const RewardHistoryItem = ({ reward }: RewardHistoryItemProps) => {
  const [endpoints] = useNetworkEndpoints()

  // Format date
  const formatDate = () => {
    if (reward.timestamp) {
      return new Date(reward.timestamp).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    }
    // Fallback format for test data
    return `Era ${reward.era}`
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!reward.blockNumber) return

    const blockLink =
      endpoints.nodeRpcEndpoint == process.env.REACT_APP_MAINNET_NODE_SOCKET
        ? `https://explorer.joystream.org/#/blocks/${reward.blockNumber}`
        : `https://polkadot.js.org/apps/?rpc=${endpoints.nodeRpcEndpoint}#/explorer/query/${reward.blockNumber}`

    window.open(blockLink, '_blank')
  }

  return (
    <RewardHistoryItemWrappers>
      <AccountItemWrap>
        <TokenValue value={reward.amount} />
        <TextMedium bold>{reward.era}</TextMedium>
        <DateInfo>
          <TextSmall>{formatDate()}</TextSmall>
          <BlockInfo>
            <BlockIcon />
            <TextSmall>{reward.blockNumber || '---'} on Babylon network</TextSmall>
          </BlockInfo>
        </DateInfo>
        <TransactionButtonWrapper>
          <LinkIconWrapper onClick={handleLinkClick}>
            <LinkSymbol />
          </LinkIconWrapper>
        </TransactionButtonWrapper>
      </AccountItemWrap>
    </RewardHistoryItemWrappers>
  )
}

const RewardHistoryItemWrappers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(2, 247px) 32px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px;
  margin: -1px;
  gap: 16px;

  ${Skeleton} {
    min-width: 80%;
    height: 1.2rem;
  }
`

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const BlockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${Colors.Black[500]};
`

const LinkIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${Transitions.all};

  &:hover {
    opacity: 0.7;
  }
`
