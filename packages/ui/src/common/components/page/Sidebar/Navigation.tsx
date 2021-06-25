import styled from 'styled-components'

import { Colors } from '../../../constants'

export const Navigation = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  grid-area: navbar;
  width: 100%;
  max-width: 226px;
  height: 100vh;
  z-index: 100;
`

export const NavigationInnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 76px 1fr 176px;
  grid-row-gap: 8px;
  grid-template-areas:
    'barheader'
    'barlinks'
    'barmember';
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  color: ${Colors.White};
  background-color: ${Colors.Black[900]};
  z-index: 150;
`
