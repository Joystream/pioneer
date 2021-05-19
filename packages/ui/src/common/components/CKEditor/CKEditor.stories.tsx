import { Meta, Story } from '@storybook/react'
import React from 'react'

import { info } from '@/common/logger'

import { TemplateBlock } from '../storybookParts/previewStyles'

import { CKEditor, CKEditorProps } from './CKEditor'

export default {
  title: 'Common/CKEditor',
  component: CKEditor,
} as Meta

const Template: Story<CKEditorProps> = (args) => (
  <TemplateBlock>
    <CKEditor {...args} />
  </TemplateBlock>
)

export const ClassicEditor = Template.bind({})

ClassicEditor.args = {
  onChange: (event, editor) => info(editor.getData()),
}
