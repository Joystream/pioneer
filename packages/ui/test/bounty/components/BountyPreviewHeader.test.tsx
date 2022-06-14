import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BountyPreviewHeader } from '@/bounty/components/BountyPreviewHeader/BountyPreviewHeader'
import { Bounty, WorkEntry } from '@/bounty/types/Bounty'
import { BN_ZERO } from '@/common/constants'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { Member } from '@/memberships/types'
import rawMembers from '@/mocks/data/raw/members.json'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'

const activeMember = { ...rawMembers[0], id: '0' } as unknown as Member

const defaultEntry: WorkEntry = {
  status: 'BountyEntryStatusWorking',
  hasSubmitted: false,
  winner: false,
  worker: activeMember,
  passed: false,
  works: [],
  rejected: false,
  id: '1',
  bountyId: '0',
  stake: new BN(10),
  withdrawn: false,
  hasCashedOut: false,
}

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
    entrantWhitelist: ['16'],
    entries: [],
    contributors: [],
    workPeriod: 10,
    judgingPeriod: 10,
    stage: 'expired',
    isTerminated: false,
    totalFunding: new BN(10),
    discussionThreadId: '1',
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [{ ...activeMember }],
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
      bounty.entrantWhitelist = ['12']

      renderHeader()

      expect(await screen.queryByText('bountyFields.cherry')).toBeDefined()
      expect(await screen.queryByText('bountyFields.entrantStake')).toBeDefined()
    })

    it('No contributors', async () => {
      bounty.totalFunding = BN_ZERO

      renderHeader()

      expect(await getButton('buttons.cancelBounty')).toBeDefined()
    })

    it('Other', async () => {
      bounty.fundingType = {
        minAmount: new BN(1),
        maxPeriod: 1,
        maxAmount: new BN(2),
      }
      bounty.entrantWhitelist = undefined

      renderHeader()

      expect(await getButton('buttons.cancelBounty')).toBeDefined()
    })
  })

  describe('Work Submission', () => {
    beforeEach(() => {
      bounty.stage = 'workSubmission'
    })

    it('Closed and member out of whitelist', async () => {
      bounty.entrantWhitelist = ['3']

      renderHeader()

      expect(await screen.queryByText('common:buttons.notifyAboutChanges')).toBeDefined()
    })

    it('Closed and member in whitelist', async () => {
      bounty.entrantWhitelist = ['0']

      renderHeader()

      expect(await getButton('buttons.announceEntry')).toBeDefined()
    })

    describe('Open', () => {
      beforeEach(() => {
        bounty.entrantWhitelist = undefined
      })

      it('No entry', async () => {
        bounty.entries = []

        renderHeader()

        expect(await getButton('buttons.announceEntry')).toBeDefined()
      })

      it('Entry, no works', async () => {
        bounty.entries = [
          {
            ...defaultEntry,
          },
        ]

        renderHeader()

        expect(await getButton('buttons.submitWork')).toBeDefined()
      })

      it('Entry with works', async () => {
        bounty.entries = [
          {
            ...defaultEntry,
            hasSubmitted: true,
          },
        ]

        renderHeader()

        expect(await getButton('buttons.submitWork')).toBeDefined()
        expect(await getButton('buttons.withdrawWorkEntry')).toBeDefined()
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
          ...defaultEntry,
          hasSubmitted: true,
          status: 'BountyEntryStatusWinner',
          winner: true,
          reward: new BN(1000),
        },
      ]

      renderHeader()

      expect(await getButton('buttons.claimReward')).toBeDefined()
    })

    it('Passed', async () => {
      bounty.entries = [
        {
          ...defaultEntry,
          hasSubmitted: true,
          passed: true,
          id: '1',
          stake: new BN(10),
        },
      ]

      renderHeader()

      expect(await getButton('buttons.loserWithdrawStake')).toBeDefined()
    })

    it('Other', async () => {
      bounty.entries = []
      bounty.contributors = []

      renderHeader()

      expect(await screen.queryByText('buttons.loserWithdrawStake')).toBeDefined()
      expect(await screen.queryByText('buttons.contributorWithdrawStake')).toBeNull()
      expect(await screen.queryByText('buttons.claimReward')).toBeNull()
    })
  })

  describe('Failed', () => {
    beforeAll(() => {
      bounty.stage = 'failed'
    })

    it('Worker with submission', async () => {
      bounty.entries = [
        {
          ...defaultEntry,
          passed: true,
          hasSubmitted: true,
        },
      ]

      renderHeader()

      expect(await getButton('buttons.loserWithdrawStake')).toBeDefined()
    })

    it('Worker without submission', async () => {
      bounty.entries = [
        {
          ...defaultEntry,
          passed: true,
          hasSubmitted: false,
        },
      ]

      renderHeader()

      expect(await getButton('buttons.loserWithdrawStake')).toBeDefined()
    })

    it('Worker after cashout', async () => {
      bounty.entries = [
        {
          ...defaultEntry,
          hasSubmitted: true,
          passed: true,
          hasCashedOut: true,
        },
      ]

      renderHeader()

      expect(screen.queryByText('buttons.loserWithdrawStake')).toBeNull()
    })

    it('Contributor', async () => {
      bounty.entries = []
      bounty.contributors = [
        {
          hasWithdrawn: false,
          actor: activeMember,
          amount: new BN(1222),
        },
      ]

      renderHeader()

      expect(await getButton('buttons.contributorWithdrawStake')).toBeDefined()
    })

    it('Contributor after withdrawal', async () => {
      bounty.entries = []
      bounty.contributors = [
        {
          hasWithdrawn: true,
          actor: activeMember,
          amount: new BN(1222),
        },
      ]

      renderHeader()

      expect(screen.queryByText('buttons.contributorWithdrawStake')).toBeNull()
    })

    it('Other', async () => {
      bounty.contributors = []
      bounty.entries = []

      renderHeader()

      expect(await screen.queryByText('buttons.loserWithdrawStake')).toBeNull()
      expect(await screen.queryByText('buttons.contributorWithdrawStake')).toBeNull()
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
