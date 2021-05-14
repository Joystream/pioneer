import React from 'react'
import styled from 'styled-components'

import { MemberDarkHover, MemberInfo, MembershipsCount } from '..'
import { ButtonPrimary } from '../../../common/components/buttons'
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
    return (
      <MembershipButtonsWrapper>
        <AddMembershipButton>Create membership</AddMembershipButton>
      </MembershipButtonsWrapper>
    )
  }

  return (
    <>
      <MembershipsCount count={count} />
      {active && (
        <SwitchMember onClick={() => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })}>
          {active && <MemberInfo member={active} isOnDark={true} maxRoles={4} />}
          <SwitchArrow>
            <ArrowDownExpandedIcon />
          </SwitchArrow>
        </SwitchMember>
      )}
      {!active && (
        <MembershipButtonsWrapper>
          <MembershipActionButton onClick={() => showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })}>
            Select membership
          </MembershipActionButton>
        </MembershipButtonsWrapper>
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

export const MembershipActionButton = styled(ButtonPrimary)`
  width: 100%;
`

const MembershipButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  grid-area: memberaccount;
`
