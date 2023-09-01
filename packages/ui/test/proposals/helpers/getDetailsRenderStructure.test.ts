import BN from 'bn.js'

import getDetailsRenderStructure from '@/proposals/helpers/getDetailsRenderStructure'

import { alice, aliceStash, bob } from '../../_mocks/keyring'

describe('getDetailsRenderStructure()', () => {
  it('Funding request (1 destination)', () => {
    const structure = getDetailsRenderStructure({
      type: 'fundingRequest',
      destinations: [
        {
          account: alice.address,
          amount: new BN(20),
        },
      ],
    })

    expect(structure).toEqual({
      structure: [
        {
          label: 'amount',
          value: new BN(20),
          renderType: 'Amount',
        },
        {
          label: 'destination',
          value: alice.address,
          renderType: 'Address',
        },
      ],
    })
  })

  it('Funding request (3 destination)', () => {
    const structure = getDetailsRenderStructure({
      type: 'fundingRequest',
      destinations: [
        {
          account: alice.address,
          amount: new BN(20),
        },
        {
          account: bob.address,
          amount: new BN(30),
        },

        {
          account: aliceStash.address,
          amount: new BN(10),
        },
      ],
    })

    expect(structure).toEqual({
      structure: [
        {
          label: 'Total Payment',
          value: new BN(60),
          renderType: 'Amount',
        },
        {
          label: 'Payment Details',
          value: [
            {
              account: alice.address,
              amount: new BN(20),
            },
            {
              account: bob.address,
              amount: new BN(30),
            },
            {
              account: aliceStash.address,
              amount: new BN(10),
            },
          ],
          renderType: 'DestinationsPreview',
        },
      ],
    })
  })

  it('Runtime upgrade', () => {
    const structure = getDetailsRenderStructure({
      type: 'runtimeUpgrade',
      newBytecodeId: '0xFFF',
    })

    expect(structure).toEqual({
      structure: [
        {
          label: 'Blob',
          value: '0xFFF',
          renderType: 'RuntimeBlob',
        },
      ],
    })
  })

  it('Create Working Group Lead Opening', () => {
    const structure = getDetailsRenderStructure({
      type: 'createWorkingGroupLeadOpening',
      group: {
        id: 'storageWorkingGroup',
        name: 'Storage',
      },
      openingDescription: 'description',
      rewardPerBlock: new BN(15),
      stakeAmount: new BN(1000),
      unstakingPeriod: new BN(43200),
    })

    expect(structure).toEqual({
      structure: [
        {
          label: 'Working Group',
          value: 'Storage',
          renderType: 'Text',
        },
        {
          label: 'Staking amount',
          value: new BN(1000),
          renderType: 'Amount',
        },
        {
          label: 'Leaving unstaking period',
          value: new BN(43200),
          renderType: 'NumberOfBlocks',
        },
        {
          label: 'Reward per Block',
          value: new BN(15),
          renderType: 'Amount',
        },
        {
          label: 'Opening Description',
          value: 'description',
          renderType: 'Markdown',
        },
      ],
    })
  })

  it('Decrease Working Group Lead Stake', () => {
    const structure = getDetailsRenderStructure({
      type: 'decreaseWorkingGroupLeadStake',
      groupName: 'Storage',
      amount: new BN(75_000),
      member: {
        id: '0',
        handle: '',
        rootAccount: alice.address,
        controllerAccount: alice.address,
        inviteCount: 1,
        roles: [],
        boundAccounts: [],
        isVerified: true,
        isFoundingMember: true,
        isCouncilMember: true,
        createdAt: '',
      },
    })

    expect(structure).toEqual({
      structure: [
        {
          label: 'Working Group',
          value: 'Storage',
          renderType: 'Text',
        },
        {
          label: 'Worker ID',
          value: '0',
          renderType: 'Member',
        },
        {
          label: 'Decrease stake amount',
          value: new BN(75_000),
          renderType: 'Amount',
        },
      ],
    })
  })

  it('Slash Working Group Lead', () => {
    const structure = getDetailsRenderStructure({
      type: 'slashWorkingGroupLead',
      groupName: 'Bad group',
      amount: new BN(10_000),
      member: {
        id: '0',
        handle: '',
        rootAccount: alice.address,
        controllerAccount: alice.address,
        inviteCount: 1,
        roles: [],
        boundAccounts: [],
        isVerified: true,
        isFoundingMember: true,
        isCouncilMember: true,
        createdAt: '',
      },
    })

    expect(structure).toEqual({
      structure: [
        {
          label: 'Working Group',
          value: 'Bad group',
          renderType: 'Text',
        },
        {
          label: 'Worker ID',
          value: '0',
          renderType: 'Member',
        },
        {
          label: 'Slashing amount',
          value: new BN(10_000),
          renderType: 'Amount',
        },
      ],
    })
  })
})
