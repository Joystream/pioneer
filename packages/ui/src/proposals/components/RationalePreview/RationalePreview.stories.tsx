import { Meta } from '@storybook/react'

import { randomMarkdown } from '../../../../dev/query-node-mocks/generators/utils'

import { RationalePreview } from '.'

export default {
  title: 'Pages/Proposals/ProposalPreview/Components/RationalePreview',
  component: RationalePreview,
} as Meta

export const Default = {
  name: 'RationalePreview',
  args: { rationale: randomMarkdown() },
}
