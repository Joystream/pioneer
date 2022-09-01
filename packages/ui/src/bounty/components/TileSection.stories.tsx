import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { TileSection, TileSectionProps } from '@/bounty/components/TileSection'
import { TextHuge, TokenValue } from '@/common/components/typography'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import members from '@/mocks/data/raw/members.json'

export default {
  title: 'Bounty/TileSection',
  component: TileSection,
} as Meta

const alice = members[0]

const Template: Story<TileSectionProps> = (args) => (
  <MockApolloProvider>
    <TileSection {...args} />
  </MockApolloProvider>
)

const firstRow = [
  {
    title: 'Stage',
    content: (
      <TextHuge value bold>
        Expired
      </TextHuge>
    ),
    tooltipText: 'tooltip',
  },
  {
    title: 'Period type',
    content: (
      <TextHuge value bold>
        Limited
      </TextHuge>
    ),
  },
  {
    title: 'Creator',
    content: <MemberInfo member={alice as unknown as Member} size="m" memberSize="m" hideGroup />,
  },
  {
    title: 'Oracle',
    content: <MemberInfo member={alice as unknown as Member} size="m" memberSize="m" hideGroup />,
  },
]

const secondRow = [
  {
    title: 'Funded',
    content: <TokenValue value={new BN(9999)} size="l" />,
  },
  {
    title: 'Cherry',
    content: <TokenValue value={new BN(9999)} size="l" />,
  },
  {
    title: 'Works',
    content: (
      <TextHuge value bold>
        8
      </TextHuge>
    ),
  },
]

export const Default = Template.bind({})
Default.args = {
  firstRow,
  secondRow,
}
