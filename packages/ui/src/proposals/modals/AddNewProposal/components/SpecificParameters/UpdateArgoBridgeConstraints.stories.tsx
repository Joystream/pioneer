import { Meta, StoryObj } from '@storybook/react'

import { AddProposalModalDecorator } from '@/common/components/storybookParts/Decorators'
import { member } from '@/mocks/data/members'
import { joy } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { UpdateArgoBridgeConstraints } from './UpdateArgoBridgeConstraints'

const aliceAddress = member('alice').controllerAccount
const bobAddress = member('bob').controllerAccount
const charlieAddress = member('charlie').controllerAccount

export default {
  title: 'Pages/Proposals/ProposalList/Current/Modals/AddNewProposalModal/UpdateArgoBridgeConstraints',
  component: UpdateArgoBridgeConstraints,
  parameters: {
    mocks: {
      chain: {
        query: {
          argoBridge: {
            operatorAccount: aliceAddress,
            pauserAccounts: [bobAddress, charlieAddress],
            bridgingFee: joy(0.1),
            thawnDuration: 200,
            remoteChains: [37, 42],
          },
        },
      },
    } satisfies MocksParameters,
  },
} as Meta

export const Default: StoryObj = {
  name: 'UpdateArgoBridgeConstraints',
  decorators: [AddProposalModalDecorator],
}
