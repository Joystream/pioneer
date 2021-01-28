import React from 'react'
import styled from 'styled-components'
import { Colors, Transitions } from '../../../constants'
import { OptionAccount, YieldMethod } from './OptionAccount'

export interface OptionListAccountProps {
  options: Array<YieldMethod>
  onChange: (option: YieldMethod) => void
}

export function OptionListAccount({ options, onChange }: OptionListAccountProps) {
  return (
    <OptionsListComponent>
      {options.map((option, index) => (
        <OptionAccount key={index} option={option} onChange={onChange} />
      ))}
    </OptionsListComponent>
  )
}

const OptionsListComponent = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  position: absolute;
  left: 0;
  top: calc(100% + 0.25em);
  width: 100%;
  height: auto;
  margin: 0;
  padding: 1em 0.75em;
  border-radius: 0.25em;
  background-color: ${Colors.White};
  box-shadow: 0px 20px 30px rgba(217, 224, 235, 0.6);
  transition: ${Transitions.all};
  animation: showOptions 0.25s ease;
  cursor: auto;
  z-index: 10;

  @keyframes showOptions {
    from {
      transform: translateY(-2em);
      opacity: 0;
      box-shadow: 0px 0px 0px rgba(217, 224, 235, 0);
    }
  }
`
