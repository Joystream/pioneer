import styled from 'styled-components'

import { Colors, ZIndex } from '../../../constants'

export const Navigation = styled.nav`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  grid-area: sidebar;
  width: 100%;
  max-width: 226px;
  height: 100vh;
  z-index: ${ZIndex.navbar};

  @media (min-width: 1024px) {
    display: flex;
  }
`

export const NavigationInnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 72px 1fr 168px;
  grid-template-areas:
    'barheader'
    'barlinks'
    'barmember';
  width: 100%;
  height: 100%;
  padding-bottom: 2px;
  color: ${Colors.White};
  background-color: ${Colors.Black[900]};
  z-index: ${ZIndex.navbarInner};

  @media (min-width: 1024px) {
    grid-template-rows: 76px 1fr 168px;
  }
`
