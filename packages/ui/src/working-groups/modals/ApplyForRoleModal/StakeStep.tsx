import React, { useCallback, useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { Account } from '@/accounts/types'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, ValueInJoys } from '@/common/components/typography'
import { useForm } from '@/common/hooks/useForm'
import { formatTokenValue } from '@/common/model/formatters'
import { AccountSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'

import { groupToLockId, WorkingGroupOpening } from '../../types'

interface StakeStepProps {
  opening: WorkingGroupOpening
  onChange: (isValid: boolean, fields: StakeStepFormFields) => void
  member: Member
}

export interface StakeStepFormFields {
  account?: Account
  amount?: string
  rewardAccount?: Account
  roleAccount?: Account
}

const StakeStepFormSchema = Yup.object().shape({
  account: AccountSchema.required(),
  roleAccount: AccountSchema.required(),
  rewardAccount: AccountSchema.required(),
  amount: Yup.number().required(),
})

export function StakeStep({ onChange, opening, member }: StakeStepProps) {
  const minStake = opening.stake
  const balances = useMyBalances()
  const schema = useMemo(() => {
    StakeStepFormSchema.fields.amount = StakeStepFormSchema.fields.amount.min(
      minStake.toNumber(),
      'You need at least ${min} stake'
    )
    return StakeStepFormSchema
  }, [minStake.toString()])

  const formInitializer = {
    account: undefined,
    amount: undefined,
    rewardAccount: undefined,
    roleAccount: undefined,
  }
  const { changeField, validation, fields } = useForm<StakeStepFormFields>(formInitializer, schema)
  const { isValid, errors } = validation
  const status = useStakingAccountStatus(fields.account?.address, member.id)

  useEffect(() => onChange(isValid && status !== 'other', fields), [isValid, status, JSON.stringify(fields)])

  const accountsFilter = useCallback(
    (account: Account) => filterByRequiredStake(minStake, groupToLockId(opening.groupId), balances[account.address]),
    [minStake.toString(), JSON.stringify(balances)]
  )

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <h4>1. Select an Staking Account</h4>

          <InputComponent
            label="Select account for Staking"
            required
            inputSize="l"
            validation={status === 'other' ? 'invalid' : undefined}
            message={status === 'other' ? 'This account is bound to the another member' : undefined}
            tooltipText="Staking account will bear the role-specific lock, meaning you will not be able to re-use this account for other purposes, while in the role if your application accepted"
          >
            <SelectAccount
              onChange={(account) => changeField('account', account)}
              selected={fields.account}
              filter={accountsFilter}
            />
          </InputComponent>
          <RowGapBlock gap={8}>
            <h4>2. Stake</h4>
            <TextMedium>
              You must stake at least <ValueInJoys>{formatTokenValue(minStake)}</ValueInJoys> to apply for this role.
              This stake will be returned to you when the hiring process is complete, whether or not you are hired, and
              will also be used to rank applications.
            </TextMedium>
          </RowGapBlock>

          <InputComponent
            id="amount-input"
            label="Select amount for Staking"
            tight
            units="JOY"
            validation={fields.amount && hasError('amount', errors) ? 'invalid' : undefined}
            message={
              (fields.amount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined) || ' '
            }
            required
          >
            <InputNumber
              id="amount-input"
              value={fields.amount}
              isTokenValue
              placeholder={minStake.toString()}
              onChange={(_, value) => changeField('amount', String(value))}
            />
          </InputComponent>

          <h4>3. Select Role Account</h4>
          <TextMedium>Role account is used to perform all role-specific actions.</TextMedium>
          <InputComponent
            label="Select role account for future worker"
            required
            inputSize="l"
            tooltipText="We strongly advise you to use a separate role-dedicated account for this application. Role account is used to perform all role-specific actions. This should not be your Controller or Root account, even though this is technically possible."
          >
            <SelectAccount onChange={(account) => changeField('roleAccount', account)} selected={fields.roleAccount} />
          </InputComponent>

          <h4>4. Select Reward Account</h4>
          <TextMedium>
            Reward account is used to collect the payments for the role rewards. We suggest to use controller account.
          </TextMedium>
          <InputComponent
            label="Select reward account"
            required
            inputSize="l"
            tooltipText="Member controller or root accounts are often chosen for this purpose."
          >
            <SelectAccount
              onChange={(account) => changeField('rewardAccount', account)}
              selected={fields.rewardAccount}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
