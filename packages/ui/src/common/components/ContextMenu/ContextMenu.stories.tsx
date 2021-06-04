import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ButtonLink, ButtonPrimary, ButtonSecondary } from '../buttons'
import { ColumnGapBlock } from '../page/PageContent'
import { TemplateBlock } from '../storybookParts/previewStyles'

import { ContextMenu, ContextMenuAlignMentProps, ContextMenuProps } from '.'

export default {
  title: 'Common/ContextMenu',
  component: ContextMenu,
} as Meta

const Template: Story<ContextMenuProps & ContextMenuAlignMentProps> = () => {
  return (
    <TemplateBlock>
      <ColumnGapBlock gap={48}>
        <ContextMenu align="left">
          <ButtonLink size="small" bold borderless>
            Option 1
          </ButtonLink>
          <ButtonSecondary size="medium">Option 2</ButtonSecondary>
          <ButtonPrimary size="large">Option 3</ButtonPrimary>
        </ContextMenu>
        <ContextMenu align="right">
          <ButtonLink size="small" bold borderless>
            Option 1
          </ButtonLink>
          <ButtonSecondary size="medium">Option 2</ButtonSecondary>
          <ButtonPrimary size="large">Option 3</ButtonPrimary>
        </ContextMenu>
      </ColumnGapBlock>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})

Default.args = {}
