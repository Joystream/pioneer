import { Meta, Story } from '@storybook/react'
import React from 'react'

import { randomMarkdown } from '../../../../dev/scripts/generators/utils'

import { RationalePreview } from '.'

export default {
  title: 'Proposals/RationalePreview',
  component: RationalePreview,
} as Meta

export const Default: Story<{ rationale: string }> = ({ rationale }) => <RationalePreview rationale={rationale} />
Default.args = {
  rationale: randomMarkdown(),
}
