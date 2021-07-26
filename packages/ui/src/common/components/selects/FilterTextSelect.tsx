import React, { useEffect, useMemo, useState } from 'react'

import { SimpleSelect } from '.'
import { DefaultSelectProps } from './types'

export const FilterTextSelect = (props: DefaultSelectProps<string, string | null>) => {
  const [search, setSearch] = useState('')
  const options = useMemo(() => {
    if (!search) return props.options
    return props.options.filter((option) => option.toLowerCase().includes(search.toLowerCase()))
  }, [search])
  useEffect(() => {
    search && setSearch('')
  }, [props.value])

  return <SimpleSelect {...props} options={options} onSearch={setSearch} emptyOption="All" />
}
