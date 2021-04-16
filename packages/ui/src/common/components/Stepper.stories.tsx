import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Modal, ModalBody, ModalHeader } from './Modal'
import { Stepper } from './Stepper'
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
        <ModalBody>
          <Stepper {...args} />
        </ModalBody>
      </Modal>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})
Default.args = {}
