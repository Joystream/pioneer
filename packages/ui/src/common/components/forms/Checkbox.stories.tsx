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
        Enabled = false
        <Checkbox {...args} id="id1" enabled={false} />
      </Row>
      <Row>
        Checked
        <Checkbox {...args} id="id2" isChecked />
      </Row>
      <Row>
        Checked = true
        <Checkbox {...args} id="id3" isChecked={true} />
      </Row>
      <Row>
        Checked = false
        <Checkbox {...args} id="id4" isChecked={false} />
      </Row>
      <Row>
        Checked = undefined
        <Checkbox {...args} id="id5" isChecked={undefined} />
      </Row>
      <Row>
        Required
        <Checkbox {...args} id="id6" isRequired />
      </Row>
      <Row>
        Required = true
        <Checkbox {...args} id="id7" isRequired={true} />
      </Row>
      <Row>
        Required = false
        <Checkbox {...args} id="id9" isRequired={false} />
      </Row>
      <Row>
        Required = undefined
        <Checkbox {...args} id="id9" isRequired={undefined} />
      </Row>
    </Column>
  </TemplateBlock>
)

export const CheckboxComponent = Template.bind({})
