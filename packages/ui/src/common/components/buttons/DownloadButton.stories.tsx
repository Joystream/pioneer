import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ArrowInsideIcon } from '../icons'
import { Row, TemplateBlock } from '../storybookParts/previewStyles'

import { DownloadLink, DownloadButtonGhost, DownloadLinkProps } from './DownloadButtons'

export default {
  title: 'Common/Buttons/DownloadButtons',
  components: [DownloadLink, DownloadButtonGhost],
} as Meta

const Template: Story<DownloadLinkProps> = (args) => (
  <TemplateBlock>
    <Row>
      <DownloadButtonGhost {...args} size="large">
        <ArrowInsideIcon />
        Large download button
      </DownloadButtonGhost>

      <DownloadButtonGhost {...args} size="large" $square>
        <ArrowInsideIcon />
      </DownloadButtonGhost>

      <DownloadButtonGhost {...args} size="medium">
        <ArrowInsideIcon />
        Medium download button
      </DownloadButtonGhost>

      <DownloadButtonGhost {...args} size="medium" $square>
        <ArrowInsideIcon />
      </DownloadButtonGhost>

      <DownloadButtonGhost {...args} size="small">
        <ArrowInsideIcon />
        Small download button
      </DownloadButtonGhost>

      <DownloadButtonGhost {...args} size="small" $square>
        <ArrowInsideIcon />
      </DownloadButtonGhost>
    </Row>
    <Row>
      <DownloadLink {...args}>
        <ArrowInsideIcon /> Not styled Download link
      </DownloadLink>
    </Row>
  </TemplateBlock>
)

export const Defaults = Template.bind({})

Defaults.args = {
  name: 'lorem ipsum.json',
  parts: [JSON.stringify({ foo: 'Mollit elit cupidatat velit adipisicing anim aliquip quis deserunt.' })],
}
