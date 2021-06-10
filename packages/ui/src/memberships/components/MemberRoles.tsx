import React from 'react'
import styled, { css } from 'styled-components'

import { DarkTooltipInnerItemProps, DefaultTooltip, Tooltip, TooltipComponent } from '@/common/components/Tooltip'
import { Colors, Fonts } from '@/common/constants'
import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'

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
            <Tooltip key={index} tooltipText={memberRoleTitle(role)}>
              <MemberRoleHelp size={size}>{memberRoleAbbreviation(role)}</MemberRoleHelp>
            </Tooltip>
          ))}
          {hiddenRoles > 0 && (
            <Tooltip key="hidden" tooltipText={`And ${hiddenRoles} more ${hiddenRoles > 1 ? 'roles' : 'role'}`}>
              <MemberRoleHelpMax size={size}>{`+${hiddenRoles}`}</MemberRoleHelpMax>
            </Tooltip>
          )}
        </MemberRolesWrapperWrapable>
      ) : (
        <MemberRolesWrapper>
          {rolesToDisplay.map((role, index) => (
            <Tooltip key={index} tooltipText={memberRoleTitle(role)}>
              <MemberRoleHelp size={size}>{memberRoleAbbreviation(role)}</MemberRoleHelp>
            </Tooltip>
          ))}
          {hiddenRoles > 0 && (
            <Tooltip key="hidden" tooltipText={`And ${hiddenRoles} more ${hiddenRoles > 1 ? 'roles' : 'role'}`}>
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
}

export const MemberRoleHelp = styled(DefaultTooltip)<MemberRoleTooltipProps & DarkTooltipInnerItemProps>`
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
        `
      : css`
          color: ${Colors.Black[600]};
          background-color: ${Colors.Black[100]};
          border-color: ${Colors.Black[100]};
        `};

  ${TooltipComponent}:hover > &,
  ${TooltipComponent}:focus > & {
    color: ${Colors.White} !important;
    background-color: ${Colors.Blue[500]} !important;
    border-color: ${Colors.Blue[500]} !important;
  }
`

export const MemberRoleHelpMax = styled(MemberRoleHelp)`
  background-color: ${Colors.White};
  color: ${Colors.Blue[500]};
  border-color: ${Colors.Blue[50]};
`

export const MemberStatusTooltip = styled(DefaultTooltip)<MemberRoleTooltipProps & DarkTooltipInnerItemProps>`
  ${({ size }) =>
    size === 'l'
      ? css`
          width: 24px;
          height: 24px;
        `
      : css`
          width: 16px;
          height: 16px;
        `};
  ${({ isOnDark }) =>
    isOnDark
      ? css`
          border-color: ${Colors.Blue[500]};
          color: ${Colors.Blue[500]};
          background-color: transparent;
        `
      : css`
          border-color: ${Colors.Black[200]};
          color: ${Colors.Black[900]};
        `};

  ${TooltipComponent}:hover > &,
  ${TooltipComponent}:focus > & {
    &.tooltipOnLight {
      color: ${Colors.Blue[500]};
      background-color: ${Colors.Black[50]};
      border-color: ${Colors.Blue[100]};
    }
    &.tooltipOnDark {
      color: ${Colors.Blue[400]} !important;
      background-color: transparent !important;
      border-color: ${Colors.Blue[400]} !important;
    }
  }
`

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
