import { Meta } from '@storybook/react'
import React from 'react'

import { CategoryCard } from '@/forum/components/CategoryCard/CategoryCard'

export default {
  title: 'Forum/Facelift/CategoryCard',
  component: CategoryCard,
} as Meta

export const Default = () => <CategoryCard />
