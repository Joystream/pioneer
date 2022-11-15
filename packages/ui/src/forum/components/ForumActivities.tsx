import React from 'react'
import styled from 'styled-components'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { CrossIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { SidePane, SidePaneBody, SidePaneGlass } from '@/common/components/SidePane'
import { TextBig } from '@/common/components/typography'
import { useForumActivities } from '@/forum/hooks/useForumActivities'
import { EmptyBody } from '@/proposals/modals/VoteRationale/VoteRationale'

interface ForumActivitiesProps {
  onClose: () => void
}

export const ForumActivities = ({ onClose }: ForumActivitiesProps) => {
  const { activities, isLoading } = useForumActivities()

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <ActivitiesSidePane>
        {isLoading ? (
          <EmptyBody>
            <Loading />
          </EmptyBody>
        ) : (
          <>
            <div>
              <TextBig value bold>
                Forum Activities
              </TextBig>
              <CrossIcon onClick={onClose} />
            </div>
            <ActivitiesBlock activities={activities} />
          </>
        )}
      </ActivitiesSidePane>
    </SidePaneGlass>
  )
}

const ActivitiesSidePane = styled(SidePane)`
  grid-template-rows: auto 1fr;
  overflow-y: auto;
  ${SidePaneBody} {
    padding: 24px;
  }

  > *:first-child {
    padding: 20px 16px;
    display: flex;
    justify-content: space-between;
    svg {
      color: gray;
      cursor: pointer;
    }
  }
`
