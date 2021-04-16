import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Column, Row, TemplateBlock } from '../storybookParts/previewStyles'

import * as icons from '.'
import { Icon } from './Icon'
import * as symbols from './symbols'

export default {
  title: 'Common/Icon',
  component: Icon,
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
            if (!iconName.endsWith('Icon') || iconName === 'Icon' || typeof Component === 'function') {
              return
            }

            return (
              <Row key={iconName}>
                {iconName}: {<Component />}
              </Row>
            )
          })}
        </Column>
        <Column>
          <Row>
            <h4>Symbols</h4>
          </Row>
          {Object.entries(symbols).map(([iconName, Component]) => {
            if (!iconName.endsWith('Symbol') || iconName === 'Symbol') {
              return
            }

            return (
              <Row key={iconName}>
                {iconName} : {<Component />}
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
