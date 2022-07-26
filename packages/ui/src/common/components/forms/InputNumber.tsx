import BN from 'bn.js'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import styled from 'styled-components'

import { cleanInputValue } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

import { Input, InputProps } from './InputComponent'

interface BaseNumberInputProps extends Omit<InputProps, 'onChange'> {
  isTokenValue?: boolean
  maxAllowedValue?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, numberValue: number) => void
}

const BasedInputNumber = React.memo(
  ({ id, onChange, isTokenValue = false, value = '', maxAllowedValue, ...props }: BaseNumberInputProps) => {
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = +cleanInputValue(event.target.value)
      if (isNaN(eventValue) || eventValue < 0 || (maxAllowedValue && !(eventValue < maxAllowedValue))) return

      onChange?.(event, eventValue)
    }

    return (
      <StyledNumberInput
        id={id}
        name={id}
        type="string"
        value={isTokenValue ? formatTokenValue(value) : value}
        onChange={onInputChange}
        autoComplete="off"
        {...props}
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
