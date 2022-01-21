import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BountyPreviewHeader } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'
import { Bounty } from '@/bounty/types/Bounty'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { Member } from '@/memberships/types'
import rawMembers from '@/mocks/data/raw/members.json'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'

const activeMember = { ...rawMembers[0], id: '0' } as unknown as Member

describe('UI: BountyPreviewHeader', () => {
  const bounty: Bounty = {
    id: '6',
    inBlock: 111,
    imageUri: '',
    createdAt: '2021-12-13T18:42:39.738Z',
    title: 'Est tenetur vel nihil ut et.',
    description:
      '# alias sunt\n\nAdipisci molestiae quibusdam voluptatum mollitia. Ullam sit nostrum saepe nemo earum recusandae sed ut. Eveniet nihil soluta aut maiores maxime. Cupiditate nostrum quia illum nesciunt assumenda nulla. Qui repellat sit animi veritatis nisi esse. Voluptate laborum sit qui.\n\n## consequatur illum\n\nSed ut autem nam. Aliquam at et eligendi. Eius quia sed delectus.\n \rProvident consequatur earum adipisci. Quo qui eum qui. Earum aliquam id.',
    cherry: new BN(10),
    entrantStake: new BN(10),
    creator: {
      id: '0',
    } as unknown as Member,
    oracle: {
      id: '1',
    } as unknown as Member,
    fundingType: {
      minAmount: new BN(10),
      maxAmount: new BN(10),
      maxPeriod: 9,
    },
    contractType: {
      whitelist: ['16'],
    },
    entries: [],
    contributors: [],
    workPeriod: new BN(10),
    judgingPeriod: new BN(10),
    stage: 'expired',
    totalFunding: new BN(10),
    discussionThreadId: '1',
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  let useAccounts: UseAccounts

  beforeAll(() => {
    useMyMemberships.active = activeMember
    useAccounts = {
      isLoading: false,
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  it('Renders title', async () => {
    renderHeader()

    expect(await screen.queryByText(bounty.title)).toBeDefined()
  })

  describe('Funding', () => {
    beforeAll(() => {
      bounty.stage = 'funding'
    })

    it('Limited/Perpetual', async () => {
      bounty.fundingType = {
        target: new BN(1),
      }
      bounty.contractType = {
        whitelist: ['12'],
      }

      renderHeader()

      expect(await screen.queryByText('bountyFields.cherry')).toBeDefined()
      expect(await screen.queryByText('bountyFields.entrantStake')).toBeDefined()
    })

    it('Other', async () => {
      bounty.fundingType = {
        minAmount: new BN(1),
        maxPeriod: 1,
        maxAmount: new BN(2),
      }
      bounty.contractType = 'ContractOpen'

      renderHeader()

      expect(await getButton('common:buttons.contribute')).toBeDefined()
    })
  })

  describe('Work Submission', () => {
    beforeEach(() => {
      bounty.stage = 'workSubmission'
    })

    it('Closed and member out of whitelist', async () => {
      bounty.contractType = {
        whitelist: ['3'],
      }

      renderHeader()

      expect(await screen.queryByText('common:buttons.notifyAboutChanges')).toBeDefined()
    })

    it('Closed and member in whitelist', async () => {
      bounty.contractType = {
        whitelist: ['0'],
      }

      renderHeader()

      expect(await getButton('buttons.announceEntry')).toBeDefined()
    })

    describe('Open', () => {
      beforeEach(() => {
        bounty.contractType = 'ContractOpen'
      })

      it('No entry', async () => {
        bounty.entries = []

        renderHeader()

        expect(await getButton('buttons.announceEntry')).toBeDefined()
      })

      it('Entry, no works', async () => {
        bounty.entries = [
          {
            hasSubmitted: false,
            winner: false,
            worker: activeMember,
            passed: false,
            id: '1',
          },
        ]

        renderHeader()

        expect(await getButton('buttons.submitWork')).toBeDefined()
      })

      it('Entry with works', async () => {
        bounty.entries = [
          {
            hasSubmitted: true,
            winner: false,
            worker: activeMember,
            passed: false,
            id: '1',
          },
        ]

        renderHeader()

        expect(await getButton('buttons.submitWork')).toBeDefined()
        expect(await getButton('common:buttons.withdraw')).toBeDefined()
      })
    })
  })

  describe('Judgment', () => {
    beforeAll(() => {
      bounty.stage = 'judgment'
    })

    it('As oracle', async () => {
      bounty.oracle = {
        id: '0',
      } as unknown as Member

      renderHeader()

      expect(await getButton('buttons.submitJudgement')).toBeDefined()
      expect(await screen.queryByText('common:buttons.notifyAboutChanges')).toBeDefined()
    })

    it('Other', async () => {
      bounty.oracle = undefined

      renderHeader()

      expect(await screen.queryByText('buttons.submitJudgement')).toBeNull()
      expect(await screen.queryByText('common:buttons.notifyAboutChanges')).toBeDefined()
    })
  })

  describe('Successful', () => {
    beforeAll(() => {
      bounty.stage = 'successful'
    })

    it('Winner', async () => {
      bounty.entries = [
        {
          hasSubmitted: true,
          winner: true,
          worker: activeMember,
          passed: false,
          id: '1',
        },
      ]

      renderHeader()

      expect(await getButton('common:buttons.claimReward')).toBeDefined()
    })

    it('Passed', async () => {
      bounty.entries = [
        {
          hasSubmitted: true,
          winner: false,
          worker: activeMember,
          passed: true,
          id: '1',
        },
      ]

      renderHeader()

      expect(await getButton('common:buttons.withdrawStake')).toBeDefined()
    })

    it('Contributor', async () => {
      bounty.entries = []
      bounty.contributors = [
        {
          actor: activeMember,
          amount: new BN(1222),
        },
      ]

      renderHeader()

      expect(await getButton('common:buttons.withdrawStake')).toBeDefined()
    })

    it('Other', async () => {
      bounty.entries = []
      bounty.contributors = []

      renderHeader()

      expect(await screen.queryByText('common:buttons.withdrawStake')).toBeNull()
      expect(await screen.queryByText('common:buttons.claimReward')).toBeNull()
    })
  })

  describe('Failed', () => {
    beforeAll(() => {
      bounty.stage = 'failed'
    })

    it('Worker', async () => {
      bounty.entries = [
        {
          hasSubmitted: true,
          winner: false,
          worker: activeMember,
          passed: false,
          id: '1',
        },
      ]

      renderHeader()

      expect(await getButton('common:buttons.withdrawStake')).toBeDefined()
    })

    it('Contributor', async () => {
      bounty.entries = []
      bounty.contributors = [
        {
          actor: activeMember,
          amount: new BN(1222),
        },
      ]

      renderHeader()

      expect(await getButton('common:buttons.withdrawStake')).toBeDefined()
    })

    it('Other', async () => {
      bounty.contributors = []
      bounty.entries = []

      renderHeader()

      expect(await screen.queryByText('common:buttons.withdrawStake')).toBeNull()
    })
  })

  describe('Expired', () => {
    beforeAll(() => {
      bounty.stage = 'expired'
    })

    it('Creator', async () => {
      bounty.creator = {
        id: '0',
      } as unknown as Member

      renderHeader()

      expect(await getButton('buttons.cancelBounty')).toBeDefined()
    })

    it('Other', async () => {
      bounty.creator = undefined

      renderHeader()

      expect(await screen.queryByText('buttons.cancelBounty')).toBeNull()
    })
  })

  const renderHeader = () => {
    render(
      <AccountsContext.Provider value={useAccounts}>
        <MembershipContext.Provider value={useMyMemberships}>
          <BountyPreviewHeader bounty={bounty} />
        </MembershipContext.Provider>
      </AccountsContext.Provider>
    )
  }
})
