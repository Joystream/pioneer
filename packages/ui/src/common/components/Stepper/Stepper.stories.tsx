import { Meta, Story } from '@storybook/react'
import faker from 'faker'
import React from 'react'
import styled from 'styled-components'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextInlineSmall } from '@/common/components/typography'

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

const HistoryDetails = styled(({ tooltipText, ...props }) => (
  <div {...props}>
    <TextInlineSmall lighter>14/10/2020, 10:25 PM CET</TextInlineSmall>
    <Tooltip tooltipText={tooltipText}>
      <TooltipDefault />
    </Tooltip>
  </div>
))`
  display: flex;
  align-items: center;
  column-gap: 8px;
`

export const History = Template.bind({})
History.args = {
  theme: 'dark',
  steps: [
    { title: 'Created', type: 'past', details: <HistoryDetails tooltipText={faker.lorem.words(6)} /> },
    { title: 'Accepted', type: 'past', details: <HistoryDetails tooltipText={faker.lorem.words(6)} /> },
    { title: 'Dormant', type: 'past', details: <HistoryDetails tooltipText={faker.lorem.words(6)} /> },
    { title: 'Deciding', type: 'past', details: <HistoryDetails tooltipText={faker.lorem.words(6)} /> },
    { title: 'Deciding', type: 'active', details: <HistoryDetails tooltipText={faker.lorem.words(6)} /> },
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
