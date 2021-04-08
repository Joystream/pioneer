import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Column, Row, TemplateBlock } from '../storybookParts/previewStyles'

import { Checkbox, CheckboxProps } from './Checkbox'

export default {
  title: 'Common/Checkbox',
  component: Checkbox,
} as Meta

const Template: Story<CheckboxProps> = (args) => (
  <TemplateBlock>
    <Column>
      <Row>
        Default
        <Checkbox {...args} id="id0" />
      </Row>
      <Row>
        Disabled
        <Checkbox {...args} id="id1" enabled={false} />
      </Row>
      <Row>
        Checked
        <Checkbox {...args} id="id2" isChecked />
      </Row>
    </Column>
  </TemplateBlock>
)

export const CheckboxComponent = Template.bind({})
