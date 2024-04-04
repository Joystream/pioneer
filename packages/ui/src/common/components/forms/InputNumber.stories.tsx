import { Meta, StoryObj } from '@storybook/react'
import React, { FC, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputComponent } from './InputComponent'
import { InputNumber } from './InputNumber'

type Args = {
  maxAllowedValue: number
  placeholder: string
  label: string
  units: string
  decimalScale: number
  onChange: (value: number) => void
}
type Story = StoryObj<FC<Args>>

export default {
  title: 'Common/Forms/InputNumber',
  component: InputNumber as unknown as FC<Args>,

  argTypes: {
    onChange: { action: 'onChange' },
  },

  args: {
    maxAllowedValue: 10_000,
    placeholder: '0',
    label: 'Amount',
    units: 'per 10 000',
    decimalScale: 2,
  },
} satisfies Meta<Args>

export const InputNumberStory: Story = {
  name: 'InputNumber',
  render: ({ label, units, onChange, ...props }) => {
    const form = useFormContext()

    useEffect(() => {
      const subscription = form.watch((data) => onChange(data.input))
      return () => subscription.unsubscribe()
    }, [form.watch])

    return (
      <InputComponent
        id="input"
        label={label}
        units={units}
        message={`Value must be between 0 and ${props.maxAllowedValue}.`}
        tight
      >
        <InputNumber {...props} id="input" name="input" />
      </InputComponent>
    )
  },
}
