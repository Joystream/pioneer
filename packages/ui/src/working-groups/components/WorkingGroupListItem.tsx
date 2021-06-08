import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonBareGhost } from '../../common/components/buttons'
import { Arrow } from '../../common/components/icons'
import { TextMedium, ValueInJoys } from '../../common/components/typography'
import { Subscription } from '../../common/components/typography/Subscription'
import { BorderRad, Colors, Fonts, Overflow, Transitions } from '../../common/constants'
import { Avatar } from '../../memberships/components/Avatar'
import { useMember } from '../../memberships/hooks/useMembership'
import { WorkingGroup } from '../types'

import { WorkingGroupImage, WorkingGroupImageTag } from './WorkingGroupImage'

export interface WorkingGroupProps {
  group: WorkingGroup
}

export function WorkingGroupListItem({ group }: WorkingGroupProps) {
  const history = useHistory()

  const { member: leader } = useMember(group.leaderId)
  const groupAddress = `/working-groups/${group.name.toLowerCase()}`

  return (
    <GroupItem>
      <GroupImageContainer onClick={() => history.push(groupAddress)}>
        <WorkingGroupImage groupName={group.name} />
      </GroupImageContainer>
      <GroupContentBlock>
        <GroupTitle onClick={() => history.push(groupAddress)}>{group.name}</GroupTitle>
        {group.about && <GroupContent>{group.about}</GroupContent>}
      </GroupContentBlock>
      <GroupStats>
        <StatsColumn>
          <StatsValue>{group.workers?.length ?? 0}</StatsValue>
          <Subscription>Workers</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            <ValueInJoys>{group?.budget?.toString()}</ValueInJoys>
          </StatsValue>
          <Subscription>Current budget</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>1</StatsValue>
          <Subscription>Openings</Subscription>
        </StatsColumn>
        <StatsColumn>
          <StatsValue>
            {leader ? (
              <WGLeaderImage>
                <Avatar avatarUri={leader.avatar} />
              </WGLeaderImage>
            ) : (
              'None'
            )}
          </StatsValue>
          <Subscription>WG Leader</Subscription>
        </StatsColumn>
      </GroupStats>
      <ButtonBareGhost square size="medium" onClick={() => history.push(groupAddress)}>
        <Arrow direction="right" />
      </ButtonBareGhost>
    </GroupItem>
  )
}

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
`

const GroupContentBlock = styled.article`
  display: grid;
  grid-template-rows: 24px 40px;
  grid-row-gap: 8px;
  width: 100%;
`

const GroupTitle = styled.h5`
  text-transform: capitalize;
  ${Overflow.FullDots};
  transition: ${Transitions.all};
  cursor: pointer;

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

const GroupItem = styled.section`
  display: grid;
  grid-template-columns: 108px 1fr 1fr 40px;
  grid-template-rows: 1fr;
  grid-column-gap: 24px;
  width: 100%;
  height: 100%;
  max-height: 108px;
  align-items: center;
  padding-right: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  overflow: hidden;
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    border-color: ${Colors.Blue[100]};

    ${GroupImageContainer} {
      border-color: ${Colors.Blue[100]};

      ${WorkingGroupImageTag} {
        transform: scale(1);
      }
    }
    ${GroupTitle} {
      color: ${Colors.Blue[500]};
    }
  }
`
