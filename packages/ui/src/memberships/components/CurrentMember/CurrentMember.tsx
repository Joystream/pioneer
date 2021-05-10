import React from 'react'
import styled from 'styled-components'

import { MemberDarkHover, MemberInfo, MembershipsCount } from '..'
import { ArrowDownExpandedIcon, Icon } from '../../../common/components/icons'
import { BorderRad, Colors, Transitions } from '../../../common/constants'
import { useModal } from '../../../common/hooks/useModal'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { SwitchMemberModalCall } from '../../modals/SwitchMemberModal'
import { AddMembershipButton } from '../AddMembershipButton'


export const CurrentMember = () => {
  const { members, active } = useMyMemberships()
  const { showModal } = useModal()

  const count = members.length

  if (count < 1) {
    return <AddMembershipButton>Create membership</AddMembershipButton>
  }

  return (
    <>
      <MembershipsCount count={count} />
      <SwitchMember onClick={() => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })}>
        {active && <MemberInfo member={active} isOnDark={true} maxRoles={4} />}
        {!active && <>Select membership</>}
        <SwitchArrow>
          <ArrowDownExpandedIcon />
        </SwitchArrow>
      </SwitchMember>
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
