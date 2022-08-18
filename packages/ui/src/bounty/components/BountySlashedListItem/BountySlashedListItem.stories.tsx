import { Meta, Story } from '@storybook/react'
import React from 'react'

import {
  BountySlashedListItem,
  BountySlashedListItemProps,
} from '@/bounty/components/BountySlashedListItem/BountySlashedListItem'
import { BN_ZERO } from '@/common/constants'
import { Member } from '@/memberships/types'
import members from '@/mocks/data/raw/members.json'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Bounty/BountySlashedListItem',
  component: BountySlashedListItem,
} as Meta

const Template: Story<BountySlashedListItemProps> = (args) => {
  return <BountySlashedListItem {...args} />
}

export const Default = Template.bind({})
Default.args = {
  entrant: members[0] as unknown as Member,
  inBlock: randomBlock(),
  stake: BN_ZERO,
}
