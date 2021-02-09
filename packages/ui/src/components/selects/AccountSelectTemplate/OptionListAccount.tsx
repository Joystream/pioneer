import React from 'react'
import styled from 'styled-components'
import { BorderRad, Shadows, Sizes, Transitions } from '../../../constants'
import { Account } from '../../../hooks/types'
import { OptionAccount } from './OptionAccount'

interface Props {
  options: Array<Account>
  onChange: (account: Account) => void
}

export function OptionListAccount({ options, onChange }: Props) {
  return (
    <OptionsListComponent>
      {options.map((account, index) => (
        <OptionAccount key={index} account={account} onChange={onChange} />
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
  max-height: calc(${Sizes.accountSelectHeight} * 2.5);
  margin: 0;
  border-radius: ${BorderRad.s};
  background-color: transparent;
  box-shadow: ${Shadows.select};
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
      opacity: 0;
      max-height: 0;
    }
  }
`
