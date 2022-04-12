import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { InputComponent, InputComponentProps, InputContainer } from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import { MemberInfo, MemberInfoProps } from '@/memberships/components/MemberInfo'
import { Member } from '@/memberships/types'

interface BaseSelectedMemberProps
  extends Pick<InputComponentProps, 'label' | 'disabled' | 'tooltipText'>,
    Pick<MemberInfoProps, 'hideGroup'> {
  member: Member | undefined
  size?: 'm' | 'l'
}

const BasedSelectedMember = ({
  label,
  member,
  size = 'm',
  hideGroup,
  disabled,
  tooltipText,
}: BaseSelectedMemberProps) => (
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

export interface SelectedMemberProps extends BaseSelectedMemberProps {
  name?: string
}

export const SelectedMember = ({ name, ...props }: SelectedMemberProps) => {
  const formContext = useFormContext()

  useEffect(() => {
    if (props.member && formContext && name) {
      formContext.setValue(name, props.member)
    }
  }, [props.member, formContext])

  return <BasedSelectedMember {...props} />
}
