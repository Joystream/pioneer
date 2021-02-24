import React from 'react'
import styled from 'styled-components'
import { BorderRad } from '../constants'
import { AvatarPlaceholder } from '../assets/images/Members/AvatarPlaceholder'

interface Props {
  avatarURI?: string | null
}

export const Avatar = ({ avatarURI }: Props) => {
  return avatarURI ? <AvatarImg src={avatarURI} /> : <AvatarPlaceholder />
}

export const AvatarImg = styled.img`
  border-radius: ${BorderRad.round};
  overflow: hidden;
`
