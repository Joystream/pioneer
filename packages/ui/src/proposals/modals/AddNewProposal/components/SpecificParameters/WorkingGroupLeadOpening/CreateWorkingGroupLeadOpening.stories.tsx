import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { CreateWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'

export default {
  title: 'Proposals/AddNewProposalModal/CreateWorkingGroupLeadOpening',
  component: CreateWorkingGroupLeadOpening,
} as Meta

const Template: Story = () => {
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [groupId, setGroupId] = useState('')

  return (
    <MockApolloProvider members workingGroups>
      <CreateWorkingGroupLeadOpening
        description={description}
        shortDescription={shortDescription}
        groupId={groupId}
        setDescription={setDescription}
        setShortDescription={setShortDescription}
        setGroupId={setGroupId}
      />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
