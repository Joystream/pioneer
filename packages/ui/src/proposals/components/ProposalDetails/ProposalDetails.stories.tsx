import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'

import { RowGapBlock } from '@/common/components/page/PageContent'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { getMember } from '../../../../test/_mocks/members'
import { ModalContext } from '../../../common/providers/modal/context'

import { ProposalDetails } from './ProposalDetails'

export default {
  title: 'Pages/Proposals/ProposalPreview/Components/ProposalDetails',
  component: ProposalDetails,
} as Meta

type Props = Parameters<typeof ProposalDetails>[number]

const Template: Story<Props> = (args) => (
  <MockApolloProvider members proposals workingGroups workers>
    <ModalContext.Provider
      value={{
        modal: null,
        modalData: null,
        showModal: () => undefined,
        hideModal: () => undefined,
      }}
    >
      <RowGapBlock gap={24}>
        <ProposalDetails {...args} />
      </RowGapBlock>
    </ModalContext.Provider>
  </MockApolloProvider>
)

export const CreateLeadOpening = Template.bind({})
CreateLeadOpening.args = {
  proposalDetails: {
    type: 'createWorkingGroupLeadOpening',
    stakeAmount: new BN(10000),
    unstakingPeriod: new BN(14400),
    rewardPerBlock: new BN(12),
    group: {
      id: 'storageWorkingGroup',
      name: 'storage',
    },
    openingDescription:
      '# itaque numquam magni et velit\n\nSunt numquam et molestiae alias quia aut sed. Corporis quia non qui illum iure facilis. Quia quod ut omnis id aut omnis exercitationem neque recusandae. Animi nesciunt consequatur. Qui velit voluptatem unde numquam et dolore impedit eveniet saepe.\n\n## dolores iste eos quidem\n\nPlaceat eaque esse aut qui et autem quo ab. Ipsa facere dolorem quasi amet. Quae corporis omnis. Corporis vel nihil placeat.',
  },
}

export const RuntimeUpgrade = Template.bind({})
RuntimeUpgrade.args = {
  proposalDetails: {
    type: 'runtimeUpgrade',
    newBytecodeId: '1',
  },
}

export const FundingRequest = Template.bind({})
FundingRequest.args = {
  proposalDetails: {
    type: 'fundingRequest',
    destinations: [
      {
        account: '5GBVQJZzv2nrRVtjgTg4JwCwbEfKeueiKqQ5ysFxLfiQPRiY',
        amount: new BN(30000),
      },
      {
        account: '5JwCwbEfKeueiKqQ5ysFxLfiQPRiYGBVQJZzv2nrRVtjgTg4',
        amount: new BN(140000),
      },
      {
        account: '5JwCwbEfKeueiKqQ5ysFxLfiQPRiYGBVQJZzv2nrRVtjgTg4',
        amount: new BN(140000),
      },
    ],
  },
}

export const DecreaseLeadStake = Template.bind({})
DecreaseLeadStake.args = {
  proposalDetails: {
    type: 'decreaseWorkingGroupLeadStake',
    groupName: 'storage',
    amount: new BN(10000),
    member: getMember('alice'),
  },
}

export const SlashLead = Template.bind({})
SlashLead.args = {
  proposalDetails: {
    type: 'slashWorkingGroupLead',
    groupName: 'forum',
    amount: new BN(15000),
    member: getMember('bob'),
  },
}
