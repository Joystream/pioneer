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
  markdown:
    '# Header h1 (big)\nParagraph big.\nWill one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.\n## Header h2 (medium)\nParagraph big.\nWill one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.\n### Header h3 (small)\nParagraph big.\nWill one day be essential for ensuring that the petabytes of media items uploaded to Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet allows this content monitoring to take place by giving users who are selected for the role administrative access to the Joystream content directory to make changes where necessary.\n#### Header h4\n##### Header h5\n###### Header h6 \n [Text in link](example.com "Titletext") \n \n UL\n *   The maximum review period for this opening is 99,999 blocks (approximately 6 days, 23 hours).\n*   Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.\n*   Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. \n \n OL \n \n 1.  The maximum review period for this opening is 99,999 blocks (approximately 6 days, 23 hours).\n2.  Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.\n3.  Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role.Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. Visit our GitHub repository to find out more about the technical requirements needed to participate in this role. \n \n `# Install rust toolchain ./setup.sh # Install npm package dependencies # Also good habit to run this when switching between branches yarn install`',
}
