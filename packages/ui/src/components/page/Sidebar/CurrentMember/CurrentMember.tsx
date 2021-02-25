import React, { useState } from 'react'
import styled from 'styled-components'
import { ArrowDownExpandedIcon, ArrowIcon } from '../../../../components/icons/ArrowDownExpandedIcon'
import { BorderRad, Colors, Transitions } from '../../../../constants'
import { useMembership } from '../../../../hooks/useMembership'
import { AddMembershipButton } from '../../../AddMembershipButton'
import { MemberHandle, MemberIcons, MemberInfo, MemberRole } from '../../../MemberInfo'
import { Badge } from '../../../typography'
import { SwitchMemberModal } from './SwitchMemberModal'

export const CurrentMember = () => {
  const { count, members, active } = useMembership()
  const [isOpen, setIsOpen] = useState(false)

  if (count < 1) {
    return <AddMembershipButton />
  }

  return (
    <>
      <Memberships>
        Memberships <MembershipsBadge>{count}</MembershipsBadge>
      </Memberships>
      <SwitchMember onClick={() => setIsOpen(true)}>
        <MemberInfo member={active || members[0]} />
        <SwitchArrow>
          <ArrowDownExpandedIcon />
        </SwitchArrow>
      </SwitchMember>
      {isOpen && <SwitchMemberModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

const Memberships = styled.span`
  display: inline-flex;
  position: relative;
  align-items: center;
  grid-area: memberships;
  margin-left: 8px;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
`

const MembershipsBadge = styled(Badge)`
  position: absolute;
  right: -24px;
`

const SwitchMember = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  align-items: center;
  background-color: ${Colors.Black[700]};
  padding: 12px 8px;
  border-radius: ${BorderRad.s};
  grid-area: memberaccount;
  cursor: pointer;
  transition: ${Transitions.all};

  ${MemberHandle} {
    color: ${Colors.Black[75]};
  }
  ${MemberIcons} {
    .memberCircle {
      stroke: ${Colors.Blue[500]};
      transition: ${Transitions.all};
    }
    .memberInner {
      fill: ${Colors.Blue[500]};
      transition: ${Transitions.all};
    }
  }
  ${MemberRole} {
    color: ${Colors.Black[300]};
    background-color: ${Colors.Black[600]};
    transition: ${Transitions.all};
  }

  &:hover {
    background: ${Colors.Black[600]};
    ${MemberHandle} {
      color: ${Colors.Black[50]};
    }
    ${MemberIcons} {
      .memberCircle {
        stroke: ${Colors.Blue[400]};
      }
      .memberInner {
        fill: ${Colors.Blue[400]};
      }
    }
    ${MemberRole} {
      color: ${Colors.Black[200]};
      background-color: ${Colors.Black[500]};
    }
    ${ArrowIcon} {
      color: ${Colors.Black[75]};
    }
  }
`

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
