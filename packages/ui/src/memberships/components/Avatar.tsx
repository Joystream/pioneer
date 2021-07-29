import React from 'react'
import styled from 'styled-components'

import { AvatarPlaceholder } from '../assets/images/AvatarPlaceholder'

import { MemberPhoto, MemberPhotoContainer } from './components'

interface Props {
  avatarUri?: string | null
  className?: any
}

export const Avatar = React.memo(({ avatarUri, className }: Props) => {
  return avatarUri ? <AvatarImg src={avatarUri} className={className} /> : <AvatarPlaceholderImage />
})

export const MemberAvatar = React.memo((props: Props) => (
  <MemberPhoto>
    <MemberPhotoContainer>
      <Avatar {...props} />
    </MemberPhotoContainer>
  </MemberPhoto>
))

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
