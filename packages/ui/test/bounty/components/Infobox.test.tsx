import { render, screen } from '@testing-library/react'
import React from 'react'

import { Infobox } from '@/bounty/components/BountyActorsList/Infobox'

describe('Infobox', () => {
  it('should display proper info for winner', () => {
    const result = 'winner'
    render(<Infobox result={result} />)
    expect(screen.queryByText('You are a winner')).toBeDefined()
  })
  it('should display proper info for loser', () => {
    const result = 'loser'
    render(<Infobox result={result} />)
    expect(screen.queryByText('You can withdrawn stake')).toBeDefined()
  })
  it('should display proper info for slashed', () => {
    const result = 'slashed'
    render(<Infobox result={result} />)
    expect(screen.queryByText('You are slashed')).toBeDefined()
  })
})
