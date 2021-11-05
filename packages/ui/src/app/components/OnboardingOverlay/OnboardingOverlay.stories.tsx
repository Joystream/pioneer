import { Meta, Story } from '@storybook/react'
import React from 'react'

import { OnboardingOverlay } from '@/app/components/OnboardingOverlay/OnboardingOverlay'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

export default {
  title: 'App/OnboardingOverlay',
  component: OnboardingOverlay,
} as Meta

const Template: Story = (args) => (
  <TemplateBlock>
    <OnboardingOverlay {...args} />
  </TemplateBlock>
)

export const Horizontal = Template.bind({})
Horizontal.args = {}
