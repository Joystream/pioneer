import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { WithdrawInfo, WithdrawInfoProps } from '@/bounty/components/WithdrawInfo/WithdrawInfo'
import { formatTokenValue } from '@/common/model/formatters'

describe('UI: WithdrawInfo', () => {
  const account = { name: 'Alice Account', address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' }
  const amount = new BN(1000)
  const amountTitle = 'amount-title'
  const stakingFromTitle = 'staking-from-title'
  const props: WithdrawInfoProps = {
    account,
    amountTitle,
    rows: [{ amount, stakingFromTitle }],
  }

  beforeEach(() => {
    render(<WithdrawInfo {...props} />)
  })

  it('Renders', () => {
    expect(screen.getByTestId('withdraw-info')).toBeInTheDocument()
  })

  it('Display account name', () => {
    expect(screen.getByText(account.name)).toBeInTheDocument()
  })

  it('Displays staking-from title', () => {
    expect(screen.getByText(stakingFromTitle)).toBeInTheDocument()
  })

  it('Displays amount title', () => {
    expect(screen.getByText(amountTitle)).toBeInTheDocument()
  })

  it('Displays amount value', () => {
    expect(screen.getByText(formatTokenValue(amount))).toBeInTheDocument()
  })
})
