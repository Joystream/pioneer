import { render, screen } from '@testing-library/react'
import React from 'react'

import { BountyListItem } from '@/bounty/components/BountyListItem/BountyListItem'
import { Bounty, BountyStage } from '@/bounty/types/Bounty'
import { seedMembers } from '@/mocks/data'

import { baseBounty, baseEntry } from '../../_mocks/bounty'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('UI: BountyListItem', () => {
  const server = setupMockServer()
  const props: Bounty = { ...baseBounty, entries: [baseEntry] }

  beforeAll(() => {
    seedMembers(server.server, 4)
  })

  it('Renders props', () => {
    renderItem('funding')

    checkTypeLayout([props.title, props.creator?.handle as string])
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
        <BountyListItem {...props} stage={type} />
      </MockApolloProvider>
    )
})
