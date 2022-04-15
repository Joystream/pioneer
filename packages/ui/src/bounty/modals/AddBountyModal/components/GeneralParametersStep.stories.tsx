import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { GeneralParametersStep } from '@/bounty/modals/AddBountyModal/components/GeneralParametersStep'
import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'bounty/AddBountyModal/GeneralParametersStep',
  component: GeneralParametersStep,
} as Meta

const GeneralParametersStepTemplate: Story = () => {
  const [activeMember] = useState<Member>()

  return (
    <MockApolloProvider members>
      <GeneralParametersStep
        activeMember={activeMember}
        errorChecker={() => false}
        errorMessageGetter={() => undefined}
      />
    </MockApolloProvider>
  )
}

export const Default = GeneralParametersStepTemplate.bind({})
