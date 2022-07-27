import BN from 'bn.js'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format'
import styled from 'styled-components'

import { Input, InputProps } from './InputComponent'

interface BaseNumberInputProps extends Omit<InputProps, 'type' | 'defaultValue' | 'onChange'> {
  maxAllowedValue?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, numberValue: number) => void
}

const BasedInputNumber = React.memo(({ id, onChange, value = '', maxAllowedValue, ...props }: BaseNumberInputProps) => {
  const onInputChange = ({ value }: NumberFormatValues, { event }: SourceInfo) => {
    const eventValue = Number(value)
    if (isNaN(eventValue) || eventValue < 0 || (maxAllowedValue && !(eventValue < maxAllowedValue))) return

    onChange?.(event, eventValue)
  }

  return (
    <NumberFormat
      {...props}
      id={id}
      name={id}
      value={value}
      onValueChange={onInputChange}
      autoComplete="off"
      customInput={StyledNumberInput}
      decimalScale={0}
      thousandSeparator
    />
  )
})

interface NumberInputProps extends BaseNumberInputProps {
  isInBN?: boolean
}

export const InputNumber = React.memo(({ name, isInBN = false, ...props }: NumberInputProps) => {
  const formContext = useFormContext()

  if (!formContext || !name) {
    return <BasedInputNumber {...props} />
  }

  return (
    <Controller
      control={formContext.control}
      name={name}
      render={({ field }) => {
        return (
          <BasedInputNumber
            {...props}
            value={new BN(field.value)?.toString() ?? ''}
            onChange={(_, value) => field.onChange(isInBN ? new BN(String(value)) : value)}
            onBlur={field.onBlur}
          />
        )
      }}
    />
  )
})

export const StyledNumberInput = styled(Input)`
  text-align: right;
`
