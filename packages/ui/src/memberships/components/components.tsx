import styled, { css } from 'styled-components'

import { TooltipContainer } from '@/common/components/Tooltip'
import { TextInlineSmall } from '@/common/components/typography'
import { UserImage } from '@/common/components/UserImage/UserImage'

import { BorderRad, Colors, Fonts, Transitions } from '../../common/constants'

import { MemberRoleHelp, MemberRolesWrapper, MemberStatusTooltip } from './MemberRoles'
import { MemberInfoWrapProps } from './types'

export const MemberHead = styled.div`
  display: grid;
  grid-area: memberhead;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 4px;
  width: fit-content;
`

export const MemberHandle = styled.span`
  max-width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  font-family: ${Fonts.Grotesk};
  color: ${Colors.Black[900]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: ${Transitions.all};
`

export const MemberIcons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
`

export const MemberId = styled(TextInlineSmall)`
  grid-area: memberroles;
  color: ${Colors.Black[400]};
`

interface MemberPhotoProps {
  small?: boolean
  noArea?: boolean
  fixedSize?: boolean
  big?: boolean
}

export const AvatarImg = styled(UserImage)<{ isLoading?: boolean }>`
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  display: ${({ isLoading }) => isLoading && 'none'};
`

export const MemberPhoto = styled.div<MemberPhotoProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  ${({ big, small }) => {
    if (big) {
      return css`
        max-width: 80px;
        max-height: 80px;
      `
    } else if (small) {
      return css`
        max-width: 24px;
        max-height: 24px;
      `
    } else {
      return css`
        max-width: 40px;
        max-height: 40px;
      `
    }
  }}
  ${({ noArea }) =>
    !noArea &&
    css`
      grid-area: memberphoto;
    `}
  border-radius: ${BorderRad.round};
  border: 1px solid ${Colors.Black[200]};

  ${AvatarImg} {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  ${TooltipContainer} {
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
  }
`

export const MemberPhotoContainer = styled.div<MemberPhotoProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ fixedSize }) => (fixedSize ? '24px' : '100%')};
  height: ${({ fixedSize }) => (fixedSize ? '24px' : '100%')};
  border-radius: ${BorderRad.round};
  overflow: hidden;
`

export const MemberInfoWrap = styled.div<MemberInfoWrapProps>`
  display: grid;
  ${({ hideGroup, onlyTop }) =>
    onlyTop
      ? css`
          grid-template-areas: 'memberphoto memberhead';
          grid-template-rows: unset !important;
        `
      : hideGroup
      ? css`
          grid-template-areas: 'memberphoto memberhead';
          grid-template-rows: unset !important;
          grid-row-gap: unset !important;
        `
      : css`
          grid-template-areas:
            'memberphoto memberhead'
            'memberphoto memberroles';
        `}

  align-items: center;
  width: 100%;
  justify-self: start;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  z-index: 2;

  ${({ skipModal }) =>
    !skipModal &&
    css`
      cursor: pointer;
      &:hover,
      &:focus,
      &:focus-within,
      &:active {
        ${MemberHandle} {
          color: ${Colors.Blue[500]};
          cursor: pointer;
        }
        ${MemberPhoto} {
          &:after {
            opacity: 0.2;
          }
        }
      }

      ${MemberPhoto} {
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 100%;
          border-radius: ${BorderRad.round};
          background-color: ${Colors.LogoPurple};
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: ${Transitions.all};
        }

        &:hover,
        &:focus,
        &:focus-within,
        &:active {
          &:after {
            opacity: 0.2;
          }
        }
      }
    `}

  ${MemberPhoto} {
    ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return css`
            width: 80px;
            height: 80px;
          `
        case 's':
          return css`
            align-self: start;
            width: 26px;
            height: 26px;
          `
        case 'm':
        default:
          return css`
            width: 40px;
            height: 40px;
          `
      }
    }}
  }

  ${MemberRolesWrapper} {
    align-self: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return 'start'
        case 'm':
        default:
          return 'center'
      }
    }};
  }

  ${MemberHandle} {
    font-size: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return '20px'
        case 'm':
        default:
          return '14px'
      }
    }};
    align-self: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return 'end'
        case 'm':
        default:
          return 'center'
      }
    }};
  }

  ${MemberIcons} {
    align-self: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return 'end'
        case 'm':
        default:
          return 'center'
      }
    }};
    padding: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return '4px 0'
        case 'm':
        default:
          return '0'
      }
    }};
  }

  ${({ isOnDark }) => isOnDark === true && MemberOnDarkStyles}

  ${({ memberSize }) => {
    switch (memberSize) {
      case 'l':
        return MemberLargeElements
      case 's':
        return MemberSmallElements
      case 'm':
      default:
        return MemberMediumElements
    }
  }}
`

export const MemberDarkHover = css`
  ${MemberInfoWrap} {
    ${MemberHandle} {
      color: ${Colors.Black[50]};
    }
    ${MemberRoleHelp} {
      color: ${Colors.Black[200]};
      background-color: ${Colors.Black[500]};
      border-color: ${Colors.Black[500]};

      &:hover,
      &:focus {
        background-color: ${Colors.Blue[500]};
        border-color: ${Colors.Blue[500]};
        color: ${Colors.Black[300]};
      }
    }
    ${MemberStatusTooltip}.tooltipondark {
      color: ${Colors.Blue[400]};
      background-color: transparent;
      border-color: ${Colors.Blue[400]};
    }
  }
`

const MemberOnDarkStyles = css`
  ${MemberHandle} {
    color: ${Colors.Black[75]};
  }
  ${MemberRoleHelp} {
    color: ${Colors.Black[300]};
    background-color: ${Colors.Black[600]};
    border-color: ${Colors.Black[600]};

    &:hover {
      color: ${Colors.Black[300]};
      background-color: ${Colors.Blue[500]};
      border-color: ${Colors.Blue[500]};
    }
  }
`

const MemberLargeElements = css`
  grid-template-columns: 80px 1fr;
  grid-template-rows: 36px 38px;
  grid-column-gap: 12px;
  grid-row-gap: 6px;
`

const MemberMediumElements = css`
  grid-template-columns: 40px 1fr;
  grid-template-rows: 20px 16px;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
`

const MemberSmallElements = css`
  grid-template-columns: 26px 1fr;
  grid-template-rows: 20px 16px;
  grid-column-gap: 8px;
  grid-row-gap: 0;
`
