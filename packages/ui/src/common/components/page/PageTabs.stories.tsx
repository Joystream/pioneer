import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { PageTabs, PageTabsProps } from './PageTabs'

export default {
  title: 'Common/PageTabs',
  component: PageTabs,
} as Meta

const Template: Story<PageTabsProps> = (args) => {
  const [which, setWhich] = useState(0)
  const handleClick = (which: number) => () => setWhich(which)

  args.tabs = args.tabs.map((tabArg, index) => ({
    ...tabArg,
    active: index === which,
    onClick: handleClick(index),
  }))

  return <PageTabs {...args} />
}

export const Default = Template.bind({})
Default.args = {
  tabs: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'].map((title) => ({
    title,
    active: false,
    onClick: () => undefined,
  })),
}
