import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'

import { BountyActorsList, BountyActorsListProps } from './BountyActorsList'

export default {
  title: 'Bounty/BountyActorsList',
  component: BountyActorsList,
} as Meta

const Template: Story<BountyActorsListProps> = (args) => (
  <MemoryRouter>
    <MockApolloProvider>
      <BountyActorsList {...args} />
    </MockApolloProvider>
  </MemoryRouter>
)

export const ContributorsList = Template.bind({})
ContributorsList.args = {
  title: 'CONTRIBUTORS',
  elements: [
    { actor: getMember('alice'), amount: new BN(1000) },
    { actor: getMember('bob'), amount: new BN(7000) },
  ],
}

export const EntrantsList = Template.bind({})
EntrantsList.args = {
  title: 'ENTRANTS',
  elements: [
    { actor: getMember('alice'), count: 2 },
    { actor: getMember('bob'), count: 1 },
  ],
  infobox: {
    result: 'winner',
    title: 'You are a winner',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  },
}

export const WithdrawnsList = Template.bind({})
WithdrawnsList.args = {
  title: 'WITHDRAWN',
  elements: [{ actor: getMember('alice') }, { actor: getMember('bob') }],
}
