import { Meta, Story } from '@storybook/react'
import React from 'react'

import { HorizontalStepper, HorizontalStepperProps } from '@/common/components/Stepper/HorizontalStepper'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

export default {
  title: 'Common/HorizontalStepper',
  component: HorizontalStepper,
} as Meta

const Template: Story<HorizontalStepperProps> = ({ state, steps, stepTitle }) => (
  <TemplateBlock>
    <HorizontalStepper state={state} steps={steps} stepTitle={stepTitle} />
  </TemplateBlock>
)

export const Horizontal = Template.bind({})
Horizontal.args = {
  state: 'start',
  steps: [
    { stepState: { status: 'past', title: 'Add polkadot plugin' } },
    { stepState: { status: 'active', title: 'Create or select Polkadot account' } },
    { stepState: { status: 'active', title: 'Get free tokens' } },
    { stepState: { status: 'active', title: 'Create membership' } },
  ],
}
