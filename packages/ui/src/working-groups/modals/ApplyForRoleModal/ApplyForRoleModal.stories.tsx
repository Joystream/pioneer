import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'
import { ApplyForRoleSuccessModal } from '@/working-groups/modals/ApplyForRoleModal/ApplyForRoleSuccessModal'

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
              opening: {
                id: '123',
                title: 'Storage working group leader',
                details: 'Opening details',
                shortDescription: 'Become A Distribution Leader',
                description:
                  '### Intro\n\nContent Curators will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated.\n\n#### Details\n\nOur current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.',
                expectedEnding: '2021-03-09T10:18:04.155Z',
                type: 'LEADER',
                reward: { value: new BN(1000), interval: 3600 },
                applicants: { current: 2, total: 10 },
                hiring: { current: 0, total: 1 },
                status: 'OpeningStatusOpen',
                stake: new BN(2_000),
              },
            },
            showModal: () => undefined,
            hideModal: () => undefined,
            modal: null,
          }}
        >
          <ApplyForRoleSuccessModal
            stake={new BN(100_000)}
            stakeAccount={{ name: 'My Account', address: '0xXXXX' }}
            applicationId={123}
          />
        </ModalContext.Provider>
      </HashRouter>
    </>
  )
}

export const Success = Template.bind({})
Success.args = {}
