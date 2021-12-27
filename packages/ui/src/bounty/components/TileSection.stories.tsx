// import { Meta, Story } from '@storybook/react'
// import React from 'react'
// import { MemoryRouter } from 'react-router'
//
// import { TileSection, TileSectionProps } from '@/bounty/components/TileSection'
// import { Member } from '@/memberships/types'
// import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
// import memberMock from '@/mocks/data/raw/members.json'
//
// export default {
//   title: 'Bounty/TileSection',
//   component: TileSection,
// } as Meta
//
// const Template: Story<TileSectionProps> = (args) => (
//   <MemoryRouter>
//     <MockApolloProvider>
//       <TileSection {...args} />
//     </MockApolloProvider>
//   </MemoryRouter>
// )
//
// export const FundingPeriod = Template.bind({})
// FundingPeriod.args = {
//   stage: 'Funding period',
//   labelTitle: 'Stage',
//   tooltipText: 'Tooltip text for bounty tile section',
//   durationTitle: 'Period Length',
//   value: 700,
//   bountyCreator: 'Bounty Creator',
//   oracle: 'Oracle',
//   cherryLabel: 'Cherry',
//   cherryTooltipText: 'cherry tooltip',
//   cherryValue: 1000,
//   endLabel: 'Entrant stake',
//   endTooltipText: 'entrant tooltip',
//   endValue: 2000,
//   oracleMember: memberMock[1] as unknown as Member,
//   bountyMember: memberMock[2] as unknown as Member,
//   isProgressBarVisible: true,
// }
//
// export const WorkingPeriod = Template.bind({})
// WorkingPeriod.args = {
//   ...FundingPeriod.args,
//   stage: 'Working period',
//   labelTitle: 'Stage',
//   tooltipText: 'Tooltip text for bounty tile section',
//   firstTileLabel: 'Funded',
//   firstTooltipText: 'Funded tooltip text',
//   firstValue: 15000,
//   isProgressBarVisible: false,
//   endLabel: 'Work submitted',
//   endTooltipText: 'work tooltip',
//   endValue: 10,
// }
//
// export const WithdrawalPeriod = Template.bind({})
// WithdrawalPeriod.args = {
//   ...FundingPeriod.args,
//   firstTileLabel: 'Withdrawn funds',
//   firstTooltipText: 'Withdrawn tooltip text',
//   firstValue: 15000,
//   winnersAvailable: true,
//   winnerMember: memberMock as unknown as Member[],
//   isProgressBarVisible: false,
// }
//
// export const FundingLimitedClosed = Template.bind({})
// FundingLimitedClosed.args = {
//   ...FundingPeriod.args,
//   whitelistedLabel: 'Whitelisted Label',
//   member: memberMock as unknown as Member[],
//   isProgressBarVisible: true,
// }
