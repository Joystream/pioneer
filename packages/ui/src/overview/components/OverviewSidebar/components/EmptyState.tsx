import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { LinkButtonPrimary } from '@/common/components/buttons/LinkButtons'
import { ArrowRightIcon } from '@/common/components/icons'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { CouncilIcon, ForumIcon, ProposalsIcon, WorkingGroupsIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { TextBig, TextExtraSmall, TextSmall } from '@/common/components/typography'
import { Colors, Shadows } from '@/common/constants'
import { ElectionRoutes } from '@/council/constants'
import { ForumRoutes } from '@/forum/constant'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

type EmptyStateType = 'application' | 'candidacies' | 'proposals' | 'forum'

const emptyStateIcon = (type: EmptyStateType): [React.ReactElement, string] => {
  switch (type) {
    case 'application':
      return [<WorkingGroupsIcon />, WorkingGroupsRoutes.openings]
    case 'candidacies':
      return [<CouncilIcon />, ElectionRoutes.currentElection]
    case 'proposals':
      return [<ProposalsIcon />, ProposalsRoutes.home]
    case 'forum':
      return [<ForumIcon />, ForumRoutes.forum]
  }
}

interface Props {
  type: EmptyStateType
}

export const EmptyState = ({ type }: Props) => {
  const { t } = useTranslation('overview')
  const [icon, url] = useMemo(() => emptyStateIcon(type), [type])

  return (
    <div>
      <TypeHeader bold lighter value>
        {t(`sidebar.emptyStates.${type}.type`)}
      </TypeHeader>
      <Wrapper gap={15}>
        <Title value>
          {icon} {t(`sidebar.emptyStates.${type}.title`)}
        </Title>
        <TextSmall inter light>
          {t(`sidebar.emptyStates.${type}.description`)}
        </TextSmall>
        <LinkButtonPrimary to={url} size="small">
          {t(`sidebar.emptyStates.${type}.buttonLabel`)} <ArrowRightIcon />
        </LinkButtonPrimary>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled(RowGapBlock)`
  min-height: fit-content;
  padding: 20px;
  background-color: ${Colors.White};
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
  margin-bottom: 16px;
  text-transform: uppercase;
`
