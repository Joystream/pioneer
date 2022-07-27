import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalBlock, Row, TemplateBlock } from '../storybookParts/previewStyles'

import { InputComponent, InputComponentProps, TokenInput, InputText, InputNumber } from '.'

export default {
  title: 'Common/Forms/InputComponent',
  component: InputComponent,
} as Meta

const Template: Story<InputComponentProps> = ({ units, ...args }) => (
  <ModalBlock>
    <TemplateBlock>
      <Row>
        <InputComponent {...args}>
          <InputText />
        </InputComponent>
        <InputComponent {...args} label="Number input" units={units}>
          <InputNumber />
        </InputComponent>
        <InputComponent {...args} label="Joy input" units="JOY">
          <TokenInput />
        </InputComponent>
      </Row>
      <Row>
        <InputComponent {...args} inputSize="l">
          <InputText />
        </InputComponent>
        <InputComponent {...args} label="Number input" units={units} inputSize="l">
          <InputNumber />
        </InputComponent>
        <InputComponent {...args} label="Joy input" inputSize="l" units="JOY">
          <TokenInput />
        </InputComponent>
      </Row>
    </TemplateBlock>
  </ModalBlock>
)

export const InputComponentComponent = Template.bind({})

InputComponentComponent.args = {
  label: 'Text input label',
  required: true,
  validation: undefined,
  disabled: false,
  value: 'Some value',
  copy: true,
  textToCopy: 'Text to copy',
  units: 'units',
  message: 'Some message',
  tooltipText: 'Helper text, maybe longer',
  tooltipTitle: 'Helper title',
  tooltipLinkText: <>Link to show it</>,
  tooltipLinkURL: 'example.com',
  borderless: false,
}
