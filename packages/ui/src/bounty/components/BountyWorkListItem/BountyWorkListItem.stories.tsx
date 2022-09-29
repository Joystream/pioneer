import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BountyWorkListItem, BountyWorkListItemProps } from '@/bounty/components/BountyWorkListItem/BountyWorkListItem'
import { Member } from '@/memberships/types'
import members from '@/mocks/data/raw/members.json'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Bounty/BountyWorkListItem',
  component: BountyWorkListItem,
} as Meta

const Template: Story<BountyWorkListItemProps> = (args) => {
  return <BountyWorkListItem {...args} />
}

export const Default = Template.bind({})
Default.args = {
  id: '',
  entrant: members[0] as unknown as Member,
  inBlock: randomBlock(),
  title: 'Random title',
  withdrawn: false,
  description:
    'Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip',
}
