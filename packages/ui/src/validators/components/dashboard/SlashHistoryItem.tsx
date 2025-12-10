import React from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { BlockIcon } from '@/common/components/icons'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { useNetworkEndpoints } from '@/common/hooks/useNetworkEndpoints'
import { SlashEvent } from '@/validators/hooks/useSlashingHistory'

interface SlashHistoryItemProps {
  slash: SlashEvent
}

export const SlashHistoryItem = ({ slash }: SlashHistoryItemProps) => {
  const { allAccounts } = useMyAccounts()
  const [endpoints] = useNetworkEndpoints()

  const account = allAccounts.find((acc) => acc.address === slash.validatorAddress)
  const accountName = account?.name || `${slash.validatorAddress.slice(0, 6)}...${slash.validatorAddress.slice(-4)}`

  const formatDate = () => {
    if (slash.timestamp) {
      return new Date(slash.timestamp).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    }
    return `Era ${slash.era}`
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!slash.blockNumber) return

    const blockLink =
      endpoints.nodeRpcEndpoint == process.env.REACT_APP_MAINNET_NODE_SOCKET
        ? `https://explorer.joystream.org/#/blocks/${slash.blockNumber}`
        : `https://polkadot.js.org/apps/?rpc=${endpoints.nodeRpcEndpoint}#/explorer/query/${slash.blockNumber}`

    window.open(blockLink, '_blank')
  }

  return (
    <SlashHistoryItemWarppers>
      <AccountItemWrap>
        <ValidatorBadge>
          <BadgeStatus inverted size="l">
            {accountName}
          </BadgeStatus>
        </ValidatorBadge>
        <TextMedium bold>{slash.era}</TextMedium>
        <DateInfo>
          <TextSmall>{formatDate()}</TextSmall>
          <BlockInfo>
            <BlockIcon />
            <TextSmall>{slash.blockNumber || '---'} on Babylon network</TextSmall>
          </BlockInfo>
        </DateInfo>
        <TransactionButtonWrapper>
          <LinkIconWrapper onClick={handleLinkClick}>
            <LinkSymbol />
          </LinkIconWrapper>
        </TransactionButtonWrapper>
      </AccountItemWrap>
    </SlashHistoryItemWarppers>
  )
}

const SlashHistoryItemWarppers = styled.div`
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
  grid-template-columns: 276px repeat(2, 228px) 104px;
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

const ValidatorBadge = styled.div`
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    opacity: 0.8;
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
