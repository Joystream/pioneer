import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { MenuIcon } from '@/common/components/icons/MenuIcon'
import { Colors } from '@/common/constants'

import { SideBarSlider } from './SideBarSlider'

export const NavBar = () => {
  const [open, setOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth >= 768) {
      setOpen(false)
    }
  }, [windowWidth])

  return (
    <>
      <Wrapper>
        <Link href="#">
          <img src="./favicon.svg" width={32} height={32} alt="Pioneer Logo" />
        </Link>
        <MenuIconWrapper
          onClick={() => {
            setOpen(!open)
          }}
        >
          <MenuIcon />
        </MenuIconWrapper>
      </Wrapper>
      {open && <SideBarSlider setOpen={setOpen} />}
    </>
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
