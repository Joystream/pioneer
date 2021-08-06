import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React, { useState } from 'react'
import { interpret } from 'xstate'

import { StepDescriptionColumn, Stepper, StepperBody, StepperModalBody } from '@/common/components/StepperModal'
import { getSteps } from '@/common/model/machines/getSteps'
import { ModalContext } from '@/common/providers/modal/context'
import { PostHistoryModal } from '@/forum/modals/PostHistoryModal/PostHistoryModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMockAsOpening } from '@/mocks/data'
import { StepperProposalWrapper } from '@/proposals/modals/AddNewProposal'
import { Constants } from '@/proposals/modals/AddNewProposal/components/Constants'
import { DecreaseWorkingGroupLeadStake } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/DecreaseWorkingGroupLeadStake'
import { applyForRoleMachine } from '@/working-groups/modals/ApplyForRoleModal'
import { ApplyForRoleSuccessModal } from '@/working-groups/modals/ApplyForRoleModal/ApplyForRoleSuccessModal'

export default {
  title: 'Forum/PostHistoryModal',
  component: PostHistoryModal,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider members forum>
      <ModalContext.Provider
        value={{
          modalData: {
            postId: '1',
          },
          hideModal: () => undefined,
          showModal: () => undefined,
          modal: 'PostHistoryModal',
        }}
      />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
