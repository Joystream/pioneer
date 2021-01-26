import React from 'react'
import styled from 'styled-components'
import { ButtonPrimarySquare } from '../../components/buttons/Buttons'
import { TransferIcon } from '../../components/icons/TransferIcon'
import { BorderRad, Colors, Transitions } from '../../constants'

export function ProfileComponent() {
  return (
    <Profile>
      <Memberships>Memberships</Memberships>
      <MemberAccount>
        <MemberName>Alice</MemberName>
        <MemberPhoto />
        <MemberRoles>
          <MemberRole />
        </MemberRoles>
      </MemberAccount>
      <MemberBalance>
        <BalanceTitle>Total Balance</BalanceTitle>
        <TotalBalance>109,821.242</TotalBalance>
        <BalanceTransfer>
          <TransferIcon />
        </BalanceTransfer>
      </MemberBalance>
    </Profile>
  )
}

const Profile = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px 64px 56px;
  grid-template-areas:
    'memberships'
    'memberaccount'
    'memberbalance';
  grid-row-gap: 16px;
  grid-area: barmember;
  width: 100%;
  padding: 0 8px;
`

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

  &:after {
    content: '3';
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: -24px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${Colors.Black[500]};
    font-size: 10px;
    line-height: 16px;
    font-weight: 700;
    color: ${Colors.White};
  }
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

const MemberBalance = styled.div`
  display: grid;
  grid-area: memberbalance;
  grid-template-columns: 1fr 32px;
  grid-template-rows: 16px 24px;
  grid-template-areas:
    'balancetitle balancetransfer'
    'balancevalue balancetransfer';
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  padding-left: 8px;
`

const BalanceTitle = styled.span`
  grid-area: balancetitle;
  font-size: 10px;
  line-height: 16px;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  font-weight: 700;
`

const TotalBalance = styled.span`
  display: inline-flex;
  align-items: baseline;
  position: relative;
  grid-area: balancevalue;
  width: fit-content;
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.White};
  font-weight: 700;

  &:after {
    content: 'joy';
    margin-left: 4px;
    font-size: 14px;
    line-height 20px;
    color: ${Colors.Black[400]};
    text-transform: uppercase;
  }
`

const BalanceTransfer = styled(ButtonPrimarySquare)`
  width: 32px;
  height: 32px;
  grid-area: balancetransfer;
`
