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
  candidate: {
    member: {
      id: '0',
      name: 'Jennifer_123',
      rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      handle: 'Jennifer_123',
      isVerified: true,
      isFoundingMember: true,
      roles: [],
      inviteCount: 0,
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bliss_location%2C_Sonoma_Valley_in_2006.jpg',
    avatar:
      'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4ebe0c87612dab4f12a597%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D292%26cropX2%3D3684%26cropY1%3D592%26cropY2%3D3987',
    voted: true,
    newcomer: true,
    withdrawable: false,
    title: 'A Presidency for All Americans',
    infolist: [
      'Amet minim mollit non deserunt ullamco est sit liqua dolor',
      'Amet minim mollit non deserunt ullamco est sit liqua dolor',
      'Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor Amet minim mollit non deserunt ullamco est sit liqua dolor',
      'Amet minim mollit non deserunt ullamco est sit liqua dolor',
      'Amet minim mollit non deserunt ullamco est sit liqua dolor',
    ],
    stake: (130000000 as unknown) as BN,
    wons: 10,
    losts: 10,
  },
}
