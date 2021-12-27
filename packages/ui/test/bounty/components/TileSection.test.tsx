// import { render, screen } from '@testing-library/react'
// import React from 'react'
//
// import { TileSection } from '@/bounty/components/TileSection'
// import { Member } from '@/memberships/types'
// import memberMock from '@/mocks/data/raw/members.json'
//
// describe('TileSection', () => {
//   const stage = 'Funding period'
//   const labelTitle = 'Stage'
//   const durationTitle = 'Period Length'
//   const value = 700
//   const bountyCreator = 'Bounty Creator'
//   const oracle = 'Oracle'
//   const cherryLabel = 'Cherry'
//   const cherryValue = 1000
//   const endLabel = 'Entrant stake'
//   const endValue = 2000
//   const firstLabel = 'Enter label'
//   const firstValue = 2000
//   const oracleMember = memberMock[1] as unknown as Member
//   const bountyMember = memberMock[2] as unknown as Member
//   const whitelistedLabel = 'Whitelisted Label'
//   const member = memberMock as unknown as Member[]
//   const winnerMember = memberMock as unknown as Member[]
//   const props = {
//     stage,
//     labelTitle,
//     durationTitle,
//     value,
//     bountyCreator,
//     oracle,
//     cherryLabel,
//     cherryValue,
//     endLabel,
//     endValue,
//     oracleMember,
//     whitelistedLabel,
//     bountyMember,
//     member,
//     winnerMember,
//     firstLabel,
//     firstValue,
//   }
//   beforeEach(() => {
//     render(<TileSection {...props} />)
//   })
//   it('should render proper stage tile', () => {
//     expect(screen.queryByText(stage)).toBeInTheDocument()
//     expect(screen.queryByText(labelTitle)).toBeInTheDocument()
//   })
//   it('should render proper period length tile', () => {
//     expect(screen.queryByText(durationTitle)).toBeInTheDocument()
//     expect(screen.queryByDisplayValue(value)).toBeDefined()
//   })
//   it('should render proper bounty creator tile', () => {
//     expect(screen.queryByText(bountyCreator)).toBeInTheDocument()
//   })
//   it('should render proper oracle tile', () => {
//     expect(screen.queryByText(oracle)).toBeInTheDocument()
//   })
//   it('should render proper first tile', () => {
//     expect(screen.queryByText(firstLabel)).toBeDefined()
//     expect(screen.queryByDisplayValue(firstValue)).toBeDefined()
//   })
//   it('should render proper cherry tile', () => {
//     expect(screen.queryByText(cherryLabel)).toBeInTheDocument()
//     expect(screen.queryByDisplayValue(cherryValue)).toBeDefined()
//   })
//   it('should render proper entrant tile', () => {
//     expect(screen.queryByText(endLabel)).toBeInTheDocument()
//     expect(screen.queryByDisplayValue(endValue)).toBeDefined()
//   })
//   it('should render member info', () => {
//     expect(screen.queryAllByRole(member)).toBeDefined()
//   })
// })
