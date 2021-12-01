import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TransactionContext, UseTransaction } from '@/common/providers/transaction/context'

import { Row, TemplateBlock } from '../storybookParts/previewStyles'

import { TransactionButton } from './TransactionButton'

export default {
  title: 'Common/Buttons/TransactionButton',
  component: TransactionButton,
  argTypes: {
    isTransactionPending: { options: [true, false] },
  },
} as Meta

const Template: Story<UseTransaction> = (args) => (
  <TransactionContext.Provider value={{ ...args }}>
    <TemplateBlock>
      <Row>
        <TransactionButton style="primary" size="large">
          Button Primary
        </TransactionButton>
        <TransactionButton style="secondary" size="large">
          Button Secondary
        </TransactionButton>
        <TransactionButton style="ghost" size="large">
          Button Ghost
        </TransactionButton>
      </Row>
    </TemplateBlock>
  </TransactionContext.Provider>
)

export const Buttons = Template.bind({})

Buttons.args = {
  isTransactionPending: false,
}
