import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { InputComponent, InputComponentProps, InputContainer } from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import { MemberInfo, MemberInfoProps } from '@/memberships/components/MemberInfo'
import { Member } from '@/memberships/types'

export interface SelectedMemberProps
  extends Pick<InputComponentProps, 'label' | 'disabled' | 'tooltipText'>,
    Pick<MemberInfoProps, 'hideGroup'> {
  member: Member | undefined
  size?: 'm' | 'l'
}

export const SelectedMember = ({
  label,
  member,
  size = 'm',
  hideGroup,
  disabled,
  tooltipText,
}: SelectedMemberProps) => (
  <Container label={label} inputSize={size === 'm' ? 'l' : 'xl'} disabled={disabled} tooltipText={tooltipText}>
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

interface ControlledSelectedMemberProps extends SelectedMemberProps {
  name: string
}

export const ControlledSelectedMember = ({ name, ...props }: ControlledSelectedMemberProps) => {
  const formContext = useFormContext()
  useEffect(() => {
    if (props.member) {
      formContext.setValue(name, props.member)
    }
  }, [props.member])

  return <SelectedMember {...props} />
}
