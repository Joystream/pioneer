import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { CancelWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CancelWorkingGroupLeadOpening'
import { GroupIdName } from '@/working-groups/types'

export default {
  title: 'Proposals/AddNewProposalModal/CancelWorkingGroupLeadOpening',
  component: CancelWorkingGroupLeadOpening,
} as Meta

const CancelWorkingGroupLeadOpeningTemplate: Story = () => {
  const [groupId, setGroupId] = useState('')
  const [openingId, setOpeningId] = useState<any>('')
  return (
    <MockApolloProvider members workingGroups>
      <CancelWorkingGroupLeadOpening
        groupId={groupId as GroupIdName}
        setGroupId={setGroupId}
        openingId={openingId}
        setOpeningId={setOpeningId}
      />
    </MockApolloProvider>
  )
}

export const Default = CancelWorkingGroupLeadOpeningTemplate.bind({})
