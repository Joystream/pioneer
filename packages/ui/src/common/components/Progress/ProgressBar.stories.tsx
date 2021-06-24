import { Meta, Story } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { ratioControl, TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { NumberRange, ProgressBar } from '.'

export default {
  title: 'Common/ProgressBar',
  component: ProgressBar,
  argTypes: { start: ratioControl, end: ratioControl },
} as Meta

export const Default: Story<NumberRange> = (value) => (
  <TemplateBlock>
    <ProgressBar {...value} />
    <BiggerProgressBar {...value} />
  </TemplateBlock>
)
Default.args = {
  start: 0,
  end: 0.3,
}

const BiggerProgressBar = styled(ProgressBar)`
  height: 20px;
`
