import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../../../constants'
import { useMyMemberships } from '../../../../hooks/useMyMemberships'
import { useToggle } from '../../../../hooks/useToggle'
import { AddMembershipModal } from '../../../../modals/AddMembershipModal'
import { ArrowDownExpandedIcon, Icon } from '../../../icons'
import { MemberDarkHover, MemberInfo, MembershipsCount } from '../../../membership'
import { AddMembershipButton } from '../../../membership/AddMembershipButton'
import { SwitchMemberModal } from './SwitchMemberModal'

export const CurrentMember = () => {
  const { count, members, active } = useMyMemberships()
  const [isOpen, toggleOpen] = useToggle()
  const [isCreateOpen, toggleCreateOpen] = useToggle()

  if (count < 1) {
    return <AddMembershipButton>Create a membership</AddMembershipButton>
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

  ${Icon.type} {
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

    /* ${Icon.type} {
      color: ${Colors.Black[75]};
    } */
    ${MemberDarkHover}
  }
`
