import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { BN_ZERO } from '@/common/constants'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { SetMembershipLeadInvitationQuota } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMembershipLeadInvitationQuota'

export default {
  title: 'Proposals/AddNewProposalModal/SetMembershipLeadInvitationQuota',
  component: SetMembershipLeadInvitationQuota,
} as Meta

const SetMembershipLeadQuotaTemplate: Story = () => {
  const [amount, setAmount] = useState(BN_ZERO)
  return (
    <MockApolloProvider members workingGroups workers>
      <SetMembershipLeadInvitationQuota amount={amount} setAmount={setAmount} />
    </MockApolloProvider>
  )
}

export const Default = SetMembershipLeadQuotaTemplate.bind({})
