import React, { useEffect, useState } from 'react'

import { ControlProps } from '@/common/components/forms'
import { MultiSelect, Selected } from '@/common/components/selects'
import { TextMedium } from '@/common/components/typography'
import { MemberRoles } from '@/memberships/components/MemberRoles'
import { memberRoleTitle } from '@/memberships/helpers'
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

  const renderSelected = (roles: MemberRole[]) => (
    <Selected>
      {roles.length ? <MemberRoles roles={roles} size="l" max={3} /> : <TextMedium lighter>Select</TextMedium>}
    </Selected>
  )
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
