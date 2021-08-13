import { Meta, Story } from '@storybook/react'
import { addMonths, startOfToday } from 'date-fns'
import React from 'react'

import { ItemCount } from '@/common/components/ItemCount'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ThreadFilters } from './ThreadFilters'

export default {
  title: 'Forum/Threads/ThreadFilters',
  component: ThreadFilters,
  argTypes: {
    onApply: { action: 'Apply' },
  },
} as Meta

export const Default: Story<{ onApply: () => void }> = ({ onApply }) => {
  const today = startOfToday()
  const withinDates = { start: addMonths(today, -13), end: today }

  return (
    <MockApolloProvider members>
      <ThreadFilters withinDates={withinDates} onApply={onApply}>
        <ItemCount count={10} size="xs">
          Threads
        </ItemCount>
      </ThreadFilters>
    </MockApolloProvider>
  )
}

Default.args = {}
