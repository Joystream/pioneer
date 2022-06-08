import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CountBadge } from '@/common/components/CountBadge'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextExtraSmall, TextMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'

export const ThreadCard = () => {
  return (
    <Box>
      <div>
        <MemberInfo size="s" hideGroup onlyTop member={DevMember} />
        <div>
          <TextExtraSmall inter lighter>
            20 mins ago
          </TextExtraSmall>
          <BadgeStatus size="m">BOUNTIES</BadgeStatus>
        </div>
      </div>
      <TextBig bold value>
        Welcome and Forum Guidelines Second line of text
      </TextBig>
      <TextMedium light truncateLines={3}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna
      </TextMedium>
      <ColumnGapBlock>
        <CountBadge count={2} />
      </ColumnGapBlock>
    </Box>
  )
}

const Box = styled.div`
  display: grid;
  row-gap: 16px;
  max-width: 332px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  padding: 24px;

  > *:nth-child(3) {
    margin-top: -14px;
  }

  > *:first-child {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    > * {
      flex: 1;
    }

    > *:last-child {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 5px;
      flex: 2;
    }
  }
`

const DevMember = {
  id: '0',
  rootAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
  controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  boundAccounts: [
    '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
  ],
  boundAccountsEvents: [],
  handle: 'alice',
  metadata: {
    name: 'nesciunt ea',
    about:
      'Hic qui esse ea error eum enim recusandae nisi a. Sit consequatur expedita quo repellat rem facere itaque quia. Et maiores nobis et ut nihil. Id est soluta sunt necessitatibus tempora vitae quas labore possimus. Ullam necessitatibus corporis omnis quod dolore recusandae. Nesciunt at tempora odio ipsum ipsam consequatur velit.\n \rLaboriosam ut minima. Veritatis omnis quam quo saepe. Ut dolorum id. Sint dicta earum maiores et. Ipsum hic optio sunt magnam neque rerum ut possimus et. Adipisci sed officiis rerum inventore omnis rem rerum provident.',
  },
  isVerified: false,
  isFoundingMember: false,
  isCouncilMember: false,
  inviteCount: 5,
  avatar: 'https://raw.githubusercontent.com/Joystream/founding-members/main/avatars/primary-avatar/15.png',
  entry: {
    __typename: 'MembershipEntryPaid',
    membershipBoughtEvent: {
      inBlock: 19471,
      createdAt: '2021-12-12T11:57:16.322Z',
      network: 'OLYMPIA',
    },
  },
  createdAt: 'asd',
  roles: [
    {
      id: '1',
      groupName: 'forumWorkingGroup',
      createdAt: undefined,
      isLead: true,
    },
  ],
}
