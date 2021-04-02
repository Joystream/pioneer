import { BorderRad, Colors, Transitions } from '../../../constants'
import styled from 'styled-components'

export const OpeningsCategories = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
`

export const OpeningsCategory = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
`

export const OpeningsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const OpeningItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 16px;
  grid-column-gap: 24px;
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  transition: ${Transitions.all};

  & + & {
    margin-top: -1px;
  }
`
