import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ValueInJoys, TextMedium } from '../../common/components/typography'
import { Subscription } from '../../common/components/typography/Subscription'
import { BorderRad, Colors, Fonts, Overflow, Transitions } from '../../common/constants'
import { Avatar, AvatarPlaceholderImage } from '../../memberships/components/Avatar'
import { WorkingGroup } from '../types'

export interface WorkingGroupProps {
  group: WorkingGroup
}

export function WorkingGroupListItem({ group }: WorkingGroupProps) {
  const history = useHistory()

  return (
    <GroupItem>
      <GroupImageContainer onClick={() => history.push('/working-groups/grouppreview')}>
        {group.image ? <GroupImage src={group.image} /> : <GroupAvatarPlaceholderImage />}
      </GroupImageContainer>
      <GroupContentBlock>
        <GroupTitle onClick={() => history.push('/working-groups/grouppreview')}>{group.name}</GroupTitle>
        {group.about && <GroupContent>{group.about}</GroupContent>}
      </GroupContentBlock>
      <GroupStats>
        <StatsColumn>
          <StatsValue>{group.workers?.length ?? 0}</StatsValue>
          <Subscription>Workers</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            <ValueInJoys>130,000.00</ValueInJoys>
          </StatsValue>
          <Subscription>Current budget</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>1</StatsValue>
          <Subscription>Openings</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            {group.leader ? (
              <WGLeaderImage>
                <Avatar avatarUri={group.leader.avatar} />
              </WGLeaderImage>
            ) : (
              'None'
            )}
          </StatsValue>
          <Subscription>WG Leader</Subscription>
        </StatsColumn>
      </GroupStats>
    </GroupItem>
  )
}

const GroupItem = styled.section`
  display: grid;
  grid-template-columns: 108px 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
  width: 100%;
  height: 100%;
  max-height: 108px;
  align-items: center;
  padding-right: 32px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  overflow: hidden;
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    border-color: ${Colors.Blue[100]};
  }
`

const GroupAvatarPlaceholderImage = styled(AvatarPlaceholderImage)`
  display: flex;
  position: absolute;
  width: calc(100% + 16px);
  height: calc(100% + 16px);
  transform: scale(0.9);
  object-fit: cover;
  transition: ${Transitions.all};
`

const GroupImage = styled.img`
  display: flex;
  position: absolute;
  width: calc(100% + 16px);
  height: calc(100% + 16px);
  transform: scale(0.9);
  object-fit: cover;
  transition: ${Transitions.all};
`

const GroupImageContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-right: 1px solid ${Colors.Black[100]};
  overflow: hidden;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    border-color: ${Colors.Blue[100]};

    ${GroupAvatarPlaceholderImage},
    ${GroupImage} {
      transform: scale(1);
    }
  }
`

const GroupContentBlock = styled.article`
  display: grid;
  grid-template-rows: 24px 40px;
  grid-row-gap: 8px;
  width: 100%;
`

const GroupTitle = styled.h5`
  max-width: 100%;
  ${Overflow.Dots};
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover {
    color: ${Colors.Blue[500]};
  }
  &:active {
    color: ${Colors.Blue[600]};
  }
`

const GroupContent = styled(TextMedium)`
  hyphens: auto;
  height: fit-content;
  max-height: 100%;
  max-width: 100%;
  color: ${Colors.Black[500]};
  ${Overflow.DotsTwoLine};
`

const GroupStats = styled.div`
  display: grid;
  grid-template-columns: 64px 116px 64px 64px;
  justify-content: space-between;
  width: 100%;
  grid-column-gap: 8px;
`

const StatsColumn = styled.div`
  display: grid;
  grid-row-gap: 10px;
`

const StatsValue = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  align-items: center;
  width: fit-content;
  font-family: ${Fonts.Grotesk};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`

const WGLeaderImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${BorderRad.round};
  overflow: hidden;
`
