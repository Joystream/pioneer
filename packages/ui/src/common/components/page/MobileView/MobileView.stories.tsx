import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MobileView } from '@/common/components/page/MobileView/MobileView'

export default {
  title: 'Common/MobileView',
  component: MobileView,
} as Meta

const Template: Story = () => <MobileView />

export const MobileViewComponent = Template.bind({})
