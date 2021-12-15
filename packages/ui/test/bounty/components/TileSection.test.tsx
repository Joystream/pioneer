import { render, screen } from '@testing-library/react'
import React from 'react'

import { TileSection } from '@/bounty/components/TileSection'

describe('TileSection', () => {
  const stage = 'Funding period'
  const labelTitle = 'Stage'
  const durationTitle = 'Period Length'
  const value = 700
  const bountyCreator = 'Bounty Creator'
  const oracle = 'Oracle'
  const cherryLabel = 'Cherry'
  const cherryValue = 1000
  const entrantLabel = 'Entrant stake'
  const entrantValue = 2000
  const member = {
    id: '0',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: true,
    isFoundingMember: true,
    isCouncilMember: true,
    roles: [],
    boundAccounts: [],
    inviteCount: 0,
    createdAt: '',
  }
  const props = {
    stage,
    labelTitle,
    durationTitle,
    value,
    bountyCreator,
    oracle,
    cherryLabel,
    cherryValue,
    entrantLabel,
    entrantValue,
    member,
  }
  beforeEach(() => {
    render(<TileSection {...props} />)
  })
  it('should render proper stage tile', () => {
    expect(screen.queryByText(stage)).toBeInTheDocument()
    expect(screen.queryByText(labelTitle)).toBeInTheDocument()
  })
  it('should render proper period length tile', () => {
    expect(screen.queryByText(durationTitle)).toBeInTheDocument()
    expect(screen.queryByDisplayValue(value)).toBeDefined()
  })
  it('should render proper bounty creator tile', () => {
    expect(screen.queryByText(bountyCreator)).toBeInTheDocument()
  })
  it('should render proper oracle tile', () => {
    expect(screen.queryByText(oracle)).toBeInTheDocument()
  })
  it('should render proper cherry tile', () => {
    expect(screen.queryByText(cherryLabel)).toBeInTheDocument()
    expect(screen.queryByDisplayValue(cherryValue)).toBeDefined()
  })
  it('should render proper entrant tile', () => {
    expect(screen.queryByText(entrantLabel)).toBeInTheDocument()
    expect(screen.queryByDisplayValue(entrantValue)).toBeDefined()
  })
  it('should render member info', () => {
    expect(screen.queryAllByRole(member)).toBeDefined()
  })
})
