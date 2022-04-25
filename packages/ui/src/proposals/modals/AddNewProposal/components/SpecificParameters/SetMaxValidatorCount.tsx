import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useSchema } from '@/common/hooks/useSchema'
import { useMinimumValidatorCount } from '@/proposals/hooks/useMinimumValidatorCount'

export interface SetMaxValidatorCountParameters {
  validatorCount?: BN
}

interface SetMaxValidatorCountProps {
  validatorCount?: BN
  setValidatorCount: (validatorCount: BN) => void
  setIsExecutionError: (value: boolean) => void
}

export const MAX_VALIDATOR_COUNT = 300

const schemaFactory = (min?: number) => {
  const schema = Yup.object().shape({
    amount: Yup.number().max(
      MAX_VALIDATOR_COUNT,
      `Input value must be between ${min} and ${MAX_VALIDATOR_COUNT} to execute`
    ),
  })

  if (min) {
    schema.fields.amount = schema.fields.amount.min(
      min,
      `Input value must be between ${min} and ${MAX_VALIDATOR_COUNT} to execute`
    )
  }

  return schema
}

export const SetMaxValidatorCount = ({
  validatorCount: maxValidatorCount,
  setValidatorCount: setValidator,
  setIsExecutionError,
}: SetMaxValidatorCountProps) => {
  const minCount = useMinimumValidatorCount()
  const schema = useMemo(() => schemaFactory(minCount?.toNumber()), [minCount])

  const { errors } = useSchema({ amount: maxValidatorCount?.toNumber() }, schema)

  useEffect(() => {
    setIsExecutionError(!!errors.length)
  }, [errors])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set max validator count</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            validation={maxValidatorCount && hasError('amount', errors) ? 'invalid' : undefined}
            message={
              (maxValidatorCount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined) ||
              'Amount must be greater than zero'
            }
            label="Amount"
            tight
            required
          >
            <InputNumber
              id="amount-input"
              isTokenValue
              value={maxValidatorCount?.toString()}
              placeholder="0"
              onChange={(_, value) => setValidator(new BN(value))}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
