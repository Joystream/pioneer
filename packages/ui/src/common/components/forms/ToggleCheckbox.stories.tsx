import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Props, ToggleCheckbox } from './ToggleCheckbox'

export default {
  title: 'Common/Forms/ToggleCheckbox',
  component: ToggleCheckbox,
} as Meta

const Template: Story<Props> = (args) => <ToggleCheckbox {...args} />

export const ToggleComponent = Template.bind({})

ToggleComponent.args = {
  trueLabel: 'On',
  falseLabel: 'Off',
}
