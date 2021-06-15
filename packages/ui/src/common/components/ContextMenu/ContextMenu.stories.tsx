import { Meta, Story } from '@storybook/react'
import React from 'react'

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
        <ContextMenu
          align="left"
          items={[
            { text: 'First element', onClick: () => null },
            { text: 'Second element', onClick: () => null },
          ]}
        />
        <ContextMenu
          align="right"
          items={[
            { text: 'First element', onClick: () => null },
            { text: 'Second element', onClick: () => null },
            { text: 'Third element', onClick: () => null },
          ]}
        />
      </ColumnGapBlock>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})

Default.args = {}
