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

describe('UI: BountyPreviewHeader', () => {
  const bounty: Bounty = {
    id: '6',
    createdAt: '2021-12-13T18:42:39.738Z',
    title: 'Est tenetur vel nihil ut et.',
    description:
      '# alias sunt\n\nAdipisci molestiae quibusdam voluptatum mollitia. Ullam sit nostrum saepe nemo earum recusandae sed ut. Eveniet nihil soluta aut maiores maxime. Cupiditate nostrum quia illum nesciunt assumenda nulla. Qui repellat sit animi veritatis nisi esse. Voluptate laborum sit qui.\n\n## consequatur illum\n\nSed ut autem nam. Aliquam at et eligendi. Eius quia sed delectus.\n \rProvident consequatur earum adipisci. Quo qui eum qui. Earum aliquam id.',
    cherry: new BN(10),
    entrantStake: new BN(10),
    creator: ({
      id: '0',
    } as unknown) as Member,
    oracle: ({
      id: '1',
    } as unknown) as Member,
    fundingType: {
      minAmount: new BN(10),
      maxAmount: new BN(10),
      maxPeriod: 9,
    },
    contractType: {
      whitelist: ['16'],
    },
    entries: [],
    contributors: ['1'],
    workPeriod: new BN(10),
    judgingPeriod: new BN(10),
    stage: 'expired',
    totalFunding: new BN(10),
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
    useMyMemberships.active = ({ ...rawMembers[0], id: '0' } as unknown) as Member
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

      expect(await screen.queryByText(/^cherry$/i)).toBeDefined()
    })

    it('Other', async () => {
      bounty.fundingType = {
        minAmount: new BN(1),
        maxPeriod: 1,
        maxAmount: new BN(2),
      }
      bounty.contractType = 'ContractOpen'

      renderHeader()

      expect(await getButton(/^contribute$/i)).toBeDefined()
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

      expect(await screen.queryByText(/notify me about changes$/i)).toBeDefined()
    })

    it('Closed and member in whitelist', async () => {
      bounty.contractType = {
        whitelist: ['0'],
      }

      renderHeader()

      expect(await getButton('Announce Entry')).toBeDefined()
    })

    describe('Open', () => {
      beforeEach(() => {
        bounty.contractType = 'ContractOpen'
      })

      it('No entry', async () => {
        bounty.entries = [
          {
            hasSubmitted: false,
            winner: false,
            createdById: '3',
            passed: false,
          },
        ]

        renderHeader()

        expect(await getButton('Announce Entry')).toBeDefined()
      })

      it('Entry, no works', async () => {
        bounty.entries = [
          {
            hasSubmitted: false,
            winner: false,
            createdById: '0',
            passed: false,
          },
        ]

        renderHeader()

        expect(await getButton('Submit Work')).toBeDefined()
      })

      it('Entry with works', async () => {
        bounty.entries = [
          {
            hasSubmitted: true,
            winner: false,
            createdById: '0',
            passed: false,
          },
        ]

        renderHeader()

        expect(await getButton('Submit Work')).toBeDefined()
        expect(await getButton('Withdraw')).toBeDefined()
      })
    })
  })

  describe('Judgment', () => {
    beforeAll(() => {
      bounty.stage = 'judgment'
    })

    it('As oracle', async () => {
      bounty.oracle = ({
        id: '0',
      } as unknown) as Member

      renderHeader()

      expect(await getButton('Submit Judgment')).toBeDefined()
      expect(await screen.queryByText(/^notify me about changes$/i)).toBeDefined()
    })

    it('Other', async () => {
      bounty.oracle = undefined

      renderHeader()

      expect(await screen.queryByText('Submit Judgment')).toBeNull()
      expect(await screen.queryByText(/^notify me about changes$/i)).toBeDefined()
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
          createdById: '0',
          passed: false,
        },
      ]

      renderHeader()

      expect(await getButton('Claim Reward')).toBeDefined()
    })

    it('Passed', async () => {
      bounty.entries = [
        {
          hasSubmitted: true,
          winner: false,
          createdById: '0',
          passed: true,
        },
      ]

      renderHeader()

      expect(await getButton('Withdraw Stake')).toBeDefined()
    })

    it('Contributor', async () => {
      bounty.entries = []
      bounty.contributors = ['0']

      renderHeader()

      expect(await getButton('Withdraw Stake')).toBeDefined()
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
          createdById: '0',
          passed: false,
        },
      ]

      renderHeader()

      expect(await getButton('Withdraw Stake')).toBeDefined()
    })

    it('Contributor', async () => {
      bounty.entries = []
      bounty.contributors = ['0']

      renderHeader()

      expect(await getButton('Withdraw Stake')).toBeDefined()
    })

    it('Other', async () => {
      bounty.contributors = []
      bounty.entries = []

      renderHeader()

      expect(await screen.queryByText('Withdraw Stake')).toBeNull()
    })
  })

  describe('Expired', () => {
    beforeAll(() => {
      bounty.stage = 'expired'
    })

    it('Creator', async () => {
      bounty.creator = ({
        id: '0',
      } as unknown) as Member

      renderHeader()

      expect(await getButton('Cancel Bounty')).toBeDefined()
    })

    it('Creator', async () => {
      bounty.creator = undefined

      renderHeader()

      expect(await screen.queryByText('Cancel Bounty')).toBeNull()
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
