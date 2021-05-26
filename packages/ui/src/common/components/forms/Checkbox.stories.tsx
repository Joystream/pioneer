import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Column, Row, TemplateBlock } from '../storybookParts/previewStyles'

import { Checkbox, CheckboxProps } from './Checkbox'

export default {
  title: 'Common/Forms/Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<CheckboxProps> = (args) => (
  <TemplateBlock>
    <Column>
      <Row>
        <Checkbox {...args} id="id0">
          Something here (Default)
        </Checkbox>
      </Row>
      <Row>
        <Checkbox {...args} id="id1" enabled={false}>
          Something here (Disabled)
        </Checkbox>
      </Row>
      <Row>
        <Checkbox {...args} id="id2" isChecked enabled={false}>
          Something here (Checked)
        </Checkbox>
      </Row>
    </Column>
  </TemplateBlock>
)

export const CheckboxComponent = Template.bind({})
