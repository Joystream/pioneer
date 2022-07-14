import React from 'react'
import styled from 'styled-components'

import { CrossIcon } from '@/common/components/icons'
import { Tooltip } from '@/common/components/Tooltip'
import { BorderRad, Fonts, Colors } from '@/common/constants'
import { memberRoleAbbreviation } from '@/memberships/helpers'

import { Avatar } from '../Avatar'
import { defaultRole, MemberRoleHelpGroup, MemberRoleHelp } from '../MemberRoles'

export const MemberReferrer = ({ member }: { member: any }) => {
  return (
    <div>
      {member.invitedBy ? (
        <AvatarWrapper width="24" height="24">
          <Tooltip forBig popupContent={<ReferrerToolttip invited={member.invitedBy} tooltipOpen={true} max={5} />}>
            <Avatar avatarUri={member.invitedBy.metadata.avatar} />
          </Tooltip>
        </AvatarWrapper>
      ) : (
        <NoReferrer>
          <CrossIcon />
        </NoReferrer>
      )}
    </div>
  )
}

const ReferrerToolttip = ({ invited, max }: any) => {
  let roles = invited.roles
  if (!invited.roles || !invited.roles.length) {
    roles = [defaultRole]
  }

  const mapRoles = new Map<string, any[]>()
  for (const role of roles) {
    const abbreviation = memberRoleAbbreviation(role)
    if (!mapRoles.has(abbreviation)) {
      mapRoles.set(abbreviation, [role])
    } else {
      const roleDef = mapRoles.get(abbreviation)
      if (roleDef) {
        mapRoles.set(abbreviation, [...roleDef, role])
      }
    }
  }
  const rolesWithCount = [...mapRoles.entries()]
  const rolesToDisplay = max ? rolesWithCount.slice(0, max) : rolesWithCount
  return (
    <div>
      <ReferrerTooltipWrapper>
        <ReferrerTooltipAvatarWrapper width="40" height="40">
          <Avatar avatarUri={invited.metadata.avatar} />
        </ReferrerTooltipAvatarWrapper>
        <ReferrerInvitedName>{invited.handle}</ReferrerInvitedName>
        <ReferrerInvitedRoles>
          {rolesToDisplay.map(([abbreviation, roles]: any, index: number) =>
            roles.length > 1 ? (
              <MemberRoleHelpGroup key={index} size="m" count={roles.length} abbreviation={abbreviation} />
            ) : (
              <MemberRoleHelp key={index} size="m">
                {abbreviation}
              </MemberRoleHelp>
            )
          )}
        </ReferrerInvitedRoles>
      </ReferrerTooltipWrapper>
    </div>
  )
}

export const NoReferrer = styled.div`
  width: 12px;
  height: 12px;
  & > svg {
    width: 12px;
    height: 12px;
  }
`

export const AvatarWrapper = styled.div<{ width?: string; height?: string }>`
  border-radius: ${BorderRad.round};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => `${width}px` ?? '24px'};
  height: ${({ height }) => `${height}px` ?? '24px'};
`

export const ReferrerTooltipWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'avatar invitedname'
    'avatar invitedroles';
  grid-row-gap: 4px;
  grid-column-gap: 8px;
`
export const ReferrerTooltipAvatarWrapper = styled(AvatarWrapper)`
  grid-area: avatar;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    object-fit: contain;
  }
`

export const ReferrerInvitedName = styled.div`
  grid-area: invitedname;
  font-family: ${Fonts.Grotesk};
  color: ${Colors.White};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`

export const ReferrerInvitedRoles = styled.div`
  grid-area: invitedroles;
  display: flex;
  gap: 4px;
`
