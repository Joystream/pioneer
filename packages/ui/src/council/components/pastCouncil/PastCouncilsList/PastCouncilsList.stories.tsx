import { Meta, Story } from '@storybook/react'
import React from 'react'

import { PastCouncilsList } from '@/council/components/pastCouncil/PastCouncilsList/PastCouncilsList'
import { PastCouncil } from '@/council/types/PastCouncil'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export default {
  title: 'Council/PastCouncils',
  component: PastCouncilsList,
} as Meta

interface Props {
  count: number
  councils: PastCouncil[]
  isLoading: boolean
}

const Template: Story<Props> = () => {
  return <PastCouncilsList />
}

export const Default = Template.bind({})

Default.args = {
  councils: [
    { cycleId: 1, endedAt: randomBlock() },
    { cycleId: 2, endedAt: randomBlock() },
    { cycleId: 2, endedAt: randomBlock() },
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
