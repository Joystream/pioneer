import { Meta, Story } from '@storybook/react'
import React from 'react'

import { info } from '@/common/logger'

import { InputComponent } from '../forms'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { CKEditor, CKEditorProps } from './CKEditor'

export default {
  title: 'Common/Forms/CKEditor',
  component: CKEditor,
} as Meta

const Template: Story<CKEditorProps> = (args) => (
  <TemplateBlock>
    <CKEditor {...args} />
    <InputComponent label="Inside InputComponent" inputSize="auto">
      <CKEditor {...args} />
    </InputComponent>
  </TemplateBlock>
)

export const ClassicEditor = Template.bind({})

ClassicEditor.args = {
  onChange: (event, editor) => info(editor.getData()),
}
