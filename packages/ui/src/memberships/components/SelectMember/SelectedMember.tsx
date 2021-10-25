import React from 'react'
import styled from 'styled-components'

import { InputComponent, InputComponentProps, InputContainer } from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import { MemberInfo, MemberInfoProps } from '@/memberships/components/MemberInfo'
import { Member } from '@/memberships/types'

export interface SelectedMemberProps
  extends Pick<InputComponentProps, 'label' | 'disabled'>,
    Pick<MemberInfoProps, 'hideGroup'> {
  member: Member | undefined
  size?: 'm' | 'l'
}

export const SelectedMember = ({ label, member, size = 'm', hideGroup, disabled }: SelectedMemberProps) => (
  <Container label={label} inputSize={size === 'm' ? 'l' : 'xl'} disabled={disabled}>
    {member ? (
      <MemberInfo member={member} memberSize={size} size={size} hideGroup={hideGroup} skipModal />
    ) : (
      <Loading />
    )}
  </Container>
)

const Container = styled(InputComponent)`
  ${InputContainer} {
    padding-left: 16px;
  }
`
