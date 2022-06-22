import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { CurrencyName } from '@/app/constants/currency'
import { BountyActorsList } from '@/bounty/components/BountyActorsList/BountyActorsList'

import { getMember } from '../../_mocks/members'

describe('BountyActorsList', () => {
  it('should display proper title and amount for contributors', () => {
    const title = 'CONTRIBUTORS'
    const contributorsList = [{ actor: getMember('alice'), amount: new BN(1000) }]
    render(<BountyActorsList title={title} elements={contributorsList} />)
    expect(screen.queryByText('CONTRIBUTORS')).toBeDefined()
    expect(screen.queryByText(`1,000 ${CurrencyName.integerValue}`)).toBeDefined()
  })
  it('should display proper title and count for entrants', () => {
    const title = 'ENTRANTS'
    const entrantsList = [{ actor: getMember('alice'), count: 3 }]
    render(<BountyActorsList title={title} elements={entrantsList} />)
    expect(screen.queryByText('ENTRANTS')).toBeDefined()
    expect(screen.queryByText('3')).toBeDefined()
  })
  it('should display proper title and label for withdrawn', () => {
    const title = 'WITHDRAWN'
    const withdrawnList = [{ actor: getMember('alice') }]
    render(<BountyActorsList title={title} elements={withdrawnList} />)
    expect(screen.queryByText('WITHDRAWN')).toBeDefined()
    expect(screen.queryByText('alice')).toBeDefined()
  })
})
