import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ratioControl, TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { ProgressBar, ProgressBarProps } from '.'

export default {
  title: 'Common/ProgressBar',
  component: ProgressBar,
  argTypes: { start: ratioControl, end: ratioControl },
} as Meta

export const Default: Story<ProgressBarProps> = (value) => (
  <TemplateBlock>
    <ProgressBar {...value} />
    <ProgressBar {...value} size="big" />
  </TemplateBlock>
)
Default.args = {
  start: 0,
  end: 0.3,
}
