import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { CandidateCard, CandidateCardProps } from './CandidateCard'

export default {
  title: 'Council/CandidateCard',
  component: CandidateCard,
  argTypes: {
    memberSize: { table: { disable: true } },
  },
} as Meta

const Template: Story<CandidateCardProps> = (args) => (
  <MemoryRouter>
    <CandidateCard {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  member: {
    id: '0',
    name: 'Jennifer_123',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'Jennifer_123',
    isVerified: true,
    isFoundingMember: true,
    isCouncilMember: false,
    roles: [],
    inviteCount: 0,
    createdAt: '',
  },
  image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bliss_location%2C_Sonoma_Valley_in_2006.jpg',
  voted: true,
  withdrawable: false,
  title: 'A Presidency for All Americans',
  bulletPoints: [
    'Amet minim mollit non deserunt ullamco est sit liqua dolor',
    'Amet minim mollit non deserunt ullamco est sit liqua dolor',
    'Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor',
    'Amet minim mollit non deserunt ullamco est sit liqua dolor',
    'Amet minim mollit non deserunt ullamco est sit liqua dolor',
  ],
  stake: (130000000 as unknown) as BN,
}
