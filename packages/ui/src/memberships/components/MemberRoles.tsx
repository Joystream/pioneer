import React from 'react'
import styled from 'styled-components'

import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'

import { MemberRoleHelp, MemberRoleHelpMax, Tooltip } from '../../common/components/Tooltip'
import { MemberRole } from '../types'

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
  if (!roles || !roles.length) {
    roles = [defaultRole]
  }
  const rolesToDisplay = max ? roles.slice(0, max) : roles
  const hiddenRoles = roles.length - rolesToDisplay.length

  return (
    <>
      {wrapable ? (
        <MemberRolesWrapperWrapable>
          {rolesToDisplay.map((role, index) => (
            <Tooltip tooltipText={memberRoleTitle(role)}>
              <MemberRoleHelp key={index} size={size}>
                {memberRoleAbbreviation(role)}
              </MemberRoleHelp>
            </Tooltip>
          ))}
          {hiddenRoles > 0 && (
            <Tooltip tooltipText={`And ${hiddenRoles} more ${hiddenRoles > 1 ? 'roles' : 'role'}`}>
              <MemberRoleHelpMax size={size}>{`+${hiddenRoles}`}</MemberRoleHelpMax>
            </Tooltip>
          )}
        </MemberRolesWrapperWrapable>
      ) : (
        <MemberRolesWrapper>
          {rolesToDisplay.map((role, index) => (
            <Tooltip tooltipText={memberRoleTitle(role)}>
              <MemberRoleHelp key={index} size={size}>
                {memberRoleAbbreviation(role)}
              </MemberRoleHelp>
            </Tooltip>
          ))}
          {hiddenRoles > 0 && (
            <Tooltip tooltipText={`And ${hiddenRoles} more ${hiddenRoles > 1 ? 'roles' : 'role'}`}>
              <MemberRoleHelpMax size={size}>{`+${hiddenRoles}`}</MemberRoleHelpMax>
            </Tooltip>
          )}
        </MemberRolesWrapper>
      )}
    </>
  )
}

export const MemberRolesWrapperWrapable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16px, 24px));
  grid-row-gap: 4px;
  grid-column-gap: 4px;
`

export const MemberRolesWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  width: fit-content;
  grid-column-gap: 4px;
`
