import { Meta, Story } from '@storybook/react'
import React from 'react'

import { RowGapBlock } from '../page/PageContent'
import { ScrollBlock, TemplateBlock } from '../storybookParts/previewStyles'

import { MarkdownPreview, MarkdownPreviewProps } from './MarkdownPreview'

export default {
  title: 'Common/MarkdownPreview',
  component: MarkdownPreview,
} as Meta

const Template: Story<MarkdownPreviewProps> = (args) => (
  <ScrollBlock>
    <TemplateBlock>
      <RowGapBlock gap={16}>
        <h4>Welcome</h4>
        <MarkdownPreview {...args} />
      </RowGapBlock>
    </TemplateBlock>
  </ScrollBlock>
)

export const MarkdownPreviewStory = Template.bind({})

MarkdownPreviewStory.args = {
  markdown: `# Header h1 (big)

Paragraph big.

Will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.

## Header h2 (medium)

Paragraph big.

Will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.

### Header h3 (small)

Paragraph big.

Will one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.

#### Header h4

##### Header h5

###### Header h6

A paragraph with [Text in link](example.com "Titletext").

A paragraph mentioning a [@member](#mention?member-id=0)

UL

*   The maximum review period for this opening is 99,999 blocks (approximately 6 days, 23 hours).
*   Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.
*   Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.

OL

1.  The maximum review period for this opening is 99,999 blocks (approximately 6 days, 23 hours).
2.  Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.
3.  Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.

A paragraph with an inline \`CodeElement\` should be \`<code />\`.

\`\`\`
# Install rust toolchain
./setup.sh

# Install
npm package dependencies

# Also good habit to run this when switching between branches

yarn install
\`\`\``,
}
