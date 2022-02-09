import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'

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
  <MockApolloProvider members proposals workers workingGroups forum>
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
  onChange: (_, editor) => action('onChange')(editor.getData()),
}

InlineEditor.args = {
  inline: true,
}
