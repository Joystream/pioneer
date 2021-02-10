import React, { useState } from 'react'

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
