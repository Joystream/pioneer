import React from 'react'
import styled from 'styled-components'
import { Logo } from './Logo'

export function LogoLink() {
  return (
    <Link href="#">
      <Logo />
    </Link>
  )
}

const Link = styled.a`
  display: flex;
  max-height: 24px;
`
