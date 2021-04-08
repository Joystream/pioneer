import styled from 'styled-components'

import { BorderRad, Colors } from '../../constants'

export const TemplateBlock = styled.div`
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  width: 100%;
`

export const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
`

export const Column = styled.div`
  display: grid;
  grid-row-gap: 8px;
  width: fit-content;
`

export const WhiteBlock = styled.div`
  padding: 16px;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`

export const BlackBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[900]};
`

export const GrayBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[50]};
`

export const DarkBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[100]};
`

export const DisabledBlock = styled(WhiteBlock)`
  background-color: ${Colors.Black[75]};
`
