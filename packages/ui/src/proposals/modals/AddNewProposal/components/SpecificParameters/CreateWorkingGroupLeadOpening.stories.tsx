import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { CreateWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/CreateWorkingGroupLeadOpening'

export default {
  title: 'Proposals/AddNewProposalModal/CreateWorkingGroupLeadOpening',
  component: CreateWorkingGroupLeadOpening,
} as Meta

const Template: Story = () => {
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [groupId, setGroupId] = useState('')

  return (
    <CreateWorkingGroupLeadOpening
      description={description}
      shortDescription={shortDescription}
      groupId={groupId}
      setDescription={setDescription}
      setShortDescription={setShortDescription}
      setGroupId={setGroupId}
    />
  )
}

export const Default = Template.bind({})
