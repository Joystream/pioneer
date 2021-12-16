import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'

import { EntrantsList, EntrantsListProps } from './EntrantsList'

export default {
  title: 'Bounty/EntrantsList',
  component: EntrantsList,
} as Meta

const Template: Story<EntrantsListProps> = (args) => (
  <MemoryRouter>
    <MockApolloProvider>
      <EntrantsList {...args} />
    </MockApolloProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  entries: [
    { actor: getMember('alice'), entriesCount: 2 },
    { actor: getMember('bob'), entriesCount: 1 },
  ],
}
