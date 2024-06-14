import { Meta, StoryObj } from '@storybook/react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { FieldList } from './FieldList'
import { InputComponent, InputText } from './InputComponent'

type Args = {
  addLabel?: string
  align?: 'start' | 'end'
  initial?: string[]
  onChange: (values: unknown) => void
}

export default {
  title: 'Common/Forms/FieldList',
  component: FieldList,
  args: {
    addLabel: 'Add field',
    align: 'end',
    initial: ['foo'],
  },
  argTypes: {
    align: { control: { type: 'inline-radio' }, options: ['start', 'end'] },
    onChange: { action: 'change' },
  },
} as Meta

export const Default: StoryObj<Args> = {
  name: 'FieldList',
  render: ({ onChange, initial, ...props }) => {
    const form = useFormContext<{ input: string[] }>()

    useEffect(() => {
      form.setValue('input', initial ?? [])

      const subscription = form.watch((data) => onChange(data.input?.filter((v) => typeof v === 'string')))
      return () => subscription.unsubscribe()
    }, [form.watch])

    return (
      <FieldList
        {...props}
        name="input"
        render={({ name }) => (
          <InputComponent>
            <InputText name={name} />
          </InputComponent>
        )}
        unmount={({ name }) => form.unregister(name)}
        initialSize={initial?.length}
      />
    )
  },
}
