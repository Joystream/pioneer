import BN from 'bn.js'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format'

import { JOY_DECIMAL_PLACES } from '@/common/constants'
import { formatJoyValue } from '@/common/model/formatters'
import { joyValueFromString } from '@/common/model/joyValueFromString'
import { powerOf2 } from '@/common/utils/bn'

import { InputProps } from './InputComponent'
import { StyledNumberInput } from './InputNumber'

export interface BaseTokenInputProps extends Omit<InputProps, 'type' | 'defaultValue' | 'value' | 'onChange'> {
  value?: BN
  maxAllowedValue?: BN
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, numberValue: BN) => void
}

const BasedTokenInput = React.memo(
  ({ id, onChange, value: joyValue, maxAllowedValue = powerOf2(128), ...props }: BaseTokenInputProps) => {
    const [inputValue, setInputValue] = useState('')

    const onInputChange = useCallback(
      ({ value }: NumberFormatValues, { event }: SourceInfo) => {
        if (inputValue !== value) {
          setInputValue(value)
          const newJOYValue = joyValueFromString(value)
          if (!joyValue || !newJOYValue.eq(joyValue)) {
            onChange?.(event, newJOYValue)
          }
        }
      },
      [onChange]
    )

    const isAllowed = useCallback(
      ({ value }: NumberFormatValues) => joyValueFromString(value).lt(maxAllowedValue),
      [maxAllowedValue]
    )

    useEffect(() => {
      if (joyValue && !joyValueFromString(inputValue).eq(joyValue)) {
        setInputValue(formatJoyValue(joyValue, { formatInt: String }))
      }
    }, [String(joyValue)])

    return (
      <NumberFormat
        {...props}
        id={id}
        name={id}
        value={inputValue}
        onValueChange={onInputChange}
        autoComplete="off"
        customInput={StyledNumberInput}
        decimalScale={JOY_DECIMAL_PLACES}
        isAllowed={isAllowed}
        allowNegative={false}
        thousandSeparator
      />
    )
  }
)

export const TokenInput = React.memo(({ name, ...props }: BaseTokenInputProps) => {
  const formContext = useFormContext()

  if (!formContext || !name) {
    return <BasedTokenInput {...props} />
  }

  return (
    <Controller
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <BasedTokenInput
          {...props}
          value={field.value}
          onChange={(_, value) => field.onChange(value)}
          onBlur={field.onBlur}
        />
      )}
    />
  )
})
