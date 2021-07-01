import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ColumnGapBlock } from '../page/PageContent'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { ContextMenu, ContextMenuProps } from '.'

export default {
  title: 'Common/ContextMenu',
  component: ContextMenu,
} as Meta

const Template: Story<ContextMenuProps> = () => {
  return (
    <TemplateBlock>
      <ColumnGapBlock gap={48}>
        <ContextMenu
          items={[
            { text: 'First element', onClick: () => null },
            { text: 'Second element', onClick: () => null },
          ]}
        />
        <ContextMenu
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
