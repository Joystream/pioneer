import styled from 'styled-components'

import { Colors } from '../../constants'

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
  background-color: ${Colors.White};
`

export const BlackBlock = styled.div`
  background-color: ${Colors.Black[900]};
`

export const GrayBlock = styled.div`
  background-color: ${Colors.Black[50]};
`

export const DarkBlock = styled.div`
  background-color: ${Colors.Black[100]};
`

export const DisabledBlock = styled.div`
  background-color: ${Colors.Black[75]};
`
