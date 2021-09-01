import { Meta, Story } from '@storybook/react'
import React from 'react'

import { HighlightedText } from './HighlightedText'

export default {
  title: 'Common/Search/HighlightedText',
  component: HighlightedText,
} as Meta

interface Props {
  word: string
  shorten: boolean
  text: string
}
const Template: Story<Props> = ({ word, shorten, text }) => (
  <HighlightedText pattern={word ? RegExp(word, 'ig') : null} shorten={shorten}>
    {text}
  </HighlightedText>
)

export const Default = Template.bind({})
Default.args = {
  word: 'council',
  shorten: true,
  text:
    'The council has a fixed number of seats NUMBER_OF_COUNCIL_SEATS occupied by members, called councilors. The seats are always occupied, allowing the platform to dispose of all proposals they may come in at any time. The council body has two high level states described as follows.',
}
