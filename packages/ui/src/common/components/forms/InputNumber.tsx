import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format'
import styled from 'styled-components'

import { asBN, powerOf10, whenDefined } from '@/common/utils'

import { Input, InputProps } from './InputComponent'

interface BaseNumberInputProps extends Omit<InputProps, 'type' | 'defaultValue' | 'onChange'> {
  decimalScale?: number
  maxAllowedValue?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, numberValue: number) => void
}

const BasedInputNumber = React.memo(
  ({ id, onChange, value = '', maxAllowedValue = 2 ** 32, decimalScale = 0, ...props }: BaseNumberInputProps) => {
    const onInputChange = useCallback(
      ({ floatValue = 0 }: NumberFormatValues, { event }: SourceInfo) => onChange?.(event, floatValue),
      [onChange]
    )

    const isAllowed = useCallback(
      ({ floatValue = 0 }: NumberFormatValues) => floatValue < maxAllowedValue,
      [maxAllowedValue]
    )

    return (
      <NumberFormat
        {...props}
        id={id}
        name={id}
        value={value}
        onValueChange={onInputChange}
        autoComplete="off"
        customInput={StyledNumberInput}
        decimalScale={decimalScale}
        isAllowed={isAllowed}
        allowNegative={false}
        thousandSeparator
      />
    )
  }
)

interface NumberInputProps extends BaseNumberInputProps {
  isInBN?: boolean
}

export const InputNumber = React.memo(({ name, isInBN = false, ...props }: NumberInputProps) => {
  const formContext = useFormContext()

  if (!formContext || !name) {
    return <BasedInputNumber {...props} />
  }

  const exp = props.decimalScale ?? 0

  return (
    <Controller
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <BasedInputNumber
          {...props}
          value={whenDefined(field.value, (value) => {
            const num = isInBN ? asBN(value).toNumber() : value // TODO convert to number safely
            return String(num / 10 ** exp)
          })}
          onChange={(_, numValue) => {
            const value = isInBN ? new BN(numValue).mul(powerOf10(exp)) : numValue * 10 ** exp
            return field.onChange(value)
          }}
          onBlur={field.onBlur}
        />
      )}
    />
  )
})

export const StyledNumberInput = styled(Input)`
  text-align: right;
`
