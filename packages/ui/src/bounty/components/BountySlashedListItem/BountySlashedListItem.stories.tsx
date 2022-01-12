import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import {
  BountySlashedListItem,
  BountySlashedListItemProps,
} from '@/bounty/components/BountySlashedListItem/BountySlashedListItem'
import { Member } from '@/memberships/types'
import members from '@/mocks/data/raw/members.json'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Bounty/BountyWorkListItem',
  component: BountySlashedListItem,
} as Meta

const Template: Story<BountySlashedListItemProps> = (args) => {
  return (
    <MemoryRouter>
      <BountySlashedListItem {...args} />
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  entrant: (members[0] as unknown) as Member,
  slashAmount: new BN(1000),
  inBlock: randomBlock(),
  rationale:
    'Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip',
}
