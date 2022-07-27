import BN from 'bn.js'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format'

import { BN_ZERO, JOY_DECIMAL_PLACES } from '@/common/constants'
import { formatJoyValue } from '@/common/model/formatters'

import { InputProps } from './InputComponent'
import { StyledNumberInput } from './InputNumber'

export interface BaseTokenInputProps extends Omit<InputProps, 'type' | 'defaultValue' | 'value' | 'onChange'> {
  value?: BN
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, numberValue: BN) => void
}

const BasedTokenInput = React.memo(({ id, onChange, value: joyValue = BN_ZERO, ...props }: BaseTokenInputProps) => {
  const [inputValue, setInputValue] = useState('')

  const onInputChange = useCallback(
    ({ value }: NumberFormatValues, { event }: SourceInfo) => {
      if (inputValue !== value) {
        setInputValue(value)
        const newJOYValue = stringToJoyValue(value)
        if (!newJOYValue.eq(joyValue)) {
          onChange?.(event, newJOYValue)
        }
      }
    },
    [onChange]
  )

  useEffect(() => {
    if (!stringToJoyValue(inputValue).eq(joyValue)) {
      setInputValue(formatJoyValue(joyValue))
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
      thousandSeparator
    />
  )
})

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

const stringToJoyValue = (value: string) => {
  const [integer = '0', decimal = ''] = value.split('.')
  return new BN(integer + decimal.padEnd(JOY_DECIMAL_PLACES, '0'))
}
