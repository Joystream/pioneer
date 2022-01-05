import { Meta, Story } from '@storybook/react'
import BN from 'bn.js';
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Bounty } from '@/bounty/types/Bounty';
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context';

import { getMember } from '../../../../test/_mocks/members';

import { ContributeFundsModal } from './ContributeFundsModal'

export default {
  title: 'Bounty/Modals/ContributeFundsModal',
  component: ContributeFundsModal,
} as Meta

const bounty: Bounty = {
  id: 'bounty 1',
  fundingType: {
    maxAmount: new BN(20000),
    minAmount: new BN(15000),
    maxPeriod: 1000,
  },
  totalFunding: new BN(10000),
} as Bounty;

const Template: Story = (args) => {
  return (
    <>
      <HashRouter>
        <MembershipContext.Provider
          value={{
            isLoading: false,
            active: getMember('alice'),
            hasMembers: true,
            setActive: () => null,
            members: [],
            helpers: {
              getMemberIdByBoundAccountAddress: () => undefined,
            },
          }}
        >
          <ModalContext.Provider
            value={{
              modalData: {
                bounty,
              },
              modal: 'Foo',
              hideModal: () => undefined,
              showModal: () => undefined,
            }}
          >
            <ContributeFundsModal {...args} />
          </ModalContext.Provider>
        </MembershipContext.Provider>
      </HashRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
