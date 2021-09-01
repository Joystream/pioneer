import { Meta, Story } from '@storybook/react'
import React from 'react'

import { HighlightedText } from './HighlightedText'

export default {
  title: 'Common/Search/HighlightedText',
  component: HighlightedText,
} as Meta

const Template: Story<{ word: string; text: string }> = ({ word, text }) => (
  <HighlightedText pattern={RegExp(word, 'ig')}>{text}</HighlightedText>
)

export const Default = Template.bind({})
Default.args = {
  word: 'council',
  text: '...the council has a fixed number of seats NUMBER_OF_COUNCIL_SEATS occupied by members,…',
}
