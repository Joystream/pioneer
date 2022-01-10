import { Meta, Story } from '@storybook/react'
import BN from 'bn.js';
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Bounty } from '@/bounty/types/Bounty';
import { ModalContext } from '@/common/providers/modal/context'
import { MembershipContext } from '@/memberships/providers/membership/context';

import { getMember } from '../../../../test/_mocks/members';

import { ContributeFundsModal } from './ContributeFundsModal'
import {AccountsContext} from '@/accounts/providers/accounts/context';

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

const accounts = {
  isLoading: false,
  allAccounts: [
    { name: 'Alice Account', address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' },
    { name: 'Bob Account', address: '5DWS57CtERHpNehXCPcNoHGKutQYGrwvaEF5zXb26Fz9rcQp' },
  ],
  hasAccounts: true,
}

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
          <AccountsContext.Provider value={accounts}>
            <ModalContext.Provider
              value={{
                modalData: {
                  bounty,
                },
                modal: null,
                hideModal: () => undefined,
                showModal: () => undefined,
              }}
            >
              <ContributeFundsModal {...args} />
            </ModalContext.Provider>
          </AccountsContext.Provider>
        </MembershipContext.Provider>
      </HashRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
