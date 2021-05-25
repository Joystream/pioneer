import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Modal, ModalHeader } from './Modal'
import { Stepper, StepperProps } from './Stepper'
import { StepDescriptionColumn, StepperBody, StepperModalBody, StepperModalWrapper } from './StepperModal'
import { TemplateBlock } from './storybookParts/previewStyles'

export default {
  title: 'Common/Modals/Stepper',
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
          <StepperModalWrapper>
            <Stepper {...args} />
            <StepDescriptionColumn>Col 2</StepDescriptionColumn>
            <StepperBody>Col 3</StepperBody>
          </StepperModalWrapper>
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
    { title: 'Reward' },
    { title: 'Stake' },
    { title: 'Application form' },
  ],
}
