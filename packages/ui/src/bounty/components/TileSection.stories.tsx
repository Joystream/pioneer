import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { TileSection, TileSectionProps } from '@/bounty/components/TileSection'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Bounty/TileSection',
  component: TileSection,
} as Meta

const Template: Story<TileSectionProps> = (args) => (
  <MemoryRouter>
    <MockApolloProvider>
      <TileSection {...args} />
    </MockApolloProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  stage: 'Funding period',
  labelTitle: 'Stage',
  tooltipText: 'Tooltip text for bounty tile section',
  durationTitle: 'Period Length',
  value: 700,
  bountyCreator: 'Bounty Creator',
  oracle: 'Oracle',
  cherryLabel: 'Cherry',
  cherryTooltipText: 'cherry tooltip',
  cherryValue: 1000,
  entrantLabel: 'Entrant stake',
  entrantTooltipText: 'entrant tooltip',
  entrantValue: 2000,
  member: {
    id: '0',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: true,
    isFoundingMember: true,
    isCouncilMember: true,
    roles: [],
    boundAccounts: [],
    inviteCount: 0,
    createdAt: '',
  },
}
