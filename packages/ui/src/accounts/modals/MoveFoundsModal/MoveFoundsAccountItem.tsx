import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useAccounts } from '@/accounts/hooks/useAccounts'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useBalances } from '@/accounts/hooks/useBalances'
import { useTotalBalances } from '@/accounts/hooks/useTotalBalances'
import { MemberRow } from '@/accounts/modals/MoveFoundsModal/styles'
import { Account } from '@/accounts/types'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { VotingSymbol, LockSymbol } from '@/common/components/icons/symbols'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TokenValue, TextSmall, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants/styles'
import { useToggle } from '@/common/hooks/useToggle'
import { spacing } from '@/common/utils/styles'

interface Props {
  account: Account
}

export const MoveFoundsAccountItem = memo(({ account }: Props) => {
  const [isDropped, setIsDropped] = useToggle()
  const { allAccounts } = useAccounts()
  const { locked } = useBalance(account.address) || {}
  const { transferable } = useTotalBalances()
  const balances = useBalances()

  const accounts = useMemo(() => {
    if (allAccounts.length) {
      return allAccounts.filter(
        (subAccount) =>
          balances[subAccount.address] &&
          balances[subAccount.address].transferable.toNumber() > 0 &&
          subAccount.address !== account.address
      )
    }
    return []
  }, [allAccounts, balances])

  return (
    <>
      <LockedFoundsMemberRow key={account.address}>
        <AccountInfo account={account} />
        <LockedBalanceInfoRow>
          <InfoTitle>Locked balance</InfoTitle>
          <LockedFoundsInfoValue>
            <LockSymbolStyled />
            <TokenValue value={locked} />
            <VotingSymbolStyled />
          </LockedFoundsInfoValue>
        </LockedBalanceInfoRow>
        <LockedFoundsDropDownButton onClick={setIsDropped} isDropped={isDropped} size="medium" />
      </LockedFoundsMemberRow>
      <DropDownToggleStyled isDropped={isDropped}>
        <TextSmall margin="l">Other accounts with transferable balances:</TextSmall>
        {accounts.map((account) => (
          <SubAccountRow>
            <AccountInfo account={account} key={`subaccount-${account.address}`} />
            <BalanceInfoInRow>
              <InfoTitle>Transferable balance</InfoTitle>
              <InfoValue>
                <TokenValue value={balances[account.address] && balances[account.address].transferable} />
              </InfoValue>
            </BalanceInfoInRow>
          </SubAccountRow>
        ))}
        <div>
          <Divider />
          <BalanceSummary>
            <TextMedium bold>Total balance:</TextMedium> <BalanceTokenValue value={transferable} />
          </BalanceSummary>
        </div>
      </DropDownToggleStyled>
    </>
  )
})

const DropDownToggleStyled = styled(DropDownToggle)`
  border: 1px solid ${Colors.Black[200]};
  background-color: ${Colors.Black[50]};
  padding: ${spacing(2)};
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

const LockedFoundsMemberRow = styled(MemberRow)`
  grid-template-columns: 1fr 1fr 0.2fr;
`
const LockedFoundsInfoValue = styled.div`
  text-align: right;
  line-height: 20px;
`

const LockedFoundsDropDownButton = styled(DropDownButton)`
  margin-left: auto;
`

const VotingSymbolStyled = styled(VotingSymbol)`
  margin-top: ${spacing(1)};
  margin-left: auto;
  display: block;
`

const LockSymbolStyled = styled(LockSymbol)`
  transform: translateY(3px);
  margin-right: ${spacing(0.5)};
`
