import React from 'react'
import styled, { css } from 'styled-components'

import { CountBadge, CountBadgeComponent } from '@/common/components/CountBadge'
import { FacebookIcon, TwitterIcon, YoutubeIcon, TelegramIcon, LinkedinIcon } from '@/common/components/icons/socials'
import { LinkSymbol } from '@/common/components/icons/symbols'
import {
  DarkTooltipInnerItemProps,
  DefaultTooltip,
  Tooltip,
  TooltipComponent,
  TooltipLink,
  TooltipPopupTitle,
  TooltipText,
} from '@/common/components/Tooltip'
import { Colors, Fonts } from '@/common/constants'
import { nameMapping } from '@/common/helpers'
import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'
import { groupNameToURLParam } from '@/working-groups/model/workingGroupName'

import { MemberRole } from '../types'

export interface MemberRolesProps {
  max?: number
  size?: 'l' | 'm'
  roles: MemberRole[]
  wrapable?: boolean
  memberDetails?: any
  isOnDark?: boolean
}

export const rolesToMap = (roles: MemberRole[]): Map<string, MemberRole[]> => {
  const mapRoles = new Map<string, MemberRole[]>()
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

  return mapRoles
}

export const MemberRoles = ({ size, max, wrapable, roles, isOnDark, memberDetails }: MemberRolesProps) => {
  if (!roles || !roles.length) {
    roles = []
  }
  const activeRoles = roles.filter((role) => role.isActive)
  const mapRoles = rolesToMap(activeRoles)
  const rolesWithCount = [...mapRoles.entries()]

  const rolesToDisplay = max ? rolesWithCount.slice(0, max) : rolesWithCount
  const hiddenRoles = rolesWithCount.length - rolesToDisplay.length

  return (
    <>
      {wrapable ? (
        <MemberRolesWrapperWrapable>
          {rolesToDisplay.map(([abbreviation, roles], index) =>
            roles.length > 1 ? (
              <Tooltip key={index} popupContent={<MemberRolePopupContent roles={roles} />} forBig={size === 'l'}>
                <MemberRoleHelpGroup size={size} count={roles.length} abbreviation={abbreviation} />
              </Tooltip>
            ) : (
              <Tooltip key={index} popupContent={<MemberRolePopupContent roles={roles} />} forBig={size === 'l'}>
                <MemberRoleHelp size={size}>{abbreviation}</MemberRoleHelp>
              </Tooltip>
            )
          )}
          {hiddenRoles > 0 && (
            <Tooltip
              key="hidden"
              tooltipText={`And ${hiddenRoles} more ${hiddenRoles > 1 ? 'roles' : 'role'}`}
              forBig={size === 'l'}
            >
              <MemberRoleHelpMax size={size}>{`+${hiddenRoles}`}</MemberRoleHelpMax>
            </Tooltip>
          )}
        </MemberRolesWrapperWrapable>
      ) : (
        <MemberRolesWrapper>
          {rolesToDisplay.map(([abbreviation, roles], index) =>
            roles.length > 1 ? (
              <Tooltip key={index} popupContent={<MemberRolePopupContent roles={roles} />} forBig={size === 'l'}>
                <MemberRoleHelpGroup size={size} count={roles.length} abbreviation={abbreviation} />
              </Tooltip>
            ) : (
              <Tooltip key={index} popupContent={<MemberRolePopupContent roles={roles} />} forBig={size === 'l'}>
                <MemberRoleHelp size={size}>{abbreviation}</MemberRoleHelp>
              </Tooltip>
            )
          )}
          {memberDetails?.externalResources &&
            memberDetails?.externalResources.map((item: any, key: number) => {
              switch (item.source) {
                case 'TELEGRAM':
                  return (
                    <Tooltip key={key} tooltipText={`${item.source}: ${item.value}`}>
                      <SocialLink isOnDark={isOnDark}>
                        <TelegramIcon />
                        {item.key}
                      </SocialLink>
                    </Tooltip>
                  )

                case 'TWITTER':
                  return (
                    <Tooltip key={key} tooltipText={`${item.source}: ${item.value}`}>
                      <SocialLink isOnDark={isOnDark}>
                        <TwitterIcon />
                      </SocialLink>
                    </Tooltip>
                  )
                case 'LINKEDIN':
                  return (
                    <Tooltip key={key} tooltipText={`${item.source}: ${item.value}`}>
                      <SocialLink isOnDark={isOnDark}>
                        <LinkedinIcon />
                      </SocialLink>
                    </Tooltip>
                  )
                case 'YOUTUBE':
                  return (
                    <Tooltip key={key} tooltipText={`${item.source}: ${item.value}`}>
                      <SocialLink isOnDark={isOnDark}>
                        <YoutubeIcon />
                      </SocialLink>
                    </Tooltip>
                  )
                case 'FACEBOOK':
                  return (
                    <Tooltip key={key} tooltipText={`${item.source}: ${item.value}`}>
                      <SocialLink isOnDark={isOnDark}>
                        <FacebookIcon />
                      </SocialLink>
                    </Tooltip>
                  )
                default:
                  break
              }
            })}
          {hiddenRoles > 0 && (
            <Tooltip
              key="hidden"
              tooltipText={`And ${hiddenRoles} more ${hiddenRoles > 1 ? 'roles' : 'role'}`}
              forBig={size === 'l'}
            >
              <MemberRoleHelpMax size={size}>{`+${hiddenRoles}`}</MemberRoleHelpMax>
            </Tooltip>
          )}
        </MemberRolesWrapper>
      )}
    </>
  )
}

export interface MemberRolePopupContentProps {
  roles: MemberRole[]
}

export const MemberRolePopupContent = ({ roles }: MemberRolePopupContentProps) => {
  const groupAddress = `/working-groups/${groupNameToURLParam(roles[0].groupName)}`

  return (
    <>
      {roles.map((role, index) => (
        <PopupRoleItem key={index}>
          <PopupRoleTitle>
            {memberRoleTitle(role)} {roles.length > 1 ? index + 1 : ''}
          </PopupRoleTitle>
          {role.createdAt && (
            <TooltipText>Member since: {new Date(role.createdAt).toLocaleDateString('en-GB')}</TooltipText>
          )}
        </PopupRoleItem>
      ))}
      <PopupGroupLink to={groupAddress} target="_blank">
        {nameMapping(roles[0].groupName)} Group
        <LinkSymbol />
      </PopupGroupLink>
    </>
  )
}

export interface MemberRoleHelpGroup {
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

export const SocialLink = styled(DefaultTooltip)<MemberRoleTooltipProps & DarkTooltipInnerItemProps>`
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
  width: fit-content;
  min-width: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  height: ${({ size }) => (size === 'l' ? '24px' : '16px')};
  gap: 4px;
  padding: 0 4px;
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

  ${CountBadgeComponent} {
    min-width: ${({ size }) => {
      switch (size) {
        case 'l':
          return '16px'
        case 'm':
        default:
          return '10px'
      }
    }};
    height: ${({ size }) => {
      switch (size) {
        case 'l':
          return '16px'
        case 'm':
        default:
          return '10px'
      }
    }};
    padding: ${({ size }) => {
      switch (size) {
        case 'l':
          return '0px 4px'
        case 'm':
        default:
          return '0px 2px'
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'l':
          return '10px'
        case 'm':
        default:
          return '6px'
      }
    }};
    line-height: ${({ size }) => {
      switch (size) {
        case 'l':
          return '16px'
        case 'm':
        default:
          return '8px'
      }
    }};
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
`

export const MemberRolesWrapperWrapable = styled(MemberRolesWrapper)`
  flex-wrap: wrap;
`

const PopupRoleItem = styled.div`
  margin-bottom: 12px;
`

const PopupRoleTitle = styled(TooltipPopupTitle)`
  margin-bottom: 3px;
`

const PopupGroupLink = styled(TooltipLink)`
  margin-bottom: 3px;
`
