import { Meta, Story } from '@storybook/react'
import React from 'react'

import {
  socialMediaList,
  SocialMediaTile,
  SocialMediaTileProps,
} from '@/memberships/components/SocialMediaTile/SocialMediaTile'

export default {
  title: 'Member/SocialMediaTile',
  component: SocialMediaTile,
  argTypes: {
    social: {
      options: socialMediaList,
      control: {
        type: 'select',
      },
    },
  },
} as Meta

const Template: Story<SocialMediaTileProps> = (props) => {
  return <SocialMediaTile {...props} />
}

export const Default = Template.bind({})
Default.args = {
  social: 'DISCORD',
}

export const Active = Template.bind({})
Active.args = {
  social: 'DISCORD',
  active: true,
}
