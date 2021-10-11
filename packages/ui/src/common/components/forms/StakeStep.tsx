import BN from 'bn.js'
import React, { ReactNode, useCallback, useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account, LockType } from '@/accounts/types'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, ValueInJoys } from '@/common/components/typography'
import { useForm } from '@/common/hooks/useForm'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { AccountSchema } from '@/memberships/model/validation'
import { StakeStepFormFields } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

import { InputComponent, InputNumber } from '.'
import { getErrorMessage, hasError } from './FieldError'

const StakeStepFormSchema = Yup.object().shape({
  account: AccountSchema.required(),
  amount: Yup.number().required(),
})

export interface StakeStepProps {
  stakeLock: LockType
  minStake: BN
  accountText?: ReactNode
  amountText?: ReactNode
  onChange: (isValid: boolean, fields: StakeStepFormFields) => void
}

export const StakeStep = ({
  stakeLock,
  minStake,
  accountText = defaultAccountText,
  amountText = defaultAmountText(minStake),
  onChange,
}: StakeStepProps) => {
  const balances = useMyBalances()
  const [amount, setAmount] = useNumberInput(0, minStake)
  const schema = useMemo(() => {
    StakeStepFormSchema.fields.amount = StakeStepFormSchema.fields.amount.min(
      minStake.toNumber(),
      'You need at least ${min} stake'
    )
    return StakeStepFormSchema
  }, [minStake])

  const { changeField, validation, fields } = useForm<StakeStepFormFields>({}, schema)
  const { isValid, errors } = validation

  useEffect(() => {
    changeField('amount', amount)
  }, [amount])

  const stake = new BN(fields.amount ?? minStake)
  const accountsFilter = useCallback(
    (account: Account) => filterByRequiredStake(stake, stakeLock, balances[account.address]),
    [stake.toString(), JSON.stringify(balances)]
  )

  useEffect(() => onChange(isValid, fields), [isValid, JSON.stringify(fields)])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          {accountText}
          <InputComponent label="Select account for Staking" required inputSize="l">
            <SelectAccount
              onChange={(account) => changeField('account', account)}
              selected={fields.account}
              minBalance={minStake}
              filter={accountsFilter}
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
      You must stake at least <ValueInJoys>{formatTokenValue(minStake.toNumber())}</ValueInJoys>.
    </TextMedium>
  </RowGapBlock>
)
