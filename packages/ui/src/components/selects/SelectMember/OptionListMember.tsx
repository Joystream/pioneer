import React from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { BorderRad, Colors, Shadows, Sizes, Transitions } from '../../../constants'
import { OptionComponent, OptionComponentContainer, OptionMember } from './OptionMember'

interface Props {
  options: BaseMember[]
  onChange: (member: BaseMember) => void
}

export const OptionListMember = React.memo(({ options, onChange }: Props) => (
  <OptionsListComponent>
    {options.map((member) => (
      <OptionMember key={member.handle} member={member} onChange={onChange} />
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
  max-height: calc(${Sizes.memberSelectHeight} * 4.5);
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
