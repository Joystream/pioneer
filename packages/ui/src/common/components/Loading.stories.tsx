import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Loading } from './Loading'

export default {
  title: 'Common/Loading',
  component: Loading,
} as Meta

const Template: Story = () => <Loading />

export const LoadingComponent = Template.bind({})
