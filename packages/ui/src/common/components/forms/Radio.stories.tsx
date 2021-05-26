import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Column, Row, TemplateBlock } from '../storybookParts/previewStyles'

import { Radio, RadioProps } from './Radio'

export default {
  title: 'Common/Forms/Radio',
  component: Radio,
} as Meta

const Template: Story<RadioProps> = (args) => (
  <TemplateBlock>
    <Column>
      <Row>
        <Radio {...args} id="Story2" name="Stories" enabled={false} isChecked={false}>
          Something here (Disabled)
        </Radio>
      </Row>
      <Row>
        <Radio {...args} id="Story3" name="Stories" isChecked={true} enabled={false}>
          Something here (Checked)
        </Radio>
      </Row>
      <Row>
        <Radio {...args} id="Story1" name="Stories" isChecked={false} enabled={true}>
          Something here (Default)
        </Radio>
      </Row>
    </Column>
  </TemplateBlock>
)

export const RadioComponent = Template.bind({})
