import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Modal, ModalHeader } from './Modal'
import { StepperProps } from './Stepper'
import { Stepper, StepDescriptionColumn, StepperBody, StepperModalBody, StepperModalWrapper } from './StepperModal'
import { TemplateBlock } from './storybookParts/previewStyles'

export default {
  title: 'Common/Modals/StepperModal',
  component: StepperModalWrapper,
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
  steps: [
    { title: 'Stake', type: 'next' },
    { title: 'Form', type: 'next' },
    { title: 'Submit application', type: 'next' },
  ],
}

export const Complex = Template.bind({})
Complex.args = {
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
