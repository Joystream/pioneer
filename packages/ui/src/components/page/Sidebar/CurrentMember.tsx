import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../../../constants'
import { useMembership } from '../../../hooks/useMembership'
import { AddMembershipButton } from '../../AddMembershipButton'

export const CurrentMember = () => {
  const { count } = useMembership()

  if (count < 1) {
    return <AddMembershipButton />
  }

  return (
    <>
      <Memberships>
        Memberships <MembershipsBadge>{count}</MembershipsBadge>
      </Memberships>
      <MemberAccount>
        <MemberName>Alice</MemberName>
        <MemberPhoto />
        <MemberRoles>
          <MemberRole />
        </MemberRoles>
      </MemberAccount>
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

const MembershipsBadge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -24px;
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[500]};
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.White};
`

const MemberAccount = styled.a`
  display: grid;
  position: relative;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 20px 16px;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
  grid-template-areas:
    'memberphoto membername'
    'memberphoto memberroles';
  align-items: center;
  padding: 10px 8px;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.Black[700]};

  &:after {
    content: '';
    position: absolute;
    right: 12px;
    width: 6px;
    height: 6px;
    border: 1px solid ${Colors.Black[300]};
    border-bottom: 1px solid transparent;
    border-left: 1px solid transparent;
    transform: rotate(45deg);
    transition: ${Transitions.all};
  }
`

const MemberName = styled.span`
  grid-area: membername;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${Colors.White};
`

const MemberPhoto = styled.img`
  display: flex;
  grid-area: memberphoto;
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: ${BorderRad.full};
`

const MemberRoles = styled.ul`
  display: flex;
  grid-area: memberroles;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
`

const MemberRole = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 2px;
  font-size: 4px;
  line-height: 4px;
  text-align: center;
  border-radius: ${BorderRad.full};
  color: ${Colors.Black[100]};
  background-color: ${Colors.Black[600]};

  & + & {
    margin-left: 4px;
  }
`
