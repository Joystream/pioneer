import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonsGroup } from '../../../common/components/buttons'
import { ToggleableItem, ToggleButton } from '../../../common/components/buttons/Toggle'
import { Arrow } from '../../../common/components/icons'
import {
  SidePaneColumn,
  SidePaneLabel,
  SidePaneRow,
  SidePaneTable,
  SidePaneText,
} from '../../../common/components/SidePane'
import { BorderRad, Colors } from '../../../common/constants'
import { Member } from '../../types'

export interface MemberRoleToggleProps {
  member: Member
  role: string
}

export const MemberRoleToggle = ({ member, role }: MemberRoleToggleProps) => {
  return (
    <RoleToggle absoluteToggle>
      {(isOpen) => {
        return (
          <MemberRoleToggleContainer>
            <MemberRoleTitleContainer>
              <h5>{role}</h5>
            </MemberRoleTitleContainer>
            {isOpen && (
              <MemberRoleTableContainer>
                <MemberRoleTable>
                  <SidePaneRow>
                    <SidePaneLabel text="Hired" />
                    <SidePaneColumn>Add block component here</SidePaneColumn>
                  </SidePaneRow>
                  <SidePaneRow>
                    <SidePaneLabel text="Reward" />
                    <SidePaneColumn>
                      <SidePaneText>13 923 JOY / 3600 blocks</SidePaneText>
                    </SidePaneColumn>
                  </SidePaneRow>
                  <SidePaneRow>
                    <SidePaneLabel text="Earned total" />
                    <SidePaneColumn>
                      <SidePaneText>20 923M JOY </SidePaneText>
                    </SidePaneColumn>
                  </SidePaneRow>
                  <SidePaneRow>
                    <SidePaneLabel text="Earned in 24h" />
                    <SidePaneColumn>
                      <SidePaneText> {member.id} JOY (id for test) </SidePaneText>
                    </SidePaneColumn>
                  </SidePaneRow>
                  <SidePaneRow>
                    <SidePaneLabel text="Role account" />
                    <SidePaneColumn>Add account component here</SidePaneColumn>
                  </SidePaneRow>
                  <SidePaneRow>
                    <SidePaneLabel text="Staking account" />
                    <SidePaneColumn>Add account component here</SidePaneColumn>
                  </SidePaneRow>
                  <SidePaneRow>
                    <SidePaneLabel text="Reward account" />
                    <SidePaneColumn>Add account component here</SidePaneColumn>
                  </SidePaneRow>
                  <ButtonsGroup align="left">
                    <ButtonGhost size="small">
                      Application preview <Arrow direction="right" />
                    </ButtonGhost>
                    <ButtonGhost size="small">
                      Opening preview <Arrow direction="right" />
                    </ButtonGhost>
                  </ButtonsGroup>
                </MemberRoleTable>
              </MemberRoleTableContainer>
            )}
          </MemberRoleToggleContainer>
        )
      }}
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
