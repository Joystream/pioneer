import BN from 'bn.js'
import React from 'react'

import { SelectAccount, SelectStakingAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { formatJoyValue } from '@/common/model/formatters'
import { ValidationHelpers } from '@/common/utils/validation'

import { groupToLockId, WorkingGroupOpening } from '../../types'

interface StakeStepProps extends ValidationHelpers {
  opening: WorkingGroupOpening
}

export interface StakeStepFormFields {
  account?: Account
  amount?: BN
  rewardAccount?: Account
  roleAccount?: Account
}

export function StakeStep({ opening, errorChecker, errorMessageGetter }: StakeStepProps) {
  const minStake = opening.stake

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <h4>1. Select an Staking Account</h4>

          <InputComponent
            label="Select account for Staking"
            required
            inputSize="l"
            validation={errorChecker('account') ? 'invalid' : undefined}
            message={errorChecker('account') ? errorMessageGetter('account') : undefined}
            tooltipText="Staking account will bear the role-specific lock, meaning you will not be able to re-use this account for other purposes, while in the role if your application accepted"
          >
            <SelectStakingAccount
              name="stake.account"
              minBalance={minStake}
              lockType={groupToLockId(opening.groupId)}
            />
          </InputComponent>
          <RowGapBlock gap={8}>
            <h4>2. Stake</h4>
            <TextMedium>
              You must stake at least <TokenValue value={minStake} /> to apply for this role. This stake will be
              returned to you when the hiring process is complete, whether or not you are hired, and will also be used
              to rank applications.
            </TextMedium>
          </RowGapBlock>

          <InputComponent
            id="amount-input"
            label="Select amount for Staking"
            tight
            units={CurrencyName.integerValue}
            validation={errorChecker('amount') ? 'invalid' : undefined}
            message={(errorChecker('amount') ? errorMessageGetter('amount') : undefined) || ' '}
            required
          >
            <TokenInput id="amount-input" name="stake.amount" placeholder={formatJoyValue(minStake)} />
          </InputComponent>

          <h4>3. Select Role Account</h4>
          <TextMedium>Role account is used to perform all role-specific actions.</TextMedium>
          <InputComponent
            label="Select Role Account"
            id="role-account"
            required
            inputSize="l"
            validation={errorChecker('roleAccount') ? 'invalid' : undefined}
            message={errorChecker('roleAccount') ? errorMessageGetter('account') : undefined}
            tooltipText="We strongly advise you to use a separate role-dedicated account for this application. Role account is used to perform all role-specific actions. This should not be your Controller or Root account, even though this is technically possible."
          >
            <SelectAccount id="role-account" name="stake.roleAccount" />
          </InputComponent>

          <h4>4. Select Reward Account</h4>
          <TextMedium>
            Reward account is used to collect the payments for the role rewards. We suggest to use controller account.
          </TextMedium>
          <InputComponent
            label="Select Reward Account"
            id="reward-account"
            required
            inputSize="l"
            validation={errorChecker('rewardAccount') ? 'invalid' : undefined}
            message={errorChecker('rewardAccount') ? errorMessageGetter('rewardAccount') : undefined}
            tooltipText="Member controller or root accounts are often chosen for this purpose."
          >
            <SelectAccount id="reward-account" name="stake.rewardAccount" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
