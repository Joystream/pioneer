import React from 'react'

import { SimpleSelect } from '.'
import { DefaultSelectProps } from './types'

export const FilterSelect = <T extends any>(props: DefaultSelectProps<T, T | null>) => (
  <SimpleSelect {...props} emptyOption="All" />
)
