import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ModalBlock, ScrollBlock, TemplateBlock } from '../storybookParts/previewStyles'

import { SimpleSelect, FilterSelect, MultiSelect } from '.'

export default {
  title: 'Common/Forms/Select',
  subcomponents: { SimpleSelect, FilterSelect, MultiSelect },
  argTypes: {
    onApply: { action: 'Apply' },
  },
}

interface Props {
  optionsString: string
  onApply: (value: string[]) => void
}

export const Default = {
  args: {
    optionsString: 'sunt irure cillum labore pariatur commodo tempor excepteur',
  },

  render: ({ optionsString = '', onApply }: Props) => {
    const options = (optionsString || '').split(' ')
    const [value, setValue] = useState<string | null>(null)

    // Search Select
    const [search, setSearch] = useState('')
    const result = useMemo(() => {
      const pattern = RegExp(search)
      return options.filter((option) => pattern.test(option))
    }, [search, options])

    // Multi Select
    const [multi, setMulti] = useState<string[]>([])

    return (
      <ScrollBlock>
        <ModalBlock>
          <TemplateBlock>
            <Row>
              <SimpleSelect title="Simple Select" options={options} value={value} onChange={setValue} />
            </Row>
            <Row>
              <SimpleSelect title="Simple Select" options={options} value={value} onChange={setValue} selectSize="m" />
            </Row>
            <Row>
              <SimpleSelect title="Simple Select" options={options} value={value} onChange={setValue} selectSize="l" />
            </Row>
            <Row>
              <FilterSelect title="Filter Select" options={options} value={value} onChange={setValue} />
            </Row>
            <Row>
              <FilterSelect title="Filter Select" options={options} value={value} onChange={setValue} />
            </Row>
            <Row>
              <FilterSelect title="Filter Select" options={options} value={value} onChange={setValue} />
            </Row>
            <Row>
              <SimpleSelect
                title="Search Select"
                options={result}
                value={value}
                onChange={setValue}
                onSearch={setSearch}
              />
            </Row>
            <Row>
              <MultiSelect title="Multi Select" options={options} value={multi} onChange={setMulti} onApply={onApply} />
            </Row>
          </TemplateBlock>
        </ModalBlock>
      </ScrollBlock>
    )
  },
}

const Row = styled.div`
  display: flex;
  gap: 8px;
`
