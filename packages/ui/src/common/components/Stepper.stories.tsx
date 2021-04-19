import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Modal, ModalHeader } from './Modal'
import { Stepper, StepperModalBody, StepperProps } from './Stepper'
import { TemplateBlock } from './storybookParts/previewStyles'

export default {
  title: 'Common/Stepper',
  component: Stepper,
  argTypes: {
    steps: {
      control: false,
    },
  },
} as Meta

const Template: Story<StepperProps> = (args) => {
  return (
    <TemplateBlock>
      <Modal onClose={() => undefined} modalSize="l">
        <ModalHeader onClick={() => undefined} title="Modal with stepper" />
        <StepperModalBody>
          <Stepper {...args} />
        </StepperModalBody>
      </Modal>
    </TemplateBlock>
  )
}

export const Simple = Template.bind({})
Simple.args = {
  steps: [{ title: 'Stake' }, { title: 'Form' }, { title: 'Submit application' }],
}

export const Complex = Template.bind({})
Complex.args = {
  steps: [
    { title: 'General parameters' },
    { title: 'Working Group title & limits', isBabyStep: true },
    { title: 'Starting date & duration', isBabyStep: true },
    { title: 'Description' },
    { title: 'Short & opening description', isBabyStep: true },
    { title: 'Application process', isBabyStep: true },
    { title: 'Stake' },
    { title: 'Application form' },
  ],
}
