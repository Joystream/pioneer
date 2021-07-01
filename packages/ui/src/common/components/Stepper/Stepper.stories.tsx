import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { Step } from '@/common/model/machines/getSteps'

import { Stepper } from './Stepper'
import { StepperTheme } from './themes'

export default {
  title: 'Common/Stepper',
  component: Stepper,
  argTypes: {
    theme: { options: ['light', 'dark'], control: { type: 'radio' } },
    steps: { control: false },
  },
} as Meta

interface Props {
  theme: 'light' | 'dark'
  steps: Step[]
}

const Template: Story<Props> = ({ theme, steps }) => (
  <TemplateBlock>
    <Stepper theme={StepperTheme[theme]} steps={steps} />
  </TemplateBlock>
)

export const Simple = Template.bind({})
Simple.args = {
  theme: 'light',
  steps: [
    { title: 'Stake', type: 'next' },
    { title: 'Form', type: 'next' },
    { title: 'Submit application', type: 'next' },
  ],
}

export const History = Template.bind({})
History.args = {
  theme: 'light',
  steps: [
    { title: 'Created', type: 'past' },
    { title: 'Accepted', type: 'past' },
    { title: 'Dormant', type: 'past' },
    { title: 'Deciding', type: 'past' },
    { title: 'Deciding', type: 'active' },
  ],
}

export const Complex = Template.bind({})
Complex.args = {
  theme: 'light',
  steps: [
    { title: 'General parameters', type: 'next' },
    { title: 'Working Group title & limits', isBaby: true, type: 'next' },
    { title: 'Starting date & duration', isBaby: true, type: 'next' },
    { title: 'Description', type: 'next' },
    { title: 'Short & opening description', isBaby: true, type: 'next' },
    { title: 'Application process', isBaby: true, type: 'next' },
    { title: 'Reward', type: 'next' },
    { title: 'Stake', type: 'next' },
    { title: 'Application form', type: 'next' },
  ],
}
