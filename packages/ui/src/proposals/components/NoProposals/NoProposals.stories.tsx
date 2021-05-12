import { Meta, Story } from '@storybook/react'
import React from 'react'

import { FullHeightGrid } from '@/common/components/storybookParts/previewStyles'

import { NoProposals } from './NoProposals'

export default {
  title: 'Proposals/NoProposals',
  component: NoProposals,
} as Meta

const Template: Story = () => (
  <FullHeightGrid>
    <NoProposals />
  </FullHeightGrid>
)

export const Default = Template.bind({})
