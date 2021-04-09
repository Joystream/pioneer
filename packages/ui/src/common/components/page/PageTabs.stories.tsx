import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { TemplateBlock } from '../storybookParts/previewStyles'

import { PageTabsNav, Tabs, TabsSize } from './PageTabs'

export default {
  title: 'Common/Tabs',
  component: Tabs,
} as Meta

const Template: Story<TabsSize> = (args) => {
  const [isFirstActive, setFirstActive] = useState(true)
  return (
    <TemplateBlock>
      Tabs size: xs or s
      <PageTabsNav {...args}>
        <Tabs
          tabs={[
            { inner: 'Active tab', active: isFirstActive, onClick: () => setFirstActive(true) },
            { inner: 'Inactive tab', active: !isFirstActive, onClick: () => setFirstActive(false) },
          ]}
        />
      </PageTabsNav>
    </TemplateBlock>
  )
}

export const TabsNavComponent = Template.bind({})

TabsNavComponent.args = {
  tabsSize: 's',
}
