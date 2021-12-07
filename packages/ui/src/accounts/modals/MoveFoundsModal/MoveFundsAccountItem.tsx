import BN from 'bn.js'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { MemberRow } from '@/accounts/modals/MoveFoundsModal/styles'
import { Account, AddressToBalanceMap } from '@/accounts/types'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { LockSymbol } from '@/common/components/icons/symbols'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { Colors } from '@/common/constants/styles'
import { useModal } from '@/common/hooks/useModal'
import { useToggle } from '@/common/hooks/useToggle'

import { MoveFundsModalCall } from '.'

interface Props {
  account?: Account
  balances: AddressToBalanceMap
}

export const MoveFundsAccountItem = memo(({ account, balances }: Props) => {
  const {
    modalData: { accountsWithCompatibleLocks },
  } = useModal<MoveFundsModalCall>()
  const [isDropped, setIsDropped] = useToggle()
  const { allAccounts } = useMyAccounts()

  const totalBalance = useMemo<BN>(() => {
    if (accountsWithCompatibleLocks && account) {
      return accountsWithCompatibleLocks[account.address]
        .reduce((a, b) => a.add(balances[b].transferable), BN_ZERO)
        .add(balances[account.address].total)
    }

    return BN_ZERO
  }, [accountsWithCompatibleLocks, account])

  return (
    <>
      <LockedFundsMemberRow key={account?.address}>
        {account && <AccountInfo account={account} />}
        <LockedBalanceInfoRow>
          <div>
            <InfoTitle>Locked balance</InfoTitle>
            <br />
            <InfoTitle>Total balance</InfoTitle>
          </div>
          <LockedFoundsInfoValue>
            <LockSymbolStyled />
            <TokenValue value={balances[account?.address as string].locked} />
            <br />
            <TokenValue value={balances[account?.address as string].total} />
          </LockedFoundsInfoValue>
        </LockedBalanceInfoRow>
        <LockedFundsDropDownButton onClick={setIsDropped} isDropped={isDropped} size="medium" />
      </LockedFundsMemberRow>
      <DropDownToggleStyled isDropped={isDropped}>
        <TextSmall margin="l">Other accounts with transferable balances:</TextSmall>
        {accountsWithCompatibleLocks &&
          account &&
          accountsWithCompatibleLocks[account.address].map((subAddress) => (
            <SubAccountRow key={`lockedFoundsAccount-${subAddress}`}>
              <AccountInfo account={allAccounts.find((account) => account.address === subAddress) as Account} />
              <BalanceInfoInRow>
                <InfoTitle>Transferable balance</InfoTitle>
                <InfoValue>
                  <TokenValue value={balances[subAddress] && balances[subAddress]?.transferable} />
                </InfoValue>
              </BalanceInfoInRow>
            </SubAccountRow>
          ))}
        <div>
          <Divider />
          <BalanceSummary>
            <TextMedium bold>Total balance:</TextMedium> <BalanceTokenValue value={totalBalance} />
          </BalanceSummary>
        </div>
      </DropDownToggleStyled>
    </>
  )
})

const DropDownToggleStyled = styled(DropDownToggle)`
  border: 1px solid ${Colors.Black[200]};
  background-color: ${Colors.Black[50]};
  padding: 16px;
`

const Divider = styled.hr`
  border-top: 1px solid ${Colors.Black[200]};
`

const SubAccountRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 8px 64px 14px 8px;
`

const BalanceSummary = styled.div`
  text-align: right;
  padding: 16px 64px;
  display: grid;
  grid-template-columns: 3.1fr 1fr;
  grid-template-rows: 1fr;
`

const BalanceTokenValue = styled(TokenValue)`
  margin-left: auto;
`

const LockedBalanceInfoRow = styled.div`
  display: inline-grid;
  position: relative;
  grid-template-columns: 1fr 168px;
  grid-template-rows: 1fr;
  align-items: center;
`

const LockedFundsMemberRow = styled(MemberRow)`
  grid-template-columns: 1fr 1fr 0.2fr;
`
const LockedFoundsInfoValue = styled.div`
  text-align: right;
  line-height: 20px;
`

const LockedFundsDropDownButton = styled(DropDownButton)`
  margin-left: auto;
`

const LockSymbolStyled = styled(LockSymbol)`
  transform: translateY(3px);
  margin-right: 4px;
`
