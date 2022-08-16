import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ApiContext } from '@/api/providers/context'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ProposalsOverview } from './ProposalsOverview'

export default {
  title: 'Overview/ProposalsOverview',
  component: ProposalsOverview,
} as Meta

export const Default: Story = () => {
  const [state] = useState<any>({ useApi })

  return (
    <ApiContext.Provider value={state.useApi}>
      <MockApolloProvider members proposals workingGroups workers>
        <ProposalsOverview />
      </MockApolloProvider>
    </ApiContext.Provider>
  )
}
