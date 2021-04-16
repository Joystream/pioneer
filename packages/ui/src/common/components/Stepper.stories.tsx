import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Modal, ModalHeader } from './Modal'
import { Stepper, StepperModalBody } from './Stepper'
import { TemplateBlock } from './storybookParts/previewStyles'

export default {
  title: 'Common/Stepper',
  component: Stepper,
} as Meta

const Template: Story = (args) => {
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

export const Default = Template.bind({})
Default.args = {}
