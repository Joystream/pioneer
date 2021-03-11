import React from 'react'
import { BaseMember } from '../../../common/types'
import { Option, OptionSectionHeader, OptionsListComponent } from '../../selects'
import { Text } from '../../typography'
import { OptionMember } from './OptionMember'

interface Props {
  myMembers: BaseMember[]
  allMembers: BaseMember[]
  onChange: (option: BaseMember) => void
}

export const OptionsListMember = React.memo(({ myMembers, allMembers, onChange }: Props) => (
  <OptionsListComponent>
    {!!myMembers.length && (
      <OptionSectionHeader>
        <Text>Your memberships</Text>
      </OptionSectionHeader>
    )}

    {myMembers.map((option) => (
      <Option key={option.handle} onClick={() => onChange(option)}>
        <OptionMember member={option} />
      </Option>
    ))}

    {!!allMembers.length && (
      <OptionSectionHeader key="$$all-memberships">
        <Text>All memberships</Text>
      </OptionSectionHeader>
    )}

    {allMembers.map((option) => (
      <Option key={option.handle} onClick={() => onChange(option)}>
        <OptionMember member={option} />
      </Option>
    ))}
  </OptionsListComponent>
))
