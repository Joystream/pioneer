import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import EditableInputList, { EditableInputListProps } from '@/common/components/EditableInputList/EditableInputList'

export default {
  title: 'Common/EditableInputList',
  component: EditableInputList,
} as Meta

const Template: Story<EditableInputListProps> = (args) => {
  const [questionFields, addQuestionField] = useState()
  return <EditableInputList {...args} value={questionFields} onChange={addQuestionField} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'Application form',
  buttonText: 'Add Question',
}
