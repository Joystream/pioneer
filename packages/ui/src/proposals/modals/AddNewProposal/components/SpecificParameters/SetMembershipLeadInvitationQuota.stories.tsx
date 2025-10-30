import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetMembershipLeadInvitationQuota } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMembershipLeadInvitationQuota'

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/SetMembershipLeadInvitationQuota',
  component: SetMembershipLeadInvitationQuota,
} as Meta

const SetMembershipLeadQuotaTemplate: Story = () => {
  return (
    <MockApolloProvider members workingGroups workers>
      <SetMembershipLeadInvitationQuota />
    </MockApolloProvider>
  )
}

export const Default = SetMembershipLeadQuotaTemplate.bind({})
