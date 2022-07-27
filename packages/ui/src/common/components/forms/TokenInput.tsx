import BN from 'bn.js'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { BN_ZERO, JOY_DECIMAL_PLACES } from '@/common/constants'
import { powerOf10 } from '@/common/utils/bn'

import { InputProps } from './InputComponent'
import { StyledNumberInput } from './InputNumber'

export interface BaseTokenInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: BN
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, numberValue: BN) => void
}

const isValid = (value: string) => /^\d*\.?\d{0,10}$/.test(value)

const BasedTokenInput = React.memo(({ id, onChange, value = BN_ZERO, ...props }: BaseTokenInputProps) => {
  const [inputValue, setInputValue] = useState('')

  const onInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue = evt.target.value
      if (isValid(targetValue) && inputValue !== targetValue) {
        setInputValue(targetValue)
        const newValue = formatFromJoyValue(targetValue)
        if (!newValue.eq(value)) {
          onChange?.(evt, newValue)
        }
      }
    },
    [onChange]
  )

  useEffect(() => {
    if (!formatFromJoyValue(inputValue).eq(value)) {
      const { integer, decimal } = formatToJoyValue(value)
      const newInputValue = `${integer}.${decimal}`.replace(/\.?0*$/, '')
      if (formatFromJoyValue(newInputValue).eq(value)) {
        setInputValue(newInputValue)
      }
    }
  }, [String(value)])

  return (
    <StyledNumberInput
      id={id}
      name={id}
      type="string"
      value={inputValue}
      onChange={onInputChange}
      autoComplete="off"
      {...props}
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

const formatToJoyValue = (value: BN) => {
  const int = String(value.div(powerOf10(JOY_DECIMAL_PLACES)))
  const rest = String(value.mod(powerOf10(JOY_DECIMAL_PLACES))).padStart(JOY_DECIMAL_PLACES, '0')
  return {
    decimal: rest.replace(/0+$/, ''),
    integer: int,
  }
}

const formatFromJoyValue = (value: string) => {
  const [integer = '0', decimal = ''] = value.split('.')
  return new BN(integer + decimal.padEnd(JOY_DECIMAL_PLACES, '0'))
}
