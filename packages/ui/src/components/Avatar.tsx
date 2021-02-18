import React from 'react'
import styled from 'styled-components'
import { MyProfileIcon } from './page/Sidebar/LinksIcons/MyProfileIcon'

interface Props {
  avatarURI?: string
}

export const Avatar = ({ avatarURI }: Props) => {
  return avatarURI ? <AvatarImg src={avatarURI} /> : <MyProfileIcon />
}

export const AvatarImg = styled.img`
  border-radius: 50%;
`
