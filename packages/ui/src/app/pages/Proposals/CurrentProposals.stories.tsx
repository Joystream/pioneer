import { linkTo } from '@storybook/addon-links'
import { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'

import { Proposals } from './Proposals'

type Args = object
type Story = StoryObj<FC<Args>>

export default {
  title: 'Pages/Proposals/CurrentProposals',
  component: Proposals,

  parameters: {
    router: {
      href: '/proposals/current',
      actions: {
        '/proposals/past': linkTo('Pages/Proposals/PastProposals'),
      },
    },
  },
} satisfies Meta<Args>

export const Default: Story = {}
