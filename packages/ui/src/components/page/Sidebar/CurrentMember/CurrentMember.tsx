import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../../../constants'
import { useMembership } from '../../../../hooks/useMembership'
import { useToggle } from '../../../../hooks/useToggle'
import { AddMembershipModal } from '../../../../modals/AddMembershipModal'
import { AddMembershipButton } from '../../../AddMembershipButton'
import { ArrowDownExpandedIcon, ArrowIcon } from '../../../icons'
import { MemberDarkHover, MemberInfo } from '../../../MemberInfo'
import { MembershipsCount } from '../../../MembershipCount'
import { SwitchMemberModal } from './SwitchMemberModal'

export const CurrentMember = () => {
  const { count, members, active } = useMembership()
  const [isOpen, toggleOpen] = useToggle()
  const [isCreateOpen, toggleCreateOpen] = useToggle()

  if (count < 1) {
    return <AddMembershipButton />
  }

  return (
    <>
      <MembershipsCount />
      <SwitchMember onClick={toggleOpen}>
        <MemberInfo member={active || members[0]} isOnDark={true} />
        <SwitchArrow>
          <ArrowDownExpandedIcon />
        </SwitchArrow>
      </SwitchMember>
      {isOpen && <SwitchMemberModal onClose={toggleOpen} onCreateMember={toggleCreateOpen} />}
      {isCreateOpen && <AddMembershipModal onClose={toggleCreateOpen} />}
    </>
  )
}

const SwitchArrow = styled.span`
  width: 16px;
  height: 16px;

  ${ArrowIcon} {
    width: 100%;
    height: 100%;
    color: ${Colors.Black[400]};
    transform: rotate(-90deg);
    transition: ${Transitions.all};
  }
`

const SwitchMember = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px;
  grid-column-gap: 8px;
  align-items: center;
  grid-area: memberaccount;
  padding: 12px 8px;
  background-color: ${Colors.Black[700]};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    background: ${Colors.Black[600]};

    ${ArrowIcon} {
      color: ${Colors.Black[75]};
    }
    ${MemberDarkHover}
  }
`
