import React, { useEffect, useState } from 'react'

import { ControlProps } from '@/common/components/forms'
import { SimpleSelect } from '@/common/components/selects'
import { useDebounce } from '@/common/hooks/useDebounce'
import { objectEquals } from '@/common/utils'
import { Member } from '@/memberships/types'
import { useProposers } from '@/proposals/hooks/useProposers'

const DISPLAYED_OPTION_LIMIT = 5

export const SelectProposer = ({ value, onChange }: ControlProps<Member | null>) => {
  const [search, setSearch] = useState('')
  const searchDebounced = useDebounce(search, 400)

  const data = useProposers({
    search: searchDebounced,
    limit: DISPLAYED_OPTION_LIMIT - (searchDebounced ? 0 : 1),
  })

  const [proposers, setProposers] = useState({ isSearch: data.isSearch, values: data.proposers ?? [] })
  useEffect(() => {
    const { isSearch, proposers } = data
    if (!proposers) {
      return
    } else if (isSearch || !value || proposers.some(objectEquals(value))) {
      setProposers({ isSearch, values: proposers })
    } else {
      setProposers({ isSearch, values: [...proposers.slice(0, DISPLAYED_OPTION_LIMIT - 2), value] })
    }
  }, [data.proposers?.map(({ id }) => id).toString(), value?.id])

  useEffect(() => {
    search && setSearch('')
  }, [value])

  return (
    <SimpleSelect
      title="Proposer"
      values={proposers.values}
      renderOption={({ handle }) => handle}
      emptyOption={proposers.isSearch ? undefined : 'All'}
      value={value}
      onChange={onChange}
      onSearch={setSearch}
    />
  )
}
