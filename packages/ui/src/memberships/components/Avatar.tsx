import React from 'react'
import styled from 'styled-components'

import { Tooltip } from '@/common/components/Tooltip'

import { AvatarPlaceholder } from '../assets/images/AvatarPlaceholder'
import { Member } from '../types'

import { MemberPhoto, MemberPhotoContainer } from './components'
import { MemberInfo } from './MemberInfo'

interface AvatarProps {
  avatarUri?: string | null
  className?: string
}
interface MemberAvatarProps extends AvatarProps {
  small?: boolean
  noArea?: boolean
}

export interface MemberInfoAvatarProps extends MemberAvatarProps {
  member: Member
  isLead?: boolean
}

export const Avatar = React.memo(({ avatarUri, className }: AvatarProps) => {
  return avatarUri ? <AvatarImg src={avatarUri} className={className} /> : <AvatarPlaceholderImage />
})

export const MemberAvatar = React.memo(({ avatarUri, className, small, noArea }: MemberAvatarProps) => {
  return (
    <MemberPhoto small={small} noArea={noArea}>
      <MemberPhotoContainer>
        <Avatar avatarUri={avatarUri} className={className} />
      </MemberPhotoContainer>
    </MemberPhoto>
  )
})

export const MemberInfoAvatar = React.memo(
  ({ avatarUri, className, small, noArea, member, isLead }: MemberInfoAvatarProps) => {
    return (
      <Tooltip forBig popupContent={<MemberInfo member={member} isOnDark isLead={isLead} />}>
        <MemberPhoto small={small} noArea={noArea}>
          <MemberPhotoContainer>
            <Avatar avatarUri={avatarUri} className={className} />
          </MemberPhotoContainer>
        </MemberPhoto>
      </Tooltip>
    )
  }
)

export const AvatarImg = styled.img`
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
`

export const AvatarPlaceholderImage = styled(AvatarPlaceholder)`
  width: 100%;
  height: 100%;
`
