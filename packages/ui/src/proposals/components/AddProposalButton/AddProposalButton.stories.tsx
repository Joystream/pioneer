import { Meta, Story } from '@storybook/react'
import React from 'react'

import { AddProposalButton } from './AddProposalButton'

export default {
  title: 'Proposals/AddProposalButton',
  component: AddProposalButton,
} as Meta

const Template: Story = () => <AddProposalButton />

export const Default = Template.bind({})
