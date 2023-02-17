import BN from 'bn.js'
import React, { ReactNode, useCallback } from 'react'
import { Event, EventData } from 'xstate/lib/types'
import { ValidationError } from 'yup'

import { SelectStakingAccount } from '@/accounts/components/SelectAccount'
import { Account, LockType } from '@/accounts/types'
import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'
import { VoteForCouncilEvent, VoteForCouncilMachineState } from '@/council/modals/VoteForCouncil/machine'

export interface StakeStepProps {
  stakeLock: LockType
  minStake: BN
  accountsFilter?: (option: Account) => boolean
  accountText?: ReactNode
  amountText?: ReactNode
  send: (event: Event<VoteForCouncilEvent>, payload?: EventData | undefined) => void
  state: VoteForCouncilMachineState
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
  const selectAccountFilter = useCallback(
    (account: Account) => !accountsFilter || accountsFilter(account),
    [accountsFilter]
  )

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          {accountText}
          <InputComponent
            label="Select account for Staking"
            required
            inputSize="l"
            tooltipText="If someone voted for a candidate in an election, they will and can recover their stake at a later time. Importantly, a vote which was devoted to a losing candidate can be freed the moment the election cycle is over, while a vote which was devoted to a winner can only be freed after the announcing period of the next election begins. The idea behind this asymmetry is to more closely expose the winners to the consequences of their decision."
            tooltipLinkURL="https://handbook.joystream.org/system/council"
          >
            <SelectStakingAccount
              id="account-select"
              onChange={(account) => send('SET_ACCOUNT', { account })}
              selected={state.context.account}
              minBalance={minStake}
              lockType={stakeLock}
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
            units={CurrencyName.integerValue}
            validation={state.context.stake && hasError('stake', errors) ? 'invalid' : undefined}
            message={
              (state.context.stake && hasError('stake', errors) ? getErrorMessage('stake', errors) : undefined) || ' '
            }
            required
          >
            <TokenInput
              id="amount-input"
              value={state.context.stake}
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
      You must stake at least <TokenValue value={minStake} />.
    </TextMedium>
  </RowGapBlock>
)
