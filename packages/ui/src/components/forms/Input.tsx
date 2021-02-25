import styled from 'styled-components'
import { BorderRad, Colors, Fonts } from '../../constants'

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

  &::placeholder {
    font-weight: 400;
    color: ${Colors.Black[400]};
  }
`

export const NumberInput = styled(TextInput)`
  text-align: right;
`

export const TextArea = styled.textarea`
  font-family: ${Fonts.Inter};
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
  resize: none;

  &::placeholder {
    font-weight: 400;
    color: ${Colors.Black[400]};
  }
`
