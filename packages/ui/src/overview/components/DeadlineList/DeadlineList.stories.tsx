import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { DeadlineList, DeadlineListProps } from '@/overview/components/DeadlineList/DeadlineList'

export default {
  title: 'Overview/DeadlineList',
  component: DeadlineList,
} as Meta

const Template: Story<DeadlineListProps> = (args) => {
  return (
    <TemplateBlock>
      <DeadlineList {...args} />
    </TemplateBlock>
  )
}
export const Default = Template.bind({})
Default.args = {}
