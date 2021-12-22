import { render, screen } from '@testing-library/react'
import React from 'react'
import BN from 'bn.js'

import { Periods } from '@/bounty/components/BountySidebar/Periods'

describe('Periods', () => {
  const fundingPeriodLength = new BN(1000)
  const workPeriodLength = new BN(2000)
  const judgingPeriodLength = new BN(13000)
  const props = {
    fundingPeriodLength,
    workPeriodLength,
    judgingPeriodLength,
  }
  
  it('should display proper periods length', () => {
    const stage = 'funding'
    render(<Periods {...props} stage={stage} />)
    // funding (1000 blocks):
    expect(screen.queryByText('1h:40min')).toBeDefined()
    // working (2000 blocks):
    expect(screen.queryByText('3h:20min')).toBeDefined()
    // judgement (13000 blocks):
    expect(screen.queryByText('21h:40min')).toBeDefined()
  })

  it('should display funding period as active', () => {
    const stage = 'funding'
    render(<Periods {...props} stage={stage} />)
    expect(screen.queryByTestId('Funding Period-active')).toBeDefined()
  })
  it('should display working period as active', () => {
    const stage = 'working'
    render(<Periods {...props} stage={stage} />)
    expect(screen.queryByTestId('Working Period-active')).toBeDefined()
  })
  it('should display judgement period as active', () => {
    const stage = 'judgement'
    render(<Periods {...props} stage={stage} />)
    expect(screen.queryByTestId('Judgement Period-active')).toBeDefined()
  })
})
