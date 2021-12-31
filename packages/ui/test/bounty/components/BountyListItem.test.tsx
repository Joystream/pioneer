import { render, screen } from '@testing-library/react'
import React from 'react'
import BN from 'bn.js'

import { BountyListItem } from '@/bounty/components/BountyListItem/BountyListItem'
import { BountyStage } from '@/bounty/types/Bounty'
import { seedMembers } from '@/mocks/data'

import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { getMember } from '../../_mocks/members'

describe('UI: BountyListItem', () => {
  const server = setupMockServer()
  const props = {
    id: '1',
    createdAt: '2021-12-31',
    title: 'Title',
    cherry: new BN(1010),
    entrantStake: new BN(10000),
    creator: getMember('alice'),
    oracle: getMember('bob'),
    fundingType: {
      minAmount: new BN(10000),
      maxAmount: new BN(12000),
      maxPeriod: new BN(2000),
    },
    workPeriod: new BN(1000),
    judgingPeriod: new BN(1000),
    totalFunding: new BN(2000),
    entries: [
      { worker: getMember('alice') },
      { worker: getMember('bob') },
      { worker: getMember('alice') },
      { worker: getMember('bob'), winner: true },
    ],
  }

  beforeAll(() => {
    seedMembers(server.server, 4)
  })

  it('Renders props', () => {
    renderItem('funding')

    checkTypeLayout([props.title, props.creator.handle])
  })

  it('Period: Funding', async () => {
    renderItem('funding')

    checkTypeLayout(['FUNDING PERIOD', 'Funded', 'Maximal range', 'Minimum range', 'Cherry'])
  })

  it('Period: Working', async () => {
    renderItem('workSubmission')

    checkTypeLayout(['WORKING PERIOD', 'Bounty', 'Entries', 'Submitted work', 'Stake'])
  })

  it('Period: Judgment', async () => {
    renderItem('judgment')

    checkTypeLayout(['JUDGEMENT PERIOD', 'Entries', 'Submitted work', 'Withdrawn work'])
  })

  it('Period: Withdrawal after success', async () => {
    renderItem('successful')

    checkTypeLayout(['WITHDRAWAL PERIOD', 'Entries', 'Unwithdrawn funds'])
  })

  it('Period: Withdrawal after failure', async () => {
    renderItem('failed')

    checkTypeLayout(['WITHDRAWAL PERIOD', 'Entries', 'Unwithdrawn funds'])
  })

  it('Period: Expired', async () => {
    renderItem('expired')

    checkTypeLayout(['EXPIRED FUNDING PERIOD', 'Winners', 'Entries', 'Unwithdrawn funds'])
    expect(screen.queryByText('DURATION')).toBeNull()
  })

  const checkTypeLayout = (titles: string[]) => {
    for (const title of titles) {
      expect(screen.queryByText(title)).toBeDefined()
    }
  }

  const renderItem = (type: BountyStage) =>
    render(
      <MockApolloProvider>
        <BountyListItem stage={type} {...props} />
      </MockApolloProvider>
    )
})
