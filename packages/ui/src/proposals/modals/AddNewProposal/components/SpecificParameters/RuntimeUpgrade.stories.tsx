import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { RuntimeUpgrade } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'

export default {
  title: 'Proposals/AddNewProposalModal/RuntimeUpgrade',
  component: RuntimeUpgrade,
} as Meta

const Template: Story = () => {
  const [blob, setBlob] = useState<string>()

  return (
    <MockApolloProvider members workingGroups>
      <RuntimeUpgrade blob={blob} setBlob={setBlob} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
