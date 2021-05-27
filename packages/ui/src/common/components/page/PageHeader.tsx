import styled from 'styled-components'

import { ButtonsGroup } from '../buttons'

export const PageHeader = styled.section`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 16px;

  ${ButtonsGroup} {
    position: absolute;
    top: 0;
    right: 0;
  }
`
