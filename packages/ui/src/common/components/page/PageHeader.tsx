import styled from 'styled-components'

import { ButtonsGroup } from '../buttons'

export const PageHeader = styled.section`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px 8px;

  ${ButtonsGroup} {
    position: absolute;
    top: 0;
    right: 0;
  }
`
