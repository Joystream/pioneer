import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Column, Row, TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import * as icons from '.'

export default {
  title: 'Common/icons/sidebar',
} as Meta

const Template: Story = () => (
  <>
    <TemplateBlock>
      <Row>
        <Column>
          <Row>
            <h4>Icons</h4>
          </Row>
          {Object.entries(icons).map(([iconName, Component]) => {
            return (
              <Row key={iconName}>
                {iconName}: {<Component />}
              </Row>
            )
          })}
        </Column>
      </Row>
    </TemplateBlock>
  </>
)

export const Default = Template.bind({})
Default.args = {}
