import { Meta, Story } from '@storybook/react'
import React from 'react'

import { info } from '@/common/logger'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { InputComponent } from '../forms'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { CKEditor, CKEditorProps } from './CKEditor'

export default {
  title: 'Common/Forms/CKEditor',
  component: CKEditor,
  argTypes: {
    minRows: { control: { type: 'range', min: 1, max: 30 } },
    maxRows: { control: { type: 'range', min: 1, max: 30 } },
  },
} as Meta

const Template: Story<CKEditorProps> = (args) => (
  <MockApolloProvider members>
    <TemplateBlock>
      <CKEditor {...args} />
      <InputComponent label="Inside InputComponent" inputSize="auto">
        <CKEditor {...args} />
      </InputComponent>
    </TemplateBlock>
  </MockApolloProvider>
)

export const ClassicEditor = Template.bind({})

export const InlineEditor = Template.bind({})

ClassicEditor.args = {
  minRows: 8,
  maxRows: 20,
  onChange: (event, editor) => info(editor.getData()),
}

InlineEditor.args = {
  inline: true,
}
