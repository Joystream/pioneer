import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'

import { Pagination } from './Pagination'

export default {
  title: 'Common/Pagination',
  component: Pagination,
} as Meta

const Template: Story = () => (
  <TemplateBlock>
    <Pagination pageCount={10} handlePageChange={(page) => console.log(page)} />
  </TemplateBlock>
)

export const Default = Template.bind({})
