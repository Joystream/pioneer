import { Meta, Story } from '@storybook/react'
import { BN } from 'bn.js'
import React from 'react'

import { Row, Column, TemplateBlock } from '../storybookParts/previewStyles'

import { TokenValue } from './TokenValue'

export default {
  title: 'Common/TokenValue',
  component: TokenValue,
} as Meta

const Template: Story<{ value: string; isLoading: boolean }> = ({ value, isLoading }) => {
  const input = new BN(value)

  return (
    <TemplateBlock>
      <Column>
        <Row>
          <TokenValue value={input} isLoading={isLoading} size="s" />
        </Row>
        <Row>
          <TokenValue value={input} isLoading={isLoading} size="m" />
        </Row>
        <Row>
          <TokenValue value={input} isLoading={isLoading} size="l" />
        </Row>
      </Column>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: '1 000 000 0000000000',
  isLoading: false,
}
