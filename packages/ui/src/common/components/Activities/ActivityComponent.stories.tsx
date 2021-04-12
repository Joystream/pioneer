import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '../storybookParts/previewStyles'
import { TextMedium } from '../typography'

import { ActivityComponent, ActivityComponentProps } from './ActivityComponent'

export default {
  title: 'Common/ActivityComponent',
  component: ActivityComponent,
  argTypes: {
    icon: {
      control: { type: 'select' },
    },
  },
} as Meta

const Template: Story<ActivityComponentProps> = (args) => (
  <TemplateBlock>
    <ActivityComponent {...args}>
      <TextMedium>Opening "Became a Forum Moderator" has been closed by the Working Group Leader</TextMedium>
    </ActivityComponent>
  </TemplateBlock>
)

export const Default = Template.bind({})
Default.args = {
  type: 'ok',
  category: 'closed',
  timestamp: '2021-03-09T10:28:04.155Z',
}

export const VariantOk = Template.bind({})
VariantOk.args = {
  type: 'ok',
  category: 'closed',
  timestamp: '2021-03-09T10:28:04.155Z',
}

export const VariantError = Template.bind({})
VariantError.args = {
  type: 'error',
  category: 'closed',
  timestamp: '2021-03-09T10:28:04.155Z',
}
