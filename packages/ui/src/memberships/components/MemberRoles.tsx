import React from 'react'
import styled from 'styled-components'

import { Help } from '@/common/components/Help'
import { Colors } from '@/common/constants'
import { MemberRole } from '../types'
import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'

interface MemberRolesProps {
  max?: number
  size?: 'l' | 'm'
  roles: MemberRole[]
  wrapable?: boolean
}

const defaultRole = {
  groupName: 'Member Role',
  isLeader: false,
}

export const MemberRoles = ({ size, max, wrapable, roles }: MemberRolesProps) => {
  if (!roles.length) {
    roles = [defaultRole]
  }
  const rolesToDisplay = max ? roles.slice(0, max) : roles
  const hiddenRoles = roles.length - rolesToDisplay.length

  return (
    <>
      {wrapable ? (
        <MemberRolesWrapperWrapable>
          {rolesToDisplay.map((role, index) => (
            <MemberRoleHelp
              key={index}
              memberRole={memberRoleAbbreviation(role)}
              helperText={memberRoleTitle(role)}
              size={size}
            />
          ))}
          {hiddenRoles > 0 && <MemberRoleHelpMax memberRole={`+${hiddenRoles}`} helperText={''} size={size} />}
        </MemberRolesWrapperWrapable>
      ) : (
        <MemberRolesWrapper>
          {rolesToDisplay.map((role, index) => (
            <MemberRoleHelp
              key={index}
              memberRole={memberRoleAbbreviation(role)}
              helperText={memberRoleTitle(role)}
              size={size}
            />
          ))}
          {hiddenRoles > 0 && <MemberRoleHelpMax memberRole={`+${hiddenRoles}`} helperText={''} size={size} />}
        </MemberRolesWrapper>
      )}
    </>
  )
}

export const MemberRoleHelp = styled(Help)`
  background-color: ${Colors.Black[100]};
  color: ${Colors.Black[600]};
  border-color: ${Colors.Black[100]};

  &:hover,
  &:focus {
    background-color: ${Colors.Blue[500]};
    border-color: ${Colors.Blue[500]};
    color: ${Colors.Black[25]};
  }
`

export const MemberRolesWrapperWrapable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16px, 24px));
  grid-row-gap: 4px;
  grid-column-gap: 4px;
`

const MemberRoleHelpMax = styled(MemberRoleHelp)`
  background-color: ${Colors.White};
  color: ${Colors.Blue[500]};
  border-color: ${Colors.Blue[50]};
`

export const MemberRolesWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  width: fit-content;
  grid-column-gap: 4px;
`
