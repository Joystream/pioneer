import { BN_THOUSAND } from '@polkadot/util'
import { Meta, Story, StoryContext } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { TemplateBlock, ModalBlock, WhiteBlock } from '@/common/components/storybookParts/previewStyles'
import { Member } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { member } from '@/mocks/data/members'
import { randomBlock } from '@/mocks/helpers/randomBlock'
import { MocksParameters } from '@/mocks/providers'
import { GetRoleAccountsDocument } from '@/working-groups/queries'

import { MemberRoleToggle, MemberRoleToggleProps } from './MemberRoleToggle'

const createMockMember = (): Member => {
  const membership = member('alice')
  return {
    id: membership.id,
    handle: membership.handle,
    rootAccount: membership.rootAccount,
    controllerAccount: membership.controllerAccount,
    boundAccounts: membership.boundAccounts || [],
    inviteCount: membership.inviteCount,
    roles: [],
    isVerified: membership.isVerified,
    isFoundingMember: membership.isFoundingMember,
    isCouncilMember: membership.isCouncilMember,
    createdAt: membership.createdAt,
  }
}

export default {
  title: 'Member/MemberRoleToggle',
  component: MemberRoleToggle,
  parameters: {
    mocks: ({ args }: StoryContext<MemberRoleToggleProps>): MocksParameters => {
      const alice = member('alice')
      const roleAccount = args?.role?.roleAccount || 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT'
      const isLead = args?.role?.isLead || false

      return {
        accounts: {
          active: {
            member: alice,
            account: { name: 'Alice Account', address: roleAccount },
          },
          list: [
            { member: alice, account: { name: 'Alice Account', address: roleAccount } },
            { member: alice, account: { name: 'Alice Controller', address: alice.controllerAccount } },
          ],
        },
        gql: {
          queries: [
            {
              query: GetRoleAccountsDocument,
              resolver: (options) => {
                const where = options?.variables?.where
                if (
                  where?.membership?.id_eq === alice.id &&
                  where?.group?.id_eq === args?.role?.group?.id &&
                  where?.isLead_eq === true
                ) {
                  return {
                    loading: false,
                    data: {
                      workers: isLead ? [{ roleAccount }] : [],
                    },
                  }
                }
                return { loading: false, data: { workers: [] } }
              },
            },
          ],
        },
      }
    },
  },
} as Meta

const Template: Story<MemberRoleToggleProps> = (args) => (
  <MockApolloProvider members workingGroups workers>
    <TemplateBlock>
      <ModalBlock>
        <MemberRoleToggle {...args} />
      </ModalBlock>
      <WhiteBlock>
        <MemberRoleToggle {...args} />
      </WhiteBlock>
    </TemplateBlock>
  </MockApolloProvider>
)

export const Default = Template.bind({})
Default.args = {
  member: createMockMember(),
  role: {
    id: '123',
    runtimeId: 12,
    group: { id: 'membershipWorkingGroup', name: 'membership' },
    isLead: false,
    membership: { id: '0', controllerAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT' },
    rewardPerBlock: BN_THOUSAND,
    stake: new BN(192837021),
    owedReward: new BN(1000),
    minStake: new BN(400),
    roleAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
    rewardAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    stakeAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    hiredAtBlock: {
      ...randomBlock(),
    },
    applicationId: '0',
    openingId: '0',
    status: 'WorkerStatusActive',
  },
}

export const AsLead = Template.bind({})
AsLead.args = {
  member: createMockMember(),
  role: {
    id: '123',
    runtimeId: 12,
    group: { id: 'forumWorkingGroup', name: 'forum' },
    isLead: true,
    membership: { id: '0', controllerAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT' },
    rewardPerBlock: BN_THOUSAND,
    stake: new BN(192837021),
    owedReward: new BN(1000),
    minStake: new BN(400),
    roleAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT', // Same as controllerAccount to show button
    rewardAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
    stakeAccount: 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT',
    hiredAtBlock: {
      ...randomBlock(),
    },
    applicationId: '0',
    openingId: '0',
    status: 'WorkerStatusActive',
  },
}
