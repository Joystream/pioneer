import { Meta, Story } from '@storybook/react'
import React, { useMemo, useReducer } from 'react'
import { ValidationError } from 'yup'

import { FileInput, FileInputProps } from './FileInput'

export default {
  title: 'Common/Forms/FileInput',
  component: FileInput,
} as Meta

const Template: Story<FileInputProps & { filesAreValid: boolean }> = ({ filesAreValid, ...args }) => {
  const [files, dispatch] = useReducer(
    (files: File[], newFiles: File[]) => (args.multiple ? [...files, ...newFiles] : [newFiles[0]]),
    []
  )
  const value = useMemo(() => files.map((file) => ({ file, errors: filesAreValid ? [] : ERRORS })), [files])

  return <FileInput {...args} value={value} onChange={dispatch} />
}

export const Defaults = Template.bind({})
Defaults.args = {
  title: 'Drag and drop file here to upload',
  accept: 'application/json',
  multiple: false,
  filesAreValid: false,
}
const ERRORS = [new ValidationError('Commodo est officia consequat ex')]
