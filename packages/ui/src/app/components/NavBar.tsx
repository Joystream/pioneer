import React from 'react'
import styled from 'styled-components'

import { MenuIcon } from '@/common/components/icons'
import { Colors, ZIndex } from '@/common/constants'
import { useResponsive } from '@/common/hooks/useResponsive'

import { SideBarSlider } from './SideBarSlider'

export const NavBar = () => {
  const { openNavSidebar, setOpenNavSidebar } = useResponsive()

  return (
    <>
      <Wrapper>
        <Link href="#">
          <img src="./favicon.svg" width={32} height={32} alt="Pioneer Logo" />
        </Link>
        <MenuIconWrapper
          onClick={() => {
            setOpenNavSidebar(true)
          }}
        >
          <MenuIcon />
        </MenuIconWrapper>
      </Wrapper>
      {openNavSidebar && <SideBarSlider />}
    </>
  )
}

const Wrapper = styled.div`
  grid-area: navbar;
  position: sticky;
  top: 0;
  z-index: ${ZIndex.navbar};
  background: ${Colors.White};
  box-shadow: 0px -1px 0px 0px rgba(187, 217, 246, 0.13) inset;
  display: flex;
  width: 100%;
  max-width: 100vw;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1024px) {
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
