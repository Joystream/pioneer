import React, { useEffect, useMemo, useState } from 'react'

import { SimpleSelect, SimpleSelectSizingProps } from '.'
import { DefaultSelectProps, OptionNode } from './types'

export const FilterTextSelect = (
  props: DefaultSelectProps<string, string | null> &
    SimpleSelectSizingProps & { emptyOption?: OptionNode; placeholder?: string }
) => {
  const [search, setSearch] = useState('')
  const options = useMemo(() => {
    if (!search) return props.options
    return props.options.filter((option) => option.toLowerCase().includes(search.toLowerCase()))
  }, [props.options, search])
  useEffect(() => {
    search && setSearch('')
  }, [props.value])

  const { selectSize, emptyOption, placeholder = 'Search...', ...restProps } = props
  return (
    <SimpleSelect
      {...restProps}
      options={options}
      onSearch={setSearch}
      selectSize={selectSize}
      emptyOption={emptyOption}
      placeholder={placeholder}
    />
  )
}
