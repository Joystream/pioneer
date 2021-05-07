import React from 'react'
import styled, { css } from 'styled-components'

import { DefaultTooltip, Tooltip } from '@/common/components/Tooltip'
import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'

import { Colors, Fonts } from '../../common/constants'
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

interface MemberRoleTooltipProps {
  size?: 'l' | 'm'
  isOnDark?: boolean
}

export const MemberRoleHelp = styled(DefaultTooltip)<MemberRoleTooltipProps>`
  width: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  height: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  font-size: ${({ size }) => (size === 'l' ? '10px' : '6px')};
  line-height: 1;
  font-family: ${Fonts.Inter};
  font-weight: 700;
  ${({ isOnDark }) =>
    isOnDark
      ? css`
          color: ${Colors.Black[300]};
          background-color: ${Colors.Black[600]};
          border-color: ${Colors.Black[600]};

          &:hover,
          &:focus {
            color: ${Colors.White};
            background-color: ${Colors.Blue[500]};
            border-color: ${Colors.Blue[500]};
          }
        `
      : css`
          color: ${Colors.Black[600]};
          background-color: ${Colors.Black[100]};
          border-color: ${Colors.Black[100]};

          &:hover,
          &:focus {
            color: ${Colors.White};
            background-color: ${Colors.Blue[500]};
            border-color: ${Colors.Blue[500]};
          }
        `};
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
