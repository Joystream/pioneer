import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ButtonPrimary } from './buttons'
import { ModalBody, ModalFooter } from './Modal'
import { TransactionModal, TransactionModalProps } from './TransactionModal'
import { TextMedium } from './typography'

export default {
  title: 'Common/Modals/TransactionModal',
  component: TransactionModal,
} as Meta

const Template: Story<TransactionModalProps> = (args) => <TransactionModal {...args}>{args.children}</TransactionModal>

const StubBody = () => {
  return (
    <>
      <ModalBody>
        <TextMedium>Transaction preview here.</TextMedium>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium">Sign and send</ButtonPrimary>
      </ModalFooter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: <StubBody />,
  status: 'READY',
}

export const Extension = Template.bind({})
Extension.args = {
  status: 'EXTENSION',
}

export const Pending = Template.bind({})
Pending.args = {
  status: 'PENDING',
}
