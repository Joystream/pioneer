import { Meta, Story } from '@storybook/react'
import React from 'react'

import { VerticalStaticStepper, VerticalStaticStepperProps } from '@/common/components/Stepper/VerticalStaticStepper'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

export default {
  title: 'Common/VerticalStaticStepper',
  component: VerticalStaticStepper,
} as Meta

const Template: Story<VerticalStaticStepperProps> = ({ steps }) => (
  <TemplateBlock style={{ background: '#1F252E' }}>
    <VerticalStaticStepper steps={steps} />
  </TemplateBlock>
)

export const VerticalStatic = Template.bind({})
VerticalStatic.args = {
  steps: [
    { title: 'Add Polkadot plugin', subtitle: 'test' },
    { title: 'Add Polkadot plugin', subtitle: 'test' },
    { title: 'Add Polkadot plugin' },
  ],
}
