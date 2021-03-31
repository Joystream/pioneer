import React, { useCallback } from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { EditSymbol } from '../../../components/icons/symbols/EditSymbol'
import { MemberInfo, MemberRoleHelp } from '../../../components/membership'
import { MemberModalCall } from '../../../components/membership/MemberProfile'
import { TransferInviteButton } from '../../../components/TransferInviteButton'
import { BorderRad, Colors, Fonts, Sizes } from '../../../constants'
import { useModal } from '../../../hooks/useModal'
import { EditMembershipButton } from '../../../membership/components/EditMembershipButton'

interface Props {
  member: BaseMember
}

export const MemberItem = ({ member }: Props) => {
  const { showModal } = useModal()

  const showMemberModal = useCallback(() => {
    showModal<MemberModalCall>({ modal: 'Member', data: { id: member.id } })
  }, [member.id])

  return (
    <MemberItemWrap>
      <MemberColumn>
        <MemberInfo member={member} onClick={showMemberModal} showId />
      </MemberColumn>
      <MemberRolesColumn>
        <MemberRoleHelp memberRole="SL" size="l" helperText="Lorem fishy" />
        <MemberRoleHelp memberRole="SP" size="l" helperText="Lorem fishy" />
        <MemberRoleHelp memberRole="RL" size="l" helperText="Lorem fishy" />
        <MemberRoleHelp memberRole="LI" size="l" helperText="Lorem fishy" />
        <MemberRoleHelp memberRole="SR" size="l" helperText="Lorem fishy" />
      </MemberRolesColumn>
      <MemberColumn>
        <CountInfo>0 times</CountInfo>
      </MemberColumn>
      <MemberColumn>
        <CountInfo>0 times</CountInfo>
      </MemberColumn>
      <MemberColumn>
        <CountInfo>{member.inviteCount}</CountInfo>
        <TransferInviteButton member={member} />
      </MemberColumn>
      <MemberColumn>
        <CountInfo>0</CountInfo>
      </MemberColumn>
      <MemberControls>
        <EditMembershipButton member={member} size="small">
          <EditSymbol />
        </EditMembershipButton>
      </MemberControls>
    </MemberItemWrap>
  )
}

const CountInfo = styled.span`
  font-family: ${Fonts.Grotesk};
  font-weight: 700;
`

const MemberItemWrap = styled.li`
  display: grid;
  grid-template-columns: 194px 200px 76px 76px 96px 76px 54px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 0 16px 14px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};

  & + & {
    margin-top: -1px;
  }
`

const MemberColumn = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  align-items: center;
  width: fit-content;
  max-width: 100%;
`

const MemberRolesColumn = styled(MemberColumn)`
  grid-template-columns: repeat(auto-fill, 24px);
  grid-auto-flow: dense;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  width: 100%;
  max-width: 164px;
  max-height: 52px;
`

const MemberControls = styled.div``
