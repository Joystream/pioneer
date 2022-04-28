import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import { MemoryRouter } from 'react-router'

import { repeat } from '@/common/utils'
import { getMember } from '@/mocks/helpers'

import { CouncilList, CouncilOrder, CouncilListProps } from './CouncilList'

export default {
  title: 'Council/CouncilList/CouncilList',
  component: CouncilList,
} as Meta

interface Props {
  count: number
  councilor: CouncilListProps['councilors'][0]
  isLoading: boolean
}
const Template: Story<Props> = ({ count, councilor, isLoading }) => {
  const [order, setOrder] = useState<CouncilOrder>({ key: 'member' })
  return (
    <MemoryRouter>
      <CouncilList councilors={repeat(() => councilor, count)} order={order} onSort={setOrder} isLoading={isLoading} />
    </MemoryRouter>
  )
}

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
