import { Meta, Story } from '@storybook/react'
import React from 'react'

import { randomMarkdown } from '../../../../dev/query-node-mocks/generators/utils'

import { RationalePreview } from '.'

export default {
  title: 'Proposals/ProposalPreview/RationalePreview',
  component: RationalePreview,
} as Meta

export const Default: Story<{ rationale: string }> = ({ rationale }) => <RationalePreview rationale={rationale} />
Default.args = {
  rationale: randomMarkdown(),
}
