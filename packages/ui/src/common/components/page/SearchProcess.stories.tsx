import { Meta, Story } from '@storybook/react'
import React from 'react'

import { SearchingProcessProps, SearchProcess } from './SearchProcess'

export default {
  title: 'Common/SearchProcess',
  component: SearchProcess,
} as Meta

const Template: Story<SearchingProcessProps> = (args) => <SearchProcess {...args} />

export const NotificationComponent = Template.bind({})

NotificationComponent.args = {
  isSearching: true,
  title: 'Searching',
  description: 'We are searching through all past proposals to find what your are looking for.',
}
