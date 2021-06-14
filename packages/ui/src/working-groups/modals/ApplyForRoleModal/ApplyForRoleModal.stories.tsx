import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'
import { ApplyForRoleSuccessModal } from '@/working-groups/modals/ApplyForRoleModal/ApplyForRoleSuccessModal'

import { getMockAsOpening } from '../../../mocks/data/seedOpenings'

import { ApplyForRoleModal } from './ApplyForRoleModal'

export default {
  title: 'WorkingGroup/ApplyForRoleModal',
  component: ApplyForRoleModal,
} as Meta

const Template: Story = () => {
  return (
    <>
      <HashRouter>
        <ModalContext.Provider
          value={{
            modalData: {
              opening: getMockAsOpening(),
            },
            showModal: () => undefined,
            hideModal: () => undefined,
            modal: null,
          }}
        >
          <ApplyForRoleSuccessModal
            stake={new BN(100_000)}
            stakeAccount={{ name: 'My Account', address: '0xXXXX' }}
            applicationId={new BN(420)}
          />
        </ModalContext.Provider>
      </HashRouter>
    </>
  )
}

export const Success = Template.bind({})
Success.args = {}
