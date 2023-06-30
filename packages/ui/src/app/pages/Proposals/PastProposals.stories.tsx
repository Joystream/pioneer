import { linkTo } from '@storybook/addon-links'
import { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { PastProposals } from './PastProposals'

type Args = object
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/PastProposals',
  component: PastProposals,

  parameters: {
    router: {
      href: '/proposals/past',
      actions: {
        '/proposals/current': linkTo('Pages/Proposals/CurrentProposals'),
      },
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}
