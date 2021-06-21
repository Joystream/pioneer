import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { SelectAccount } from '../../../accounts/components/SelectAccount'
import { Account } from '../../../accounts/types'
import { InputComponent, InputNumber } from '../../../common/components/forms'
import { getErrorMessage, hasError } from '../../../common/components/forms/FieldError'
import { Row } from '../../../common/components/Modal'
import { RowGapBlock } from '../../../common/components/page/PageContent'
import { TextMedium, ValueInJoys } from '../../../common/components/typography'
import { useForm } from '../../../common/hooks/useForm'
import { useNumberInput } from '../../../common/hooks/useNumberInput'
import { formatTokenValue } from '../../../common/model/formatters'
import { AccountSchema } from '../../../memberships/model/validation'
import { WorkingGroupOpening } from '../../types'

export interface StakeStepForm {
  account?: Account
  amount?: string
}

const StakeStepFormSchema = Yup.object().shape({
  account: AccountSchema.required(),
  amount: Yup.number().required(),
})

interface StakeStepProps {
  opening: WorkingGroupOpening
  onChange: (isValid: boolean, fields: StakeStepForm) => void
}

export function StakeStep({ onChange, opening }: StakeStepProps) {
  const [amount, setAmount] = useNumberInput(0)
  const minStake = opening.stake
  const schema = useMemo(() => {
    StakeStepFormSchema.fields.amount = StakeStepFormSchema.fields.amount.min(
      minStake.toNumber(),
      'You need at least ${min} stake'
    )
    return StakeStepFormSchema
  }, [minStake.toString()])

  const initializer = {
    account: undefined,
    amount: undefined,
  }
  const { changeField, validation, fields } = useForm<StakeStepForm>(initializer, schema)
  const { isValid, errors } = validation

  useMemo(() => {
    changeField('amount', amount)
  }, [amount])

  useEffect(() => onChange(isValid, fields), [isValid, JSON.stringify(fields)])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <RowGapBlock gap={8}>
            <h4>Select an account</h4>
            <TextMedium>First please select an account for staking.</TextMedium>
          </RowGapBlock>
          <InputComponent label="Select account for Staking" required inputSize="l">
            <SelectAccount onChange={(account) => changeField('account', account)} selected={fields.account} />
          </InputComponent>
        </RowGapBlock>
      </Row>

      <Row>
        <RowGapBlock gap={20}>
          <RowGapBlock gap={8}>
            <h4>Stake</h4>
            <TextMedium>
              You must stake at least <ValueInJoys>{formatTokenValue(minStake.toNumber())}</ValueInJoys> to apply for
              this role. This stake will be returned to you when the hiring process is complete, whether or not you are
              hired, and will also be used to rank applications.
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
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
