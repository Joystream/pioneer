import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { Dropzone } from '@/common/components/Dropzone'

export default {
  title: 'Common/Dropzone',
  component: Dropzone,
} as Meta

const DropzoneTemplate: Story = (args) => {
  const [, onDrop] = useState<File[]>([])
  return <Dropzone onDrop={(droppedFile) => onDrop(droppedFile)} title={args.title} {...args} />
}

export const Default = DropzoneTemplate.bind({})
Default.args = {
  title: 'Default Title',
}
