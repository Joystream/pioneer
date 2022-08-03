import BN from 'bn.js'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import {
  AccountDetailsWrap,
  ButtonsCell,
  DetailLabel,
  DetailsName,
  LockWrapper,
  TitleCell,
  ValueCell,
  VestingStyledDropDown,
} from '@/accounts/components/AccountItem/components/styles'
import { lockIcon } from '@/accounts/components/AccountLocks'
import { Vesting } from '@/accounts/hooks/useVesting'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { SECONDS_PER_BLOCK } from '@/common/constants'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { DefaultDateFormatter } from '@/common/model/formatters'

export const VestingListItem = ({ vested, locked, endBlock, startingBlock, perBlock }: Vesting['vesting'][number]) => {
  const [isDropped, setDropped] = useState(false)

  return (
    <LockWrapper>
      <AccountDetailsWrap onClick={() => setDropped(!isDropped)}>
        <TitleCell>
          {lockIcon('Vesting')}
          <DetailsName>Vesting</DetailsName>
        </TitleCell>
        {!isDropped && (
          <ValueCell>
            <TokenValue value={locked} />
          </ValueCell>
        )}
        <ButtonsCell>
          <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
        </ButtonsCell>
      </AccountDetailsWrap>
      <VestingStyledDropDown isDropped={isDropped}>
        <div>
          <DetailLabel>Starting date:</DetailLabel>
          <TimeToBlock block={startingBlock} />
        </div>
        <div>
          <DetailLabel>Ending date:</DetailLabel>
          <TimeToBlock block={endBlock} />
        </div>
        <div>
          <DetailLabel>Unlocked per block:</DetailLabel>
          <TokenValue value={perBlock} />
        </div>
        <div>
          <DetailLabel>Locked in vesting:</DetailLabel>
          <TokenValue value={locked} />
        </div>
        <div>
          <DetailLabel>Vested claimable</DetailLabel>
          <TokenValue value={vested} />
        </div>
      </VestingStyledDropDown>
    </LockWrapper>
  )
}

const TimeToBlock = ({ block }: { block: BN }) => {
  const currentBlock = useCurrentBlockNumber()
  const timeCurrentMs = Date.now()

  const date = useMemo(() => {
    if (!currentBlock) {
      return
    }

    if (currentBlock <= block) {
      const blocksLeft = block.sub(currentBlock)
      const milisecondsLeft = blocksLeft.muln(SECONDS_PER_BLOCK * 1000)
      return new BN(timeCurrentMs).add(milisecondsLeft).toNumber()
    }

    const blocksLeft = currentBlock.sub(block)
    const milisecondsLeft = blocksLeft.muln(SECONDS_PER_BLOCK * 1000)
    return new BN(timeCurrentMs).sub(milisecondsLeft).toNumber()
  }, [!block, !currentBlock])

  return (
    <StyledRowGapBlock gap={2}>
      <TextMedium bold>{block.toString()}</TextMedium>
      <TextSmall lighter>{date ? DefaultDateFormatter.format(new Date(date)) : '-'}</TextSmall>
    </StyledRowGapBlock>
  )
}

const StyledRowGapBlock = styled(RowGapBlock)`
  > *:last-child {
    width: max-content;
  }
`
