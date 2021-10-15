import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, ValueInJoys } from '@/common/components/typography'
import { useForm } from '@/common/hooks/useForm'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { AccountSchema } from '@/memberships/model/validation'

import { groupToLockId, WorkingGroupOpening } from '../../types'

interface StakeStepProps {
  opening: WorkingGroupOpening
  onChange: (isValid: boolean, fields: StakeStepFormFields) => void
}

export interface StakeStepFormFields {
  account?: Account
  amount?: string
}

const StakeStepFormSchema = Yup.object().shape({
  account: AccountSchema.required(),
  amount: Yup.number().required(),
})

export function StakeStep({ onChange, opening }: StakeStepProps) {
  const minStake = opening.stake
  const balances = useMyBalances()
  const schema = useMemo(() => {
    StakeStepFormSchema.fields.amount = StakeStepFormSchema.fields.amount.min(
      minStake.toNumber(),
      'You need at least ${min} stake'
    )
    return StakeStepFormSchema
  }, [minStake.toString()])
  const [amount, setAmount] = useNumberInput(0, minStake)

  const formInitializer = {
    account: undefined,
    amount: undefined,
  }
  const { changeField, validation, fields } = useForm<StakeStepFormFields>(formInitializer, schema)
  const { isValid, errors } = validation

  useEffect(() => {
    changeField('amount', amount)
  }, [amount])

  useEffect(() => onChange(isValid, fields), [isValid, JSON.stringify(fields)])

  const accountsFilter = useCallback(
    (account: Account) => filterByRequiredStake(minStake, groupToLockId(opening.groupName), balances[account.address]),
    [minStake.toString(), JSON.stringify(balances)]
  )

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <RowGapBlock gap={8}>
            <h4>1. Select an Account</h4>
            <TextMedium>First please select an account for staking.</TextMedium>
          </RowGapBlock>
          <InputComponent label="Select account for Staking" required inputSize="l">
            <SelectAccount
              onChange={(account) => changeField('account', account)}
              selected={fields.account}
              minBalance={minStake}
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
            validation={amount && hasError('amount', errors) ? 'invalid' : undefined}
            message={amount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined}
            required
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              placeholder={minStake.toString()}
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
