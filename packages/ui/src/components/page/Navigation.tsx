import styled from 'styled-components'
import { Colors } from '../../constants'

export const Navigation = styled.nav`
  display: flex;
  position: relative;
  flex-direction: column;
  grid-area: navbar;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
  background: ${Colors.Black};
  color: ${Colors.White};
`
