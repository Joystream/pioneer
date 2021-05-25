import { Meta, Story } from '@storybook/react'
import React from 'react'

import { CopyComponent, CopyComponentProps } from './CopyComponent'
import { Row, Column, TemplateBlock } from './storybookParts/previewStyles'

export default {
  title: 'Common/Buttons/CopyComponent',
  component: CopyComponent,
} as Meta

const Template: Story<CopyComponentProps> = () => (
  <TemplateBlock>
    <Column>
      <Row>
        <CopyComponent copyText="This text will be copied" />
      </Row>
      <Row>
        <CopyComponent altText="This won't, will be copied another" copyText="I'm another text to copy" />
      </Row>
      <Row>
        <CopyComponent altText="With error if no text" />
      </Row>
      <Row>
        <CopyComponent copyText="I'm disabled" disabled />
      </Row>
    </Column>
    <Column>
      <label>
        Input for testing {'-> '}
        <input type="text" />
      </label>
    </Column>
  </TemplateBlock>
)

export const CopyComponentView = Template.bind({})
