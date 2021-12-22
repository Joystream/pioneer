import { Meta, Story } from '@storybook/react'
import React from 'react'

import { HorizontalStepper, HorizontalStepperProps } from '@/common/components/Stepper/HorizontalStepper'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

export default {
  title: 'Common/HorizontalStepper',
  component: HorizontalStepper,
} as Meta

const Template: Story<HorizontalStepperProps> = ({ steps }) => (
  <TemplateBlock>
    <HorizontalStepper steps={steps} />
  </TemplateBlock>
)

export const Horizontal = Template.bind({})
Horizontal.args = {
  steps: [
    { title: 'Add Polkadot plugin', type: 'past' },
    { title: 'Create or select a Polkadot account', type: 'active' },
    { title: 'Get FREE tokens', type: 'next' },
    { title: 'Create memberships', type: 'next' },
  ],
}
