import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { FounderMemberIcon, VerifiedMemberIcon } from '../icons'
import { Column, ModalBlock, Row, TemplateBlock } from '../storybookParts/previewStyles'

import { TogglableIcon } from '.'

export default {
  title: 'Common/TogglableIcon',
  component: TogglableIcon,
} as Meta

type Props = Parameters<typeof TogglableIcon>[0]
const Template: Story<Props> = ({ value, ...props }) => {
  const [v1, setV1] = useState(value)
  const [v2, setV2] = useState(value)

  return (
    <ModalBlock>
      <TemplateBlock>
        <Row>
          <Column>
            <TogglableIcon value={v1} onChange={setV1} {...props}>
              <FounderMemberIcon />
            </TogglableIcon>
          </Column>
          <Column>
            <TogglableIcon value={v2} onChange={setV2} {...props}>
              <VerifiedMemberIcon />
            </TogglableIcon>
          </Column>
        </Row>
      </TemplateBlock>
    </ModalBlock>
  )
}

export const Default = Template
Default.args = { value: false }
