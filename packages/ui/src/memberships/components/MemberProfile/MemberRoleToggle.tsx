import React, { useCallback } from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { ToggleableItem, ToggleButton } from '@/common/components/buttons/Toggle'
import { Arrow } from '@/common/components/icons'
import { SidePaneColumn, SidePaneLabel, SidePaneRow, SidePaneTable, SidePaneText } from '@/common/components/SidePane'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useToggle } from '@/common/hooks/useToggle'
import { Member } from '@/memberships/types'
import { workerRoleTitle } from '@/working-groups/helpers'
import { useRewardPeriod } from '@/working-groups/hooks/useRewardPeriod'
import { useWorkerEarnings } from '@/working-groups/hooks/useWorkerEarnings'
import { ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { WorkerWithDetails } from '@/working-groups/types'

export interface MemberRoleToggleProps {
  member: Member
  role: WorkerWithDetails
}

export const MemberRoleToggle = ({ role }: MemberRoleToggleProps) => {
  const { showModal } = useModal()
  const showApplicationModal = useCallback(() => {
    showModal<ApplicationDetailsModalCall>({
      modal: 'ApplicationDetails',
      data: { applicationId: role.applicationId },
    })
  }, [role])
  const { earnings } = useWorkerEarnings(role.id)
  const rewardPeriod = useRewardPeriod(role.group.id)
  const [isOpen, toggleOpen] = useToggle()

  return (
    <RoleToggle absoluteToggle isOpen={isOpen} toggleOpen={toggleOpen}>
      <MemberRoleToggleContainer>
        <MemberRoleTitleContainer onClick={toggleOpen}>
          <h5>{workerRoleTitle(role)}</h5>
        </MemberRoleTitleContainer>
        {isOpen && (
          <MemberRoleTableContainer>
            <MemberRoleTable>
              <SidePaneRow>
                <SidePaneLabel text="Hired" />
                <SidePaneColumn>
                  <BlockTime block={role.hiredAtBlock} />
                </SidePaneColumn>
              </SidePaneRow>
              <SidePaneRow>
                <SidePaneLabel text="Reward" />
                <SidePaneColumn>
                  <SidePaneText>
                    <TokenValue value={rewardPeriod?.mul(role.rewardPerBlock)} /> / {rewardPeriod?.toString()} blocks
                  </SidePaneText>
                </SidePaneColumn>
              </SidePaneRow>
              <SidePaneRow>
                <SidePaneLabel text="Earned total" />
                <SidePaneColumn>
                  <SidePaneText>
                    <TokenValue value={earnings} />
                  </SidePaneText>
                </SidePaneColumn>
              </SidePaneRow>
              {/** TODO fix calculation <SidePaneRow>
                <SidePaneLabel text="Earned in 7 days" />
                <SidePaneColumn>
                  <SidePaneText>
                    <TokenValue value={currentDayEarnings} />
                  </SidePaneText>
                </SidePaneColumn>
              </SidePaneRow>**/}
              <SidePaneRow>
                <SidePaneLabel text="Role account" />
                <SidePaneColumn>
                  <UnknownAccountInfo address={role.roleAccount} placeholderName="Role account" />
                </SidePaneColumn>
              </SidePaneRow>
              <SidePaneRow>
                <SidePaneLabel text="Staking account" />
                <SidePaneColumn>
                  <UnknownAccountInfo address={role.stakeAccount} placeholderName="Staking account" />
                </SidePaneColumn>
              </SidePaneRow>
              <SidePaneRow>
                <SidePaneLabel text="Reward account" />
                <SidePaneColumn>
                  <UnknownAccountInfo address={role.rewardAccount} placeholderName="Reward account" />
                </SidePaneColumn>
              </SidePaneRow>
              <ButtonsGroup align="left">
                <ButtonGhost size="small" onClick={showApplicationModal}>
                  Application preview <Arrow direction="right" />
                </ButtonGhost>
                <LinkButtonGhost size="small" to={`/working-groups/openings/${role?.openingId}`}>
                  Opening preview <Arrow direction="right" />
                </LinkButtonGhost>
              </ButtonsGroup>
            </MemberRoleTable>
          </MemberRoleTableContainer>
        )}
      </MemberRoleToggleContainer>
    </RoleToggle>
  )
}

const RoleToggle = styled(ToggleableItem)`
  position: relative;
  background-color: transparent;

  ${ToggleButton} {
    top: 12px;
    z-index: 3;
  }
`

const MemberRoleToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const MemberRoleTitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 56px;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  z-index: 2;
`

const MemberRoleTableContainer = styled.div`
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
  margin-top: -1px;
`

const MemberRoleTable = styled(SidePaneTable)`
  padding: 16px;

  &:after {
    display: none;
  }
`
