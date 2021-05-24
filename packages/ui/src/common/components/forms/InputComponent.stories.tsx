import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalBlock, Row, TemplateBlock } from '../storybookParts/previewStyles'

import { InputComponent, InputComponentProps, InputNumber, InputText } from './InputComponent'

export default {
  title: 'Common/Forms/InputComponent',
  component: InputComponent,
} as Meta

const Template: Story<InputComponentProps> = (args) => (
  <ModalBlock>
    <TemplateBlock>
      <Row>
        <InputComponent {...args}>
          <InputText />
        </InputComponent>
        <InputComponent {...args}>
          <InputNumber />
        </InputComponent>
      </Row>
      <Row>
        <InputComponent {...args} inputSize="l">
          <InputText />
        </InputComponent>
        <InputComponent {...args} inputSize="l">
          <InputNumber />
        </InputComponent>
      </Row>
    </TemplateBlock>
  </ModalBlock>
)

export const InputComponentComponent = Template.bind({})

InputComponentComponent.args = {
  label: 'Label for input',
  required: true,
  validation: undefined,
  disabled: false,
  value: 'Some value',
  copy: true,
  textToCopy: 'Text to copy',
  units: 'units',
  message: 'Some message',
  helperText: 'Helper text, maybe longer',
  helperTitle: 'Helper title',
  helperLinkText: <>Link to show it</>,
  helperLinkURL: 'example.com',
  borderless: false,
}
