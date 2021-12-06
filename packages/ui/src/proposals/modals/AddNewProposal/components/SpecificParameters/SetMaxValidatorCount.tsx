import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useForm } from '@/common/hooks/useForm'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { useMinimumValidatorCount } from '@/proposals/hooks/useMinimumValidatorCount'

export interface SetMaxValidatorCountParameters {
  validatorCount?: BN
}

interface SetMaxValidatorCountProps {
  validatorCount?: BN
  setValidatorCount: (validatorCount: BN) => void
}

export const MAX_VALIDATOR_COUNT = 300

interface SetMaxValidatorCountForm {
  amount?: number
}

const schemaFactory = (min?: number) => {
  const schema = Yup.object().shape({
    amount: Yup.number().max(MAX_VALIDATOR_COUNT, 'Maximal amount allowed is ${max}').required(),
  })

  if (min) {
    schema.fields.amount = schema.fields.amount.min(min, 'Minimal amount allowed is ${min}')
  }
  return schema
}

export const SetMaxValidatorCount = ({
  validatorCount: maxValidatorCount,
  setValidatorCount: setValidator,
}: SetMaxValidatorCountProps) => {
  const minCount = useMinimumValidatorCount()
  const [validatorCount, setValidatorCount] = useNumberInput(0, maxValidatorCount)

  const schema = useMemo(() => schemaFactory(minCount?.toNumber()), [minCount])

  const {
    validation: { errors },
    changeField,
    fields: { amount },
  } = useForm<SetMaxValidatorCountForm>({ amount: undefined }, schema)

  useEffect(() => {
    setValidator(new BN(validatorCount))
  }, [validatorCount])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidatorCount(e.target.value)
    changeField('amount', Number(e.target.value.replace(/,/g, ''))) // FIXME temporary
  }

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
            validation={amount && hasError('amount', errors) ? 'invalid' : undefined}
            message={amount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined}
            label="Amount"
            tight
            units="JOY"
            required
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(validatorCount)}
              placeholder="0"
              onChange={onChange}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
