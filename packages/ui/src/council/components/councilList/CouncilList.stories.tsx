import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { repeat } from '@/common/utils'
import { getMember } from '@/mocks/helpers'

import { CouncilList, CouncilListProps } from './CouncilList'

export default {
  title: 'Council/CouncilList/CouncilList',
  component: CouncilList,
  argTypes: {
    onSort: { action: 'Sort' },
  },
} as Meta

interface Props extends Omit<CouncilListProps, 'councilors'> {
  count: number
  councilor: CouncilListProps['councilors'][0]
}
const Template: Story<Props> = ({ count, councilor, ...args }) => (
  <MemoryRouter>
    <CouncilList councilors={repeat(() => councilor, count)} {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  count: 5,
  councilor: {
    member: getMember('alice'),
    unpaidReward: 13923,
    stake: 130923,
    numberOfTerms: 2,
  },
  isLoading: false,
}
