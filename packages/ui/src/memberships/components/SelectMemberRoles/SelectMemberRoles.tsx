import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ControlProps } from '@/common/components/forms'
import { MultiSelect, MultiSelected, Selected } from '@/common/components/selects'
import { TextMedium } from '@/common/components/typography'
import { intersperse } from '@/common/utils'
import { MemberRoleHelp } from '@/memberships/components/MemberRoles'
import { memberRoleAbbreviation, memberRoleTitle } from '@/memberships/helpers'
import { useAllMemberRoles } from '@/memberships/hooks/useAllMemberRoles'
import { MemberRole } from '@/memberships/types'

interface Props extends ControlProps<MemberRole[]> {
  onApply: () => void
  onClear?: () => void
}

export const SelectMemberRoles = ({ value, ...props }: Props) => {
  const { roles } = useAllMemberRoles()

  const [options, setOptions] = useState(roles)
  useEffect(() => {
    roles.length > 0 && setOptions(roles)
  }, [JSON.stringify(roles)])

  const renderSelected = (value: MemberRole[]) => {
    if (!value.length) {
      return (
        <Selected>
          <TextMedium lighter>Select</TextMedium>
        </Selected>
      )
    } else {
      const roleHelpers = value.map((role, key) => (
        <MemberRoleHelp key={key} size="l">
          {memberRoleAbbreviation(role)}
        </MemberRoleHelp>
      ))
      return <SelectedRoles>{intersperse(roleHelpers, ' ')}</SelectedRoles>
    }
  }

  return (
    <MultiSelect
      title="Roles"
      options={options}
      value={value}
      renderSelected={renderSelected}
      renderOption={memberRoleTitle}
      {...props}
    />
  )
}

const SelectedRoles = styled(MultiSelected)`
  word-spacing: 4px;
  ${MemberRoleHelp} {
    display: inline-flex;
  }
`
