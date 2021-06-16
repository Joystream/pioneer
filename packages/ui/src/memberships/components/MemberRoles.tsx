import React from 'react'
import styled, { css } from 'styled-components'

import { CountBadge, CountBadgeComponent } from '@/common/components/CountBadge'
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
  const mapRoles = new Map<string, { title: string; count: number }>()
  for (const role of roles) {
    const abbreviation = memberRoleAbbreviation(role)
    if (!mapRoles.has(abbreviation)) {
      mapRoles.set(abbreviation, { title: memberRoleTitle(role), count: 0 })
    }
    const roleDef = mapRoles.get(abbreviation)!
    mapRoles.set(abbreviation, { ...roleDef, count: roleDef.count + 1 })
  }
  const rolesWithCount = [...mapRoles.entries()]

  const rolesToDisplay = max ? rolesWithCount.slice(0, max) : rolesWithCount
  const hiddenRoles = rolesWithCount.length - rolesToDisplay.length

  return (
    <>
      {wrapable ? (
        <MemberRolesWrapperWrapable>
          {rolesToDisplay.map(([abbreviation, { count, title }], index) =>
            count > 1 ? (
              <Tooltip key={index} tooltipText={title}>
                <MemberRoleHelpGroup size={size} count={count} abbreviation={abbreviation} />
              </Tooltip>
            ) : (
              <Tooltip key={index} tooltipText={title}>
                <MemberRoleHelp size={size}>{abbreviation}</MemberRoleHelp>
              </Tooltip>
            )
          )}
          {hiddenRoles > 0 && (
            <Tooltip key="hidden" tooltipText={`And ${hiddenRoles} more ${hiddenRoles > 1 ? 'roles' : 'role'}`}>
              <MemberRoleHelpMax size={size}>{`+${hiddenRoles}`}</MemberRoleHelpMax>
            </Tooltip>
          )}
        </MemberRolesWrapperWrapable>
      ) : (
        <MemberRolesWrapper>
          {rolesToDisplay.map(([abbreviation, { count, title }], index) =>
            count > 1 ? (
              <Tooltip key={index} tooltipText={title}>
                <MemberRoleHelpGroup size={size} count={count} abbreviation={abbreviation} />
              </Tooltip>
            ) : (
              <Tooltip key={index} tooltipText={title}>
                <MemberRoleHelp size={size}>{abbreviation}</MemberRoleHelp>
              </Tooltip>
            )
          )}
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

interface MemberRoleHelpGroup {
  count?: number
  abbreviation?: string
  size?: 'l' | 'm'
}

export const MemberRoleHelpGroup = ({ size, count, abbreviation }: MemberRoleHelpGroup) => {
  return (
    <MemberRoleHelpGroupItem size={size}>
      {abbreviation}
      <CountBadge count={count ?? 0} />
    </MemberRoleHelpGroupItem>
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

export const MemberRoleHelpGroupItem = styled(MemberRoleHelp)<MemberRoleTooltipProps & DarkTooltipInnerItemProps>`
  min-width: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  width: fit-content;
  gap: 4px;
  padding: 0 4px;

  ${TooltipComponent} > & > ${CountBadgeComponent} {
    min-width: ${({ size }) => (size == 'l' ? '16px' : '10px')};
    height: ${({ size }) => (size == 'l' ? '16px' : '10px')};
    padding: ${({ size }) => (size == 'l' ? '0 4px' : '0 2px')};
    font-size: ${({ size }) => (size == 'l' ? '10px' : '6px')};
    line-height: ${({ size }) => (size == 'l' ? '16px' : '8px')};
    background-color: ${Colors.Blue[100]};
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
    &.tooltiponlight {
      color: ${Colors.Blue[500]};
      background-color: ${Colors.Black[50]};
      border-color: ${Colors.Blue[100]};
    }
    &.tooltipondark {
      color: ${Colors.Blue[400]} !important;
      background-color: transparent !important;
      border-color: ${Colors.Blue[400]} !important;
    }
  }
`

export const MemberRolesWrapper = styled.div`
  display: flex;
  gap: 4px;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  width: fit-content;
`

export const MemberRolesWrapperWrapable = styled(MemberRolesWrapper)`
  flex-wrap: wrap;
`
