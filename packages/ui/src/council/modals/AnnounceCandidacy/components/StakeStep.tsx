import BN from 'bn.js'
import React, { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { ValidationHelpers } from '@/common/utils/validation'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface StakingStepProps extends ValidationHelpers {
  candidacyMember: Member
  minStake: BN
}

export const StakeStep = ({ candidacyMember, minStake, errorChecker, errorMessageGetter }: StakingStepProps) => {
  const form = useFormContext()
  const [stake] = form.watch(['staking.account', 'staking.amount'])
  const balances = useMyBalances()

  const isSomeBalanceGteStake = useMemo(() => {
    return Object.entries(balances).some(([, balance]) => balance.transferable.gte(stake ?? minStake))
  }, [stake?.toString(), JSON.stringify(balances)])

  const accountsFilter = useCallback(
    (account: Account) => filterByRequiredStake(stake ?? minStake, 'Council Candidate', balances[account.address]),
    [(stake ?? minStake).toString(), JSON.stringify(balances)]
  )

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <SelectedMember
            label="You are announcing your candidacy using the membership"
            member={candidacyMember}
            disabled
          />
          <RowGapBlock gap={8}>
            <h4>1. Select an Account</h4>
            <TextMedium>First please select an account for staking.</TextMedium>
          </RowGapBlock>
          <InputComponent
            label="Select account for Staking"
            required
            inputSize="l"
            disabled={!isSomeBalanceGteStake}
            message={errorChecker('account') ? errorMessageGetter('account') : undefined}
            validation={errorChecker('account') ? 'invalid' : undefined}
          >
            <SelectAccount
              name="staking.account"
              minBalance={stake}
              filter={accountsFilter}
              disabled={!isSomeBalanceGteStake}
            />
          </InputComponent>
          <RowGapBlock gap={8}>
            <h4>2. Stake</h4>
            <TextMedium>
              You must stake <TokenValue value={minStake} /> to announce candidacy. His stake will be return to you if
              your candidacy fails as a result of the council voting.
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            id="amount-input"
            label="Select amount for Staking"
            units={CurrencyName.integerValue}
            required
            message={errorChecker('amount') ? errorMessageGetter('amount') : undefined}
            validation={errorChecker('amount') ? 'invalid' : undefined}
            inputSize="s"
          >
            <InputNumber
              id="amount-input"
              name="staking.amount"
              isInBN
              isTokenValue
              placeholder={minStake.toString()}
            />
          </InputComponent>
          {isSomeBalanceGteStake && errorMessageGetter('amount')?.startsWith('Insufficient') && (
            <Info>
              <TextMedium>
                You have sufficient funds on other account to cover
                {<TokenValue value={minStake} />} stake.
              </TextMedium>
            </Info>
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
