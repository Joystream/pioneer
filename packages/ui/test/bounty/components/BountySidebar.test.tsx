import { act, fireEvent, getByTestId, render, screen } from '@testing-library/react'
import React from 'react'
import BN from 'bn.js'

import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { Member } from '@/memberships/types'
import memberMock from '@/mocks/data/raw/members.json'

describe('UI: Bounty Sidebar', () => {
  const periodsLengths = {
    workPeriodLength: new BN(200),
    judgingPeriodLength: new BN(350),
  }
  const contributors = [
    // Alice
    { actor: memberMock[0] as unknown as Member, amount: new BN(1000) },
  ]
  const entrants = [
    // Bob
    { actor: memberMock[1] as unknown as Member, count: 2 },
  ]
  const withdrawns = [
    // Charlie
    { actor: memberMock[2] as unknown as Member },
  ]
  const fundingProps = { contributors, periodsLengths }
  const props = {...fundingProps, entrants, withdrawns}
  
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
      render(<BountySidebar {...props} entrants={entrants} withdrawns={withdrawns} stage={stage} />)
    })

    it('displays Entrants list', () => {
      expect(screen.queryByText('bob')).not.toBeNull()
    })

    it('displays Withdrawn list', () => {
      expect(screen.queryByText('charlie')).not.toBeNull()
    })

    it('displays Contributors list only after expanding', async () => {
      expect(screen.queryByText('alice')).toBeNull()
      fireEvent.click(await screen.getByTestId('CONTRIBUTORS-EXPAND'))
      expect(screen.queryByText('alice')).not.toBeNull()
    })
  })

  describe('in Judgement period', () => {
    const stage = 'judgement'
    beforeEach(() => {
      render(<BountySidebar {...props} entrants={entrants} withdrawns={withdrawns} stage={stage} />)
    })

    it('displays Entrants list', () => {
      expect(screen.queryByText('bob')).not.toBeNull()
    })

    it('displays Withdrawn list', () => {
      expect(screen.queryByText('charlie')).not.toBeNull()
    })

    it('displays Contributors list only after expanding', async () => {
      expect(screen.queryByText('alice')).toBeNull()
      fireEvent.click(await screen.getByTestId('CONTRIBUTORS-EXPAND'))
      expect(screen.queryByText('alice')).not.toBeNull()
    })
  })

})
