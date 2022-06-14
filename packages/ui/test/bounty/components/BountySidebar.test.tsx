import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { Contributor, Entrant, Withdrawn } from '@/bounty/types/Bounty'
import { Member } from '@/memberships/types'
import memberMock from '@/mocks/data/raw/members.json'

describe('UI: Bounty Sidebar', () => {
  const periodsLengths = {
    workPeriodLength: 200,
    judgingPeriodLength: 350,
  }
  const contributors: Contributor[] = [
    // Alice
    { actor: memberMock[0] as unknown as Member, amount: new BN(1000), hasWithdrawn: false },
  ]
  const entrants: Entrant[] = [
    // Bob
    { actor: memberMock[1] as unknown as Member, count: 2 },
  ]
  const withdrawns: Withdrawn[] = [
    // Charlie
    { actor: memberMock[2] as unknown as Member },
  ]
  const fundingProps = { contributors, periodsLengths }
  const props = { ...fundingProps, entrants, withdrawns }

  describe('in Funding period', () => {
    const stage = 'funding'
    it('displays Contributors list', () => {
      render(<BountySidebar {...fundingProps} stage={stage} />)
      expect(screen.queryByText('alice')).not.toBeNull()
    })
  })

  describe('in Working period', () => {
    const stage = 'working'
    beforeEach(() => {
      render(<BountySidebar {...props} entrants={entrants} withdrawals={withdrawns} stage={stage} />)
    })

    it('displays Entrants list', () => {
      expect(screen.queryByText('bob')).not.toBeNull()
    })

    it('displays Withdrawn list', () => {
      expect(screen.queryByText('charlie')).not.toBeNull()
    })

    it('displays Contributors list only after expanding', async () => {
      expect(screen.queryByText('alice')).toBeNull()
      fireEvent.click(await screen.getByTestId('sidebar.contributors-EXPAND'))
      expect(screen.queryByText('alice')).not.toBeNull()
    })
  })

  describe('in Judgement period', () => {
    const stage = 'judgement'
    beforeEach(() => {
      render(<BountySidebar {...props} entrants={entrants} withdrawals={withdrawns} stage={stage} />)
    })

    it('displays Entrants list', () => {
      expect(screen.queryByText('bob')).not.toBeNull()
    })

    it('displays Withdrawn list', () => {
      expect(screen.queryByText('charlie')).not.toBeNull()
    })

    it('displays Contributors list only after expanding', async () => {
      expect(screen.queryByText('alice')).toBeNull()
      fireEvent.click(await screen.getByTestId('sidebar.contributors-EXPAND'))
      expect(screen.queryByText('alice')).not.toBeNull()
    })
  })
})
