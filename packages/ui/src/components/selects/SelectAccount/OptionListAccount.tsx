import React from 'react'
import styled from 'styled-components'
import { BorderRad, Shadows, Sizes, Transitions, Colors } from '../../../constants'
import { Account } from '../../../common/types'
import { OptionAccount, OptionComponentContainer, OptionComponent } from './OptionAccount'

interface Props {
  options: Array<Account>
  onChange: (account: Account) => void
}

export const OptionListAccount = React.memo(({ options, onChange }: Props) => (
  <OptionsListComponent>
    {options.map((account) => (
      <OptionAccount key={account.address} account={account} onChange={onChange} />
    ))}
  </OptionsListComponent>
))

const OptionsListComponent = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: auto;
  max-height: calc(${Sizes.accountSelectHeight} * 2.5);
  margin: -1px 0 0;
  border-radius: ${BorderRad.s};
  border: 1px solid ${Colors.Black[300]};
  background-color: ${Colors.White};
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

  ${OptionComponentContainer} {
    border-left: none;
    border-right: none;
    border-radius: 0;

    &:first-child {
      border-top: none;
    }

    &:last-child {
      border-bottom: none;
    }

    ${OptionComponent} {
      border-radius: 0;
    }
  }

  ${OptionComponentContainer} + ${OptionComponentContainer} {
    margin-top: -1px;
  }
`
