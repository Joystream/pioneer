// import { render, screen } from '@testing-library/react'
// import React from 'react'

// import { BountyListItem } from '@/bounty/components/BountyListItem/BountyListItem'
// import { BountyPeriod } from '@/bounty/types/Bounty'
// import { seedMembers } from '@/mocks/data'

// import { MockApolloProvider } from '../../_mocks/providers'
// import { setupMockServer } from '../../_mocks/server'

// describe('UI: BountyListItem', () => {
//   const server = setupMockServer()
//   const props = {
//     title: 'Title',
//     creator: 'Apetor',
//     date: new Date(),
//     imageUrl: 'test/img',
//   }

//   beforeAll(() => {
//     seedMembers(server.server, 4)
//   })

//   it('Renders props', () => {
//     renderItem('funding')

//     checkTypeLayout([props.title, props.creator])
//     expect(screen.getByRole('img')).toHaveAttribute('src', props.imageUrl)
//   })

//   it('Period: Funding', async () => {
//     renderItem('funding')

//     checkTypeLayout(['FUNDING PERIOD', 'Funded', 'Maximal range', 'Minimum range', 'Cherry'])
//   })

//   it('Period: Working', async () => {
//     renderItem('working')

//     checkTypeLayout(['WORKING PERIOD', 'Bounty', 'Entries', 'Submitted work', 'Stake'])
//   })

//   it('Period: Judgment', async () => {
//     renderItem('judgement')

//     checkTypeLayout(['JUDGEMENT PERIOD', 'Entries', 'Submitted work', 'Withdrawn work'])
//   })

//   it('Period: Withdrawal', async () => {
//     renderItem('withdrawal')

//     checkTypeLayout(['WITHDRAWAL PERIOD', 'Entries', 'Unwithdrawn funds'])
//   })

//   it('Period: Expired', async () => {
//     renderItem('expired')

//     checkTypeLayout(['EXPIRED FUNDING PERIOD', 'Winners', 'Entries', 'Unwithdrawn funds'])
//     expect(screen.queryByText('DURATION')).toBeNull()
//   })

//   const checkTypeLayout = (titles: string[]) => {
//     for (const title of titles) {
//       expect(screen.queryByText(title)).toBeDefined()
//     }
//   }

//   const renderItem = (type: BountyPeriod) =>
//     render(
//       <MockApolloProvider>
//         <BountyListItem period={type} {...props} />
//       </MockApolloProvider>
//     )
// })
