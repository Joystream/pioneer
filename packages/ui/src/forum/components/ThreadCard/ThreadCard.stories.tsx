import { Meta } from '@storybook/react'
import React from 'react'

import { ThreadCard } from '@/forum/components/ThreadCard/ThreadCard'

export default {
  title: 'Forum/Facelift/ThreadCard',
  component: ThreadCard,
} as Meta

export const Default = () => <ThreadCard />
