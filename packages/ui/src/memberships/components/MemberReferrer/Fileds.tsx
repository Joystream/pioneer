import styled from 'styled-components'

import { BorderRad, Fonts, Colors } from '@/common/constants'

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
