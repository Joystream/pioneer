import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { PastCouncilsList } from '@/council/components/PastCouncilsList'
import { Council } from '@/council/types'

export default {
  title: 'Council/PastCouncils',
  component: PastCouncilsList,
} as Meta

interface Props {
  count: number
  councils: Council[]
  isLoading: boolean
}

const Template: Story<Props> = ({ councils, isLoading }) => {
  return (
    <MemoryRouter>
      <PastCouncilsList isLoading={isLoading} councils={councils} />
    </MemoryRouter>
  )
}

export const Default = Template.bind({})

Default.args = {
  councils: [
    { id: '0', electedAtBlock: 112145, councilors: [] },
    { id: '1', electedAtBlock: 222346, councilors: [] },
    { id: '1', electedAtBlock: 452335, councilors: [] },
  ],
  isLoading: false,
}

export const Loading = Template.bind({})

Loading.args = {
  isLoading: true,
}

export const Empty = Template.bind({})

Empty.args = {
  isLoading: false,
  councils: [],
}
