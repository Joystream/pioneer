import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { Row, TemplateBlock } from '@/common/components/storybookParts/previewStyles'
import { TextMedium } from '@/common/components/typography'

import { RangeSlider } from './RangeSlider'

export default {
  title: 'Common/Sliders',
  subcomponents: { RangeSlider },
} as Meta

const LAST_BLOCK = 1135444

const Template: Story = () => {
  const [value, setValue] = useState({ start: 0, end: LAST_BLOCK })
  return (
    <TemplateBlock>
      <RangeSlider max={LAST_BLOCK} value={value} handleGap={15000} onChange={setValue} />
      <Row>
        <h5>Results:</h5>
        <TextMedium>
          <code>start</code> is <var>{value.start}</var> and <code>end</code> is <var>{value.end}</var>
        </TextMedium>
      </Row>
    </TemplateBlock>
  )
}

export const Default = Template.bind({})
