import { Meta, Story } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { TemplateBlock } from '../storybookParts/previewStyles'

import { List, ListItem } from '.'

export default {
  title: 'Common/List',
  component: List,
} as Meta

const Template: Story = () => {
  return (
    <TemplateBlock>
      <List>
        <ListItem>
          <InnerWrapper>Foo</InnerWrapper>
        </ListItem>
        <ListItem>
          <InnerWrapper>Bar</InnerWrapper>
        </ListItem>
        <ListItem>
          <InnerWrapper>Baz</InnerWrapper>
        </ListItem>
      </List>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})

const InnerWrapper = styled.div`
  width: 100%;
  min-height: 94px;
  padding: 1em;
`
