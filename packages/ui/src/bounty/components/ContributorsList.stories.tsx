import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'

import { ContributorsList, ContributorsListProps } from './ContributorsList'

export default {
  title: 'Bounty/ContributorsList',
  component: ContributorsList,
} as Meta

const Template: Story<ContributorsListProps> = (args) => (
  <MemoryRouter>
    <MockApolloProvider>
      <ContributorsList {...args} />
    </MockApolloProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  contributions: [
    { actor: getMember('alice'), amount: new BN(1000) },
    { actor: getMember('bob'), amount: new BN(7000) },
  ],
}
