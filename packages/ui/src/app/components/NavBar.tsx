import React from 'react'
import styled from 'styled-components'

import { MenuIcon } from '@/common/components/icons/MenuIcon'
import { Colors } from '@/common/constants'

export const NavBar = () => {
  return (
    <Wrapper>
      <Link href="#">
        <img src="./favicon.svg" width={32} height={32} alt="Pioneer Logo" />
      </Link>
      <MenuIconWrapper>
        <MenuIcon />
      </MenuIconWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: navbar;
  display: flex;
  width: 100%;
  max-width: 100vw;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
`

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  color: ${Colors.Black[900]};
  cursor: pointer;
  &:hover {
    background-color: ${Colors.Black[200]};
  }
`
