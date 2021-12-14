import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { ProgressBarWithRange, ProgressBarWithRangeProps } from '.'

export default {
  title: 'Common/ProgressBarWithRange',
  component: ProgressBarWithRange,
} as Meta

export const Default: Story<ProgressBarWithRangeProps> = (value) => (
  <TemplateBlock>
    <ProgressBarWithRange {...value} />
  </TemplateBlock>
)
Default.args = {
  value: 1000,
  minRange: 1200,
  maxRange: 1500,
}
