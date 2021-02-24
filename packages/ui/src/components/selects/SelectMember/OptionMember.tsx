import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { BorderRad, Colors, Sizes, Transitions } from '../../../constants'
import { MemberInfo } from '../../MemberInfo'

interface Props {
  member: MemberFieldsFragment
  onChange?: (member: MemberFieldsFragment) => void
}

export function OptionMember({ member, onChange }: Props) {
  return (
    <OptionComponentContainer onClick={() => onChange && onChange(member)}>
      <OptionComponent>
        <MemberInfo member={member} />
      </OptionComponent>
    </OptionComponentContainer>
  )
}

export const OptionComponentContainer = styled.li`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: transparent;
`

export const OptionComponent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: ${Colors.White};
  cursor: pointer;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  min-height: ${Sizes.memberSelectHeight};
  max-height: ${Sizes.memberSelectHeight};
  padding: 12px 16px;

  &:active,
  &:focus {
    outline: none;
  }
`
