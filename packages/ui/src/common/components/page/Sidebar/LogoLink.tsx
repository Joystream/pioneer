import React from 'react'
import styled from 'styled-components'

import PioneerLogo from '@/app/assets/images/PioneerLogo.png'

export function LogoLink() {
  return (
    <Link href="#">
      <img src={PioneerLogo} alt="Pioneer Logo" />
    </Link>
  )
}

const Link = styled.a`
  display: flex;
  max-height: 24px;

  img {
    object-fit: contain;
    max-width: 100px;
  }
`
