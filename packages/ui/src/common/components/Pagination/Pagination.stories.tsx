import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { info } from '@/common/logger'

import { Pagination } from './Pagination'

export default {
  title: 'Common/Pagination',
  component: Pagination,
} as Meta

const Template: Story = () => (
  <TemplateBlock>
    <Pagination pageCount={10} handlePageChange={(page) => info(page)} />
  </TemplateBlock>
)

export const Default = Template.bind({})
