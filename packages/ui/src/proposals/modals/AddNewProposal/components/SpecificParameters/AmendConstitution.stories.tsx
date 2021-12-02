import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { AmendConstitution } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/AmendConstitution'

export default {
  title: 'Proposals/AddNewProposalModal/AmendConstitution',
  component: AmendConstitution,
} as Meta

const AmendConstitutionTemplate: Story = () => {
  const [description, setDescription] = useState('')
  return (
    <MockApolloProvider members workingGroups>
      <AmendConstitution description={description} setDescription={setDescription} />
    </MockApolloProvider>
  )
}

export const Default = AmendConstitutionTemplate.bind({})
