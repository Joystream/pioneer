import React from 'react'
import styled from 'styled-components'

import { CrossIcon } from '@/common/components/icons'
import { StyledLink } from '@/common/components/Link'
import { Colors } from '@/common/constants'
import { isDefined } from '@/common/utils'

import { FilterSearchBox } from './FilterSearchBox'

interface FilterBoxProps {
  searchSlot?: React.RefObject<HTMLDivElement>
  search?: string
  onApply?: () => void
  onClear?: () => void
  onSearch?: (value: string) => void
  children: React.ReactNode
}

export const FilterBox = ({ search = '', searchSlot, onApply, onClear, onSearch, children }: FilterBoxProps) => (
  <FilterContainer>
    <ClearButton onClick={onClear} show={isDefined(onClear)}>
      <CrossIcon />
      Clear all Filters
    </ClearButton>

    <Fields>
      {searchSlot && <FilterSearchBox value={search} slot={searchSlot} onApply={onApply} onChange={onSearch} />}
      {children}
    </Fields>
  </FilterContainer>
)

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ClearButton = styled(StyledLink)`
  align-self: flex-end;
  color: ${Colors.Black[400]};
  text-decoration: none;
  visibility: ${({ show }: { show?: boolean }) => (show === false ? 'hidden' : 'visible')};

  svg {
    color: ${Colors.Black[900]};
    margin-right: 6px;
    vertical-align: middle;
    width: 12px;
  }
`

const Fields = styled.div`
  background: ${Colors.Black[50]};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 16px;
  padding: 16px;
`
