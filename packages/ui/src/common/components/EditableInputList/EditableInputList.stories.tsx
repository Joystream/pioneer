import { Meta, Story } from '@storybook/react'
import React from 'react'

import EditableInputList, { EditableInputListProps } from '@/common/components/EditableInputList/EditableInputList'

export default {
  title: 'Common/EditableInputList',
  component: EditableInputList,
} as Meta

const Template: Story<EditableInputListProps> = (args) => {
  return <EditableInputList {...args} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'Application form',
  buttonText: 'Add Question',
}
