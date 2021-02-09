import styled from 'styled-components'
import { BorderRad, Colors } from '../../constants'

export const TextInput = styled.input`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  font-size: 14px;
  line-height: 22px;
  font-weight: 700;
`

export const NumberInput = styled(TextInput)`
  text-align: right;
`
