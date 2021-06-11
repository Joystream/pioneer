import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { Row, TemplateBlock } from '../storybookParts/previewStyles'

import { FilterSelect, SimpleSelect } from '.'

export default {
  title: 'Common/Forms/Select',
  subcomponents: { SimpleSelect, FilterSelect },
} as Meta

const Template: Story<{ values: string[] }> = ({ values }) => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <TemplateBlock>
      <Row wide>
        <SimpleSelect title="Simple Select" values={values} value={value} onChange={setValue} />
      </Row>
      <Row wide>
        <SimpleSelect title="Simple Select" values={values} value={value} onChange={setValue} selectSize="m" />
      </Row>
      <Row wide>
        <SimpleSelect title="Simple Select" values={values} value={value} onChange={setValue} selectSize="l" />
      </Row>
      <Row wide>
        <FilterSelect title="Filter Select" values={values} value={value} onChange={setValue} />
      </Row>
      <Row wide>
        <FilterSelect title="Filter Select" values={values} value={value} onChange={setValue} selectSize="m" />
      </Row>
      <Row wide>
        <FilterSelect title="Filter Select" values={values} value={value} onChange={setValue} selectSize="l" />
      </Row>
    </TemplateBlock>
  )
}

export const Default = Template
Default.args = { values: ['sunt', 'irure', 'cillum', 'labore'] }
