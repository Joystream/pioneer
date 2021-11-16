import { Meta, Story } from '@storybook/react'
import React from 'react'

import { FileInput, FileInputProps } from './FileInput'

export default {
  title: 'Common/Forms/FileInput',
  component: FileInput,
  argTypes: {
    onChange: { action: 'Change' },
  },
} as Meta

const Template: Story<FileInputProps> = (args) => <FileInput {...args} />

export const Defaults = Template.bind({})
Defaults.args = {
  title: 'You can drag and drop files here !',
  multiple: false,
}
