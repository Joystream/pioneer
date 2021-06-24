import styled from 'styled-components'

import { Colors } from '../../../constants'

export const Navigation = styled.nav`
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  grid-template-columns: 1fr;
  grid-template-rows: 76px 1fr 176px;
  grid-row-gap: 8px;
  grid-template-areas:
    'barheader'
    'barlinks'
    'barmember';
  grid-area: navbar;
  width: 100%;
  max-width: 226px;
  height: 100vh;
  padding-bottom: 20px;
  color: ${Colors.White};
  background-color: ${Colors.Black[900]};
  z-index: 100;
`
