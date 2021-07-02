import { Meta, Story } from '@storybook/react'
import faker from 'faker'
import React from 'react'
import styled from 'styled-components'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextSmall } from '@/common/components/typography'

import { Stepper } from './Stepper'
import { StepperTheme } from './themes'
import { StepperStep } from './types'

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
  steps: StepperStep[]
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

const HistoryDetails = styled(({ tooltipText, ...props }) => (
  <TextSmall {...props} lighter>
    14/10/2020, 10:25 PM CET
    <Tooltip tooltipText={tooltipText}>
      <TooltipDefault />
    </Tooltip>
  </TextSmall>
))`
  display: flex;
  align-items: center;
  column-gap: 8px;
`

export const History = Template.bind({})
History.args = {
  theme: 'light',
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
