import React from 'react'
import styled from 'styled-components'
import { Logo } from './page/Sidebar/Logo'

interface Props {
  avatarURI?: string
}

export const Avatar = ({ avatarURI }: Props) => {
  return avatarURI ? <AvatarImg src={avatarURI} /> : <Logo />
}

export const AvatarImg = styled.img`
  border-radius: 50%;
`
