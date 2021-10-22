import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { PastCouncilsList } from '@/council/components/PastCouncilsList/PastCouncilsList'
import { PastCouncil } from '@/council/types/PastCouncil'

export default {
  title: 'Council/PastCouncils',
  component: PastCouncilsList,
} as Meta

interface Props {
  count: number
  councils: PastCouncil[]
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
    { id: '0', endedAtBlock: 112145 },
    { id: '1', endedAtBlock: 222346 },
    { id: '1', endedAtBlock: 45233 },
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
