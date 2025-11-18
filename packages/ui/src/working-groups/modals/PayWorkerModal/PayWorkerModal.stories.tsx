import { BN_THOUSAND } from '@polkadot/util'
import { Meta, Story, StoryContext } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'
import { member } from '@/mocks/data/members'
import { MocksParameters } from '@/mocks/providers'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { randomBlock } from '@/mocks/helpers/randomBlock'
import { GetRoleAccountsDocument } from '@/working-groups/queries'

import { PayWorkerModal } from './PayWorkerModal'

const mockWorker = {
  id: '123',
  runtimeId: 12,
  group: { id: 'forumWorkingGroup', name: 'forum' },
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
}

export default {
  title: 'WorkingGroup/PayWorkerModal',
  component: PayWorkerModal,
  parameters: {
    mocks: (): MocksParameters => {
      const alice = member('alice')
      const roleAccount = 'j4VdDQVdwFYfQ2MvEdLT2EYZx4ALPQQ6yMyZopKoZEQmXcJrT'

      return {
        accounts: {
          active: {
            member: alice,
            account: { name: 'Alice Role Account', address: roleAccount },
          },
          list: [
            { member: alice, account: { name: 'Alice Role Account', address: roleAccount } },
            { member: alice, account: { name: 'Alice Controller', address: alice.controllerAccount } },
          ],
        },
        chain: {
          tx: {
            forumWorkingGroup: {
              spendFromBudget: {
                event: 'BudgetSpending',
              },
              vestedSpendFromBudget: {
                event: 'VestedBudgetSpending',
              },
            },
          },
        },
        gql: {
          queries: [
            {
              query: GetRoleAccountsDocument,
              resolver: (options) => {
                const where = options?.variables?.where
                if (
                  where?.membership?.id_eq === alice.id &&
                  where?.group?.id_eq === mockWorker.group.id &&
                  where?.isLead_eq === true
                ) {
                  return {
                    loading: false,
                    data: {
                      workers: [{ roleAccount }],
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

const Template: Story = () => {
  return (
    <HashRouter>
      <MockApolloProvider members workingGroups workers>
        <ModalContext.Provider
          value={{
            modalData: {
              worker: mockWorker,
            },
            showModal: () => undefined,
            hideModal: () => undefined,
            modal: 'PayWorker',
          }}
        >
          <PayWorkerModal />
        </ModalContext.Provider>
      </MockApolloProvider>
    </HashRouter>
  )
}

export const Default = Template.bind({})
Default.args = {}

