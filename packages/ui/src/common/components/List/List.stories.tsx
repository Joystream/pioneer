import { Meta, Story } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { TemplateBlock } from '../storybookParts/previewStyles'

import { List, ListItem, TableListItem } from '.'

export default {
  title: 'Common/List',
  component: List,
} as Meta

const Template: Story = (props) => {
  return (
    <TemplateBlock>
      <List {...props} />
    </TemplateBlock>
  )
}
const InnerWrapper = styled.div`
  width: 100%;
  min-height: 94px;
  padding: 1em;
`

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <ListItem>
        <InnerWrapper>Foo</InnerWrapper>
      </ListItem>
      <ListItem>
        <InnerWrapper>Bar</InnerWrapper>
      </ListItem>
      <ListItem>
        <InnerWrapper>Baz</InnerWrapper>
      </ListItem>
    </>
  ),
}

export const Table = Template.bind({})
Table.args = {
  children: (
    <>
      <TableListItem $colLayout={'100px 100px 100px'}>
        <div>Foo</div>
        <div>Bar</div>
        <div>Baz</div>
      </TableListItem>
      <TableListItem $colLayout={'100px 100px 100px'}>
        <div>Qux</div>
        <div>Quux</div>
        <div>Quuz</div>
      </TableListItem>
    </>
  ),
}
