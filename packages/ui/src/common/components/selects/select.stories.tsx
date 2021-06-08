import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import { Column, ModalBlock, Row } from '../storybookParts/previewStyles'

import { SimpleSelect, FilterSelect } from '.'

export default {
  title: 'Common/Forms/Select',
  subcomponents: { SimpleSelect, FilterSelect },
} as Meta

const Template: Story<{ values: string[] }> = ({ values }) => {
  const [value, setValue] = useState<string | null>(null)
  return (
    <ModalBlock>
      <Row>
        <Column>
          <SimpleSelect title="Simple Select" values={values} value={value} onChange={setValue} />
        </Column>
        <Column>
          <FilterSelect title="Filter Select" values={values} value={value} onChange={setValue} />
        </Column>
      </Row>
    </ModalBlock>
  )
}

export const Default = Template
Default.args = { values: ['sunt', 'irure', 'cillum', 'labore'] }
