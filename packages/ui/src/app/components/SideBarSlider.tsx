import React from 'react'
import styled from 'styled-components'

import { CrossIcon } from '@/common/components/icons'
import { NavigationInnerWrapper } from '@/common/components/page/Sidebar/Navigation'
import { SidePaneGlass } from '@/common/components/SidePane'
import { Animations, Colors } from '@/common/constants'
import { useEscape } from '@/common/hooks/useEscape'
import { useResponsive } from '@/common/hooks/useResponsive'

import { SideBarContent } from './SideBar'

export const SideBarSlider = React.memo(() => {
  const { setOpenNavSidebar } = useResponsive()

  const hideSideBarSlider = () => {
    setOpenNavSidebar(false)
  }
  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideSideBarSlider()
    }
  }
  useEscape(() => hideSideBarSlider())

  return (
    <SidePaneGlassWrapper onClick={onBackgroundClick}>
      <SideBarWarpper>
        <NavigationInnerWrapper>
          <SliderHeader>
            <CloseIconWrapper onClick={hideSideBarSlider}>
              <CrossIcon />
            </CloseIconWrapper>
          </SliderHeader>
          <SideBarContent />
        </NavigationInnerWrapper>
      </SideBarWarpper>
    </SidePaneGlassWrapper>
  )
})

export const SideBarWarpper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 226px;
  height: 100%;
  ${Animations.showSidePane};
`

export const SliderHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 0px 16px;
  grid-area: barheader;
`

const CloseIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.White};
  cursor: pointer;
  &:hover {
    background-color: ${Colors.Black[600]};
  }
`

const SidePaneGlassWrapper = styled(SidePaneGlass)`
  @media (max-width: 767px) {
    display: flex;
  }
`
