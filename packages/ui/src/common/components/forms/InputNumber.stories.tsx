import { Meta, StoryFn } from '@storybook/react'
import React, { FC, useState } from 'react'

import { InputComponent } from './InputComponent'
import { BasedInputNumber } from './InputNumber'

type Args = {
  maxAllowedValue: number
  placeholder: string
  label: string
  units: string
}
type Story = StoryFn<FC<Args>>

export default {
  title: 'Common/Forms/InputNumber',
  component: BasedInputNumber,

  args: {
    maxAllowedValue: 10_000,
    placeholder: '0',
    label: 'Amount',
    units: 'per 10 000',
  },
} satisfies Meta<Args>

export const InputNumber: Story = ({ maxAllowedValue, placeholder, label, units }) => {
  const [value, setValue] = useState<number>()

  return (
    <InputComponent
      id="input"
      label={label}
      units={units}
      message={`Value must be between 0 and ${maxAllowedValue}.`}
      tight
    >
      <BasedInputNumber
        id="input"
        value={value?.toString()}
        placeholder={placeholder}
        onChange={(_, value) => setValue(value)}
        maxAllowedValue={maxAllowedValue}
      />
    </InputComponent>
  )
}
