import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { FillWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/FillWorkingGroupLeadOpening'

export default {
  title: 'Proposals/AddNewProposalModal/FillWorkingGroupLeadOpening',
  component: FillWorkingGroupLeadOpening,
} as Meta

const FillWorkingGroupLeadOpeningTemnplate: Story = () => {
  const [applicationsId, setApplicationId] = useState<any>('')
  const [openingId, setOpeningId] = useState<any>('')
  return (
    <MockApolloProvider members workingGroups>
      <FillWorkingGroupLeadOpening
        applicationId={applicationsId}
        setApplicationId={setApplicationId}
        openingId={openingId}
        setOpeningId={setOpeningId}
      />
    </MockApolloProvider>
  )
}

export const Default = FillWorkingGroupLeadOpeningTemnplate.bind({})
