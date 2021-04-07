import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../../../../app/constants'
import { useMyMemberships } from '../../../../../membership/hooks/useMyMemberships'
import { BuyMembershipModalCall } from '../../../../../membership/modals/BuyMembershipModal'
import { useModal } from '../../../../hooks/useModal'
import { useToggle } from '../../../../hooks/useToggle'
import { ArrowDownExpandedIcon, Icon } from '../../../icons'
import { MemberDarkHover, MemberInfo, MembershipsCount } from '../../../membership'
import { AddMembershipButton } from '../../../membership/AddMembershipButton'

import { SwitchMemberModal } from './SwitchMemberModal'

export const CurrentMember = () => {
  const { count, active } = useMyMemberships()
  const [isOpen, toggleOpen] = useToggle()
  const { showModal } = useModal()

  if (count < 1) {
    return <AddMembershipButton>Create membership</AddMembershipButton>
  }

  return (
    <>
      <MembershipsCount count={count} />
      <SwitchMember onClick={toggleOpen}>
        {active && <MemberInfo member={active} isOnDark={true} />}
        {!active && <>Select membership</>}
        <SwitchArrow>
          <ArrowDownExpandedIcon />
        </SwitchArrow>
      </SwitchMember>
      {isOpen && (
        <SwitchMemberModal
          onClose={toggleOpen}
          onCreateMember={() => showModal<BuyMembershipModalCall>({ modal: 'BuyMembership' })}
        />
      )}
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

    ${MemberDarkHover}
  }
`
