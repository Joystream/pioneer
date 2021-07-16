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

ClassicEditor.args = {
  onChange: (event, editor) => info(editor.getData()),
}
