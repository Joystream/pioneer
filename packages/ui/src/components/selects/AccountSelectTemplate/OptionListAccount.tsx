import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Sizes, Transitions } from '../../../constants'
import { OptionAccount, SelectAccountOption } from './OptionAccount'

export interface OptionListAccountProps {
  options: Array<SelectAccountOption>
  onChange: (option: SelectAccountOption) => void
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
  top: 100%;
  width: 100%;
  height: auto;
  max-height: calc(${Sizes.accountSelect} * 2.5);
  margin: 0;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  overflow-y: scroll;
  transition: ${Transitions.all};
  animation: showOptions 0.25s ease;
  cursor: auto;
  z-index: 10;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @keyframes showOptions {
    from {
      transform: translateY(-2em);
      opacity: 0;
      box-shadow: 0px 0px 0px rgba(217, 224, 235, 0);
    }
  }
`
