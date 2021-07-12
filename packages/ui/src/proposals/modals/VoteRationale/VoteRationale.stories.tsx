import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { VoteRationale } from './VoteRationale'

export default {
  title: 'Proposals/VoteRationale',
  component: VoteRationale,
} as Meta

export const Default: Story = () => {
  return (
    <MemoryRouter>
      <VoteRationale />
    </MemoryRouter>
  )
}

Default.args = {}
