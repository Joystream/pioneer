import React, { useState } from 'react'
import styled from 'styled-components'
import { BorderRad, Colors } from '../constants'

export const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  vertical-align: middle;
  color: ${Colors.Black[900]};
`

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

interface SwitchProps {
  textOn: string
  textOff: string
  initialState: boolean
  onChange: (isOn: boolean) => void
}

export const Switch = ({ initialState, textOff, textOn, onChange }: SwitchProps) => {
  const [isOn, setIsOn] = useState(initialState)

  return (
    <span>
      {textOn}
      <input
        type="checkbox"
        checked={isOn}
        onChange={(event) => {
          setIsOn(event.target.checked)
          onChange(event.target.checked)
        }}
      />
      {textOff}
    </span>
  )
}
