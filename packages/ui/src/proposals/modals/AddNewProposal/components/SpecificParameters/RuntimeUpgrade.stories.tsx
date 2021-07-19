import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RuntimeUpgrade } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'

export default {
  title: 'Proposals/AddNewProposalModal/RuntimeUpgrade',
  component: RuntimeUpgrade,
} as Meta

const Template: Story = () => {
  const [runtime, setRuntime] = useState<ArrayBuffer>()

  return (
    <MockApolloProvider members workingGroups>
      <RuntimeUpgrade runtime={runtime} setRuntime={setRuntime} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
