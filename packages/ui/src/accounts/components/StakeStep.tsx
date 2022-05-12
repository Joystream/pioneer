import BN from 'bn.js'
import React, { ReactNode, useCallback } from 'react'
import { Event, EventData } from 'xstate/lib/types'
import { ValidationError } from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account, LockType } from '@/accounts/types'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, ValueInJoys } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'
import { VoteForCouncilEvent } from '@/council/modals/VoteForCouncil/machine'

export interface StakeStepProps {
  stakeLock: LockType
  minStake: BN
  accountsFilter?: (option: Account) => boolean
  accountText?: ReactNode
  amountText?: ReactNode
  send: (event: Event<VoteForCouncilEvent>, payload?: EventData | undefined) => void
  state: any
  errors: ValidationError[]
}

export const StakeStep = ({
  stakeLock,
  minStake,
  accountsFilter,
  accountText = defaultAccountText,
  amountText = defaultAmountText(minStake),
  send,
  state,
  errors,
}: StakeStepProps) => {
  const balances = useMyBalances()
  // const { isValid, errors, setContext } = useSchema({ ...state.context }, StakeStepFormSchema)
  const selectAccountFilter = useCallback(
    (account: Account) =>
      (!accountsFilter || accountsFilter(account)) &&
      filterByRequiredStake(state.context.stake ?? minStake, stakeLock, balances[account.address]),
    [accountsFilter, state.context.stake?.toString(), JSON.stringify(balances)]
  )
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          {accountText}
          <InputComponent label="Select account for Staking" required inputSize="l">
            <SelectAccount
              id="account-select"
              onChange={(account) => send('SET_ACCOUNT', { account })}
              selected={state.context.account}
              minBalance={minStake}
              filter={selectAccountFilter}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>

      <Row>
        <RowGapBlock gap={20}>
          {amountText}
          <InputComponent
            id="amount-input"
            label="Select amount for Staking"
            tight
            units="tJOY"
            validation={state.context.stake && hasError('stake', errors) ? 'invalid' : undefined}
            message={
              (state.context.stake && hasError('stake', errors) ? getErrorMessage('stake', errors) : undefined) || ' '
            }
            required
          >
            <InputNumber
              id="amount-input"
              isTokenValue
              value={state.context.stake?.toString()}
              placeholder={formatTokenValue(minStake)}
              onChange={(_, value) => send('SET_STAKE', { stake: new BN(value) })}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const defaultAccountText = (
  <RowGapBlock gap={8}>
    <h4>1. Select an Account</h4>
    <TextMedium light>First please select an account for staking.</TextMedium>
  </RowGapBlock>
)
const defaultAmountText = (minStake: BN) => (
  <RowGapBlock gap={8}>
    <h4>2. Stake</h4>
    <TextMedium light>
      You must stake at least <ValueInJoys>{formatTokenValue(minStake)}</ValueInJoys>.
    </TextMedium>
  </RowGapBlock>
)
