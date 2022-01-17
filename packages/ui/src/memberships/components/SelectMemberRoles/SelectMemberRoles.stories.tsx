import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { ModalBlock } from '@/common/components/storybookParts/previewStyles'
import { MemberRole } from '@/memberships/types'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { SelectMemberRoles } from '.'

export default {
  title: 'Member/SelectMemberRoles',
  component: SelectMemberRoles,
  argTypes: {
    onApply: { action: 'Apply' },
  },
} as Meta

export const Default: Story = ({ onApply }) => {
  const [value, setValue] = useState<MemberRole[]>([])

  const apply = () => onApply(value)
  const clear = () => setValue([])

  return (
    <MockApolloProvider workingGroups>
      <ModalBlock>
        <SelectMemberRoles value={value} onChange={setValue} onApply={apply} onClear={clear} />
      </ModalBlock>
    </MockApolloProvider>
  )
}
