import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Transitions } from '../../../app/constants'
import { AvatarImg } from '../Avatar'
import { Help } from '../Help'
import { TextSmall } from '../typography'
import { MemberInfoWrapProps } from './types'

export const MemberHandle = styled.span`
  grid-area: memberhandle;
  max-width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  font-family: ${Fonts.Grotesk};
  color: ${Colors.Black[900]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Black[700]};
  }
`

export const MemberIcons = styled.div`
  display: grid;
  grid-area: membericons;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin-left: -4px;
`

export const MemberRoles = styled.div`
  display: grid;
  grid-area: memberroles;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
`

export const MemberId = styled(TextSmall)`
  grid-area: memberroles;
  color: ${Colors.Black[400]};
`

export const MemberPhoto = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  grid-area: memberphoto;
  border-radius: ${BorderRad.round};
  overflow: hidden;
  border: 1px solid ${Colors.Black[200]};

  ${AvatarImg} {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const MemberStatusHelp = styled(Help)`
  background-color: transparent;
  color: ${Colors.Blue[500]};

  &:hover,
  &:focus {
    background-color: ${Colors.Blue[500]};
    border-color: ${Colors.Blue[500]};
    color: ${Colors.Black[25]};
  }
`

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

export const MemberInfoWrap = styled.div<MemberInfoWrapProps>`
  display: grid;

  grid-template-areas:
    'memberphoto memberhandle membericons'
    'memberphoto memberroles memberroles';
  align-items: center;
  width: 100%;
  justify-self: start;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};

  ${MemberPhoto} {
    width: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return '80px'
        case 'm':
        default:
          return '40px'
      }
    }};
    height: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return '80px'
        case 'm':
        default:
          return '40px'
      }
    }};
  }

  ${MemberRoles} {
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
    margin-left: ${({ memberSize }) => {
      switch (memberSize) {
        case 'l':
          return '-6px'
        case 'm':
        default:
          return '-4px'
      }
    }};
  }

  ${({ isOnDark }) => isOnDark === true && MemberOnDarkStyles}

  ${({ memberSize }) => {
    switch (memberSize) {
      case 'l':
        return MemberLargeElements
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
    ${MemberStatusHelp} {
      border-color: ${Colors.Blue[400]};
      color: ${Colors.Blue[400]};
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: ${Colors.Blue[500]};
        border-color: ${Colors.Blue[500]};
        color: ${Colors.Black[300]};
      }
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
  }
`

const MemberOnDarkStyles = css`
  ${MemberHandle} {
    color: ${Colors.Black[75]};
  }
  ${MemberStatusHelp} {
    color: ${Colors.Blue[500]};
    background-color: transparent;
    border-color: ${Colors.Blue[500]};

    &:hover {
      color: ${Colors.Black[300]};
      background-color: ${Colors.Blue[500]};
      border-color: ${Colors.Blue[500]};
    }
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
  grid-template-columns: 80px auto 1fr;
  grid-template-rows: 36px 38px;
  grid-column-gap: 12px;
  grid-row-gap: 6px;
`

const MemberMediumElements = css`
  grid-template-columns: 40px auto 1fr;
  grid-template-rows: 20px 16px;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
`
