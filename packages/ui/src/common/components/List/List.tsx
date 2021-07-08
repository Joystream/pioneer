import styled, { css } from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`

export const ListItem = styled.li`
  display: grid;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  transition: ${Transitions.all};

  & + & {
    margin-top: -1px;
  }
`

export const TableListRowStyle = (colLayout?: string) => css`
  grid-template-columns: ${colLayout ?? 'repeat(auto-fill, 100px)'};
  justify-content: space-between;
  padding-left: 16px;
`

export const TableListItem = styled(ListItem)`
  align-items: center;
  height: 92px;
  ${(props: { colLayout?: string }) => TableListRowStyle(props.colLayout)}
`
