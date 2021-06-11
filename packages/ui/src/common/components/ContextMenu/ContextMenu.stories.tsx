import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ButtonLink, ButtonPrimary, ButtonSecondary } from '../buttons'
import { ColumnGapBlock } from '../page/PageContent'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { ContextMenu, ContextMenuAlignmentProps, ContextMenuProps } from '.'

export default {
  title: 'Common/ContextMenu',
  component: ContextMenu,
} as Meta

const Template: Story<ContextMenuProps & ContextMenuAlignmentProps> = () => {
  return (
    <TemplateBlock>
      <ColumnGapBlock gap={48}>
        <ContextMenu align="left" items={[]} />
        <ContextMenu align="right" items={[]} />
      </ColumnGapBlock>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})

Default.args = {}
