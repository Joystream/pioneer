import styled from 'styled-components'
import { Colors } from '../../../constants'

export const Navigation = styled.nav`
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: 76px 1fr 176px 10px 20px;
  grid-row-gap: 8px;
  grid-template-areas:
    'barheader'
    'barlinks'
    'barmember'
    'barnetwork'
    'barversion';
  grid-area: navbar;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: ${Colors.Black[900]};
  color: ${Colors.White};
`
