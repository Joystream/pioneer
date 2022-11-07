import { Meta, Story } from '@storybook/react'
import React from 'react'

import { CategoryCard, CategoryCardProps } from '@/forum/components/CategoryCard/CategoryCard'
import { CategoryStatus } from '@/forum/types'
import { getMember } from '@/mocks/helpers'

export default {
  title: 'Forum/Categories/CategoryCard',
  component: CategoryCard,
} as Meta

interface Props {
  category: Omit<CategoryCardProps['category'], 'id' | 'status' | 'moderators' | 'subcategories'>
  subcategories: string[]
  archivedStyles: boolean
}

const Template: Story<Props> = (args) => {
  return (
    <div style={{ height: '540px' }}>
      <CategoryCard
        category={{
          ...args.category,
          id: '12',
          status: 'CategoryStatusActive' as unknown as CategoryStatus,
          subcategories: args.subcategories.map((title, id) => ({
            id: title + id,
            title,
            status: 'CategoryStatusActive',
          })),
          moderators: [getMember('alice')],
        }}
        archivedStyles={args.archivedStyles}
      />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  category: {
    title: 'Discussions',
    description: 'This category contains different kinds of discussions: general, meta, media, off-topic...',
  },
  subcategories: ['topic A', 'topic B', 'topic C'],
  archivedStyles: false,
}
