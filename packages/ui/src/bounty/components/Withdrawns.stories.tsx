import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'

import { WithdrawnsList, WithdrawnsListProps } from './WithdrawnsList'

export default {
  title: 'Bounty/WithdrawnsList',
  component: WithdrawnsList,
} as Meta

const Template: Story<WithdrawnsListProps> = (args) => (
  <MemoryRouter>
    <MockApolloProvider>
      <WithdrawnsList {...args} />
    </MockApolloProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  withdrawns: [{ actor: getMember('alice') }, { actor: getMember('bob') }, { actor: getMember('alice') }],
}
