import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { TemplateBlock } from './storybookParts/previewStyles'
import { Tabs, TabsProps } from './Tabs'

export default {
  title: 'Common/Tabs',
  component: Tabs,
} as Meta

const Template: Story<TabsProps> = (args) => {
  const [which, setWhich] = useState(0)
  const handleClick = (which: number) => () => setWhich(which)

  args.tabs = args.tabs.map((tabArg, index) => ({
    ...tabArg,
    active: index === which,
    onClick: handleClick(index),
  }))

  return (
    <TemplateBlock>
      <h2>S</h2>
      <Tabs {...args} tabsSize="s" />

      <h2>XS</h2>
      <Tabs {...args} tabsSize="xs" />
    </TemplateBlock>
  )
}

export const Default = Template.bind({})

Default.args = {
  tabs: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'].map((title) => ({
    title,
    active: false,
    onClick: () => undefined,
  })),
}

export const WithCount = Template.bind({})

WithCount.args = {
  tabs: ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'].map((title, index) => ({
    title,
    active: false,
    onClick: () => undefined,
    count: index,
  })),
}
