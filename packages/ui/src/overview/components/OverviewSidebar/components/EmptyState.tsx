import React, { useMemo } from 'react'
import styled from 'styled-components'

import { LinkButtonPrimary } from '@/common/components/buttons/LinkButtons'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { CouncilIcon, ForumIcon, ProposalsIcon, WorkingGroupsIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { TextBig, TextExtraSmall, TextSmall } from '@/common/components/typography'
import { Colors, Shadows } from '@/common/constants'
import { ElectionRoutes } from '@/council/constants'
import { ForumRoutes } from '@/forum/constant'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

type EmptyStateType = 'application' | 'candidacies' | 'proposals' | 'forum'

const emptyStateIcon = (type: EmptyStateType): [React.ReactElement, string, string, string, string] => {
  switch (type) {
    case 'application':
      return [
        <WorkingGroupsIcon />,
        WorkingGroupsRoutes.openings,
        'Go to Working Groups',
        'Working Groups',
        'Join a working group and become an active member lorem ipsum dolor \n' +
          'adipiscing elit neque massa, dignissim a finibus a, egestas ',
      ]
    case 'candidacies':
      return [
        <CouncilIcon />,
        ElectionRoutes.currentElection,
        'Go to Council',
        'Governance',
        'Nominate yourself or vote for a candidates lorem ipsum dolor sit amet,\n' +
          'adipiscing elit neque massa, dignissim a finibus a, egestas ',
      ]
    case 'proposals':
      return [
        <ProposalsIcon />,
        ProposalsRoutes.home,
        'Go to Proposals',
        'Share your ideas',
        'Sumbit or vote a proposals to have an impact on the future of \n' + 'the platform',
      ]
    case 'forum':
      return [
        <ForumIcon />,
        ForumRoutes.forum,
        'Go to Forum',
        'Be part of our community',
        'A forum is a place where lorem ipsum dolor sit amet, consectetur \n' +
          'adipiscing elit neque massa, dignissim a finibus a, egestas',
      ]
  }
}

interface Props {
  type: EmptyStateType
}

export const EmptyState = ({ type }: Props) => {
  const [icon, url, buttonText, title, description] = useMemo(() => emptyStateIcon(type), [type])

  return (
    <>
      <TypeHeader>{type}</TypeHeader>
      <Wrapper gap={15}>
        <Title value>
          {icon} {title}
        </Title>
        <TextSmall inter light>
          {description}
        </TextSmall>
        <LinkButtonPrimary to={url} size="small">
          {buttonText}
        </LinkButtonPrimary>
      </Wrapper>
    </>
  )
}

const Wrapper = styled(RowGapBlock)`
  min-height: fit-content;
  width: 99%;
  padding: 20px;
  box-shadow: ${Shadows.light};
  border-radius: 4px;
`

const Title = styled(TextBig)`
  display: flex;
  align-items: center;

  > *:first-child {
    margin-right: 5px;
  }
`
const TypeHeader = styled(TextExtraSmall)`
  text-transform: uppercase;
  color: ${Colors.Black[500]};
`
