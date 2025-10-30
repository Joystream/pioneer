import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BlockTime } from '@/common/components/BlockTime'
import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { Stepper, StepperProps } from './Stepper'

export default {
  title: 'Common/Stepper',
  component: Stepper,
  argTypes: {
    theme: { options: ['light', 'dark'], control: { type: 'radio' } },
    steps: { control: false },
  },
} as Meta

const Template: Story<StepperProps> = ({ theme, steps }) => (
  <TemplateBlock>
    <Stepper theme={theme} steps={steps} />
  </TemplateBlock>
)

export const Simple = Template.bind({})
Simple.args = {
  theme: 'dark',
  steps: [
    { title: 'Stake', type: 'next' },
    { title: 'Form', type: 'next' },
    { title: 'Submit application', type: 'next' },
  ],
}

const details = <BlockTime block={randomBlock()} layout="reverse-start" lessInfo />
export const History = Template.bind({})
History.args = {
  theme: 'dark',
  steps: [
    { title: 'Created', type: 'past', details },
    { title: 'Accepted', type: 'past', details },
    { title: 'Dormant', type: 'past', details },
    { title: 'Deciding', type: 'past', details },
    { title: 'Deciding', type: 'active', details },
  ],
}

export const Complex = Template.bind({})
Complex.args = {
  theme: 'dark',
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
