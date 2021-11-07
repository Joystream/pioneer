import { Meta, Story } from '@storybook/react'
import React from 'react'

import { OnBoardingOverlay } from '@/app/components/OnboardingOverlay/OnBoardingOverlay'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

export default {
  title: 'App/OnboardingOverlay',
  component: OnBoardingOverlay,
} as Meta

const Template: Story = (args) => (
  <TemplateBlock>
    <OnBoardingOverlay {...args} />
  </TemplateBlock>
)

export const Horizontal = Template.bind({})
Horizontal.args = {}
