import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { InputComponent } from '@/common/components/forms'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { WorkingGroup } from '@/working-groups/types'

import { SelectWorkingGroup } from '.'

export default {
  title: 'WorkingGroup/SelectWorkingGroup',
  component: SelectWorkingGroup,
} as Meta

export const Default: Story = () => {
  const [selected, setSelected] = useState<WorkingGroup>()

  return (
    <MockApolloProvider members workingGroups>
      <InputComponent
        label="Working Group select"
        tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        required
        inputSize="l"
      >
        <SelectWorkingGroup selectedGroupId={selected?.id} onChange={setSelected} />
      </InputComponent>
    </MockApolloProvider>
  )
}
