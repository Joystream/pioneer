import React from 'react'
import styled from 'styled-components'

import { CrossIcon } from '@/common/components/icons'
import { Colors, Fonts } from '@/common/constants'
import { isDefined } from '@/common/utils'

import { ButtonInnerWrapper, ButtonLink } from '../../buttons'
import { RowGapBlock } from '../../page/PageContent'

import { FilterSearchBox } from './FilterSearchBox'

interface FilterBoxProps {
  searchSlot?: React.RefObject<HTMLDivElement>
  search?: string
  onApply?: () => void
  onClear?: () => void
  onSearch?: (value: string) => void
  displaySearchReset?: boolean
  children: React.ReactNode
  searchLabel?: string
  className?: string
}

export const FilterBox = ({
  search = '',
  searchSlot,
  onApply,
  onClear,
  onSearch,
  displaySearchReset,
  children,
  searchLabel,
  className,
}: FilterBoxProps) => (
  <FilterContainer gap={8} className={className}>
    {isDefined(onClear) && (
      <ClearButton onClick={onClear} size="small" borderless>
        <CrossIcon />
        Clear all filters
      </ClearButton>
    )}
    <Fields>
      {searchSlot && onSearch && (
        <FilterSearchBox
          value={search}
          slot={searchSlot}
          onApply={onApply}
          onChange={onSearch}
          label={searchLabel}
          displayReset={displaySearchReset}
        />
      )}
      {children}
    </Fields>
  </FilterContainer>
)

const FilterContainer = styled(RowGapBlock)`
  position: relative;
  margin-top: 16px;
`

const ClearButton = styled(ButtonLink)`
  position: absolute;
  right: 0;
  top: -18px;
  font-family: ${Fonts.Inter};
  font-size: 10px;
  line-height: 16px;
  color: ${Colors.Black[400]};

  &:before {
    bottom: 0;
  }

  ${ButtonInnerWrapper} > svg {
    color: ${Colors.Black[900]};
    transform: none;
  }
`

export const Fields = styled.div`
  background-color: ${Colors.Black[50]};
  padding: 8px 16px 12px;
`
