import React, { useReducer, useRef } from 'react'
import styled from 'styled-components'

import { MembershipExternalResourceType } from '@/common/api/queries'
import { TogglableIcon } from '@/common/components/forms'
import { Fields, FilterBox, FilterLabel } from '@/common/components/forms/FilterBox'
import { CheckboxIcon, FounderMemberIcon, VerifiedMemberIcon } from '@/common/components/icons'
import { ItemCount } from '@/common/components/ItemCount'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { MyProfileIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { FilterSelect, OptionContainer, OptionProps, SelectContainer, SimpleSelect } from '@/common/components/selects'
import { TextInlineMedium } from '@/common/components/typography'
import { objectEquals } from '@/common/utils'
import { socialToIcon } from '@/memberships/components/SocialMediaTile/SocialMediaTile'
import { MemberRole } from '@/memberships/types'

import { SelectMemberRoles } from '../SelectMemberRoles'

export type MemberSearchFilter = keyof typeof MembershipExternalResourceType | 'Membership'

export interface MemberListFilter {
  search: string
  roles: MemberRole[]
  council: boolean | null
  onlyVerified: boolean
  onlyFounder: boolean
  searchFilter: MemberSearchFilter
}

type FilterKey = keyof MemberListFilter

type Clear = { type: 'clear' }
type Change<K extends FilterKey = FilterKey> = K extends FilterKey // Use a conditional type in order to distribue the union type
  ? { type: 'change'; field: K; value: MemberListFilter[K] }
  : never
type Action = Clear | Change

const filterReducer = (filters: MemberListFilter, action: Action): MemberListFilter => {
  switch (action.type) {
    case 'clear':
      return MemberListEmptyFilter

    case 'change':
      return { ...filters, [action.field]: action.value }
  }
  return filters
}

export const MemberListEmptyFilter: MemberListFilter = {
  search: '',
  roles: [],
  council: null,
  onlyVerified: false,
  onlyFounder: false,
  searchFilter: 'Membership',
}

const memberListIcons = {
  ...socialToIcon,
  MEMBERSHIP: <MyProfileIcon />,
}

const renderSocialOption = (option: MemberSearchFilter, props?: OptionProps, key?: any) =>
  props ? (
    <StyledOptionContainer key={key} {...props}>
      {memberListIcons[option.toUpperCase() as keyof typeof memberListIcons] ?? <span />}
      <TextInlineMedium>{option}</TextInlineMedium>
      {props.selected && <CheckboxIcon />}
    </StyledOptionContainer>
  ) : (
    <SelectedOptionWrapper gap={10} align="center">
      {memberListIcons[option.toUpperCase() as keyof typeof memberListIcons]}
      <TextInlineMedium value bold>
        {option}
      </TextInlineMedium>
    </SelectedOptionWrapper>
  )

const isFilterEmpty = objectEquals(MemberListEmptyFilter, { depth: 2 })

const searchFilterOptions: MemberSearchFilter[] = [
  'Facebook',
  'Email',
  'Discord',
  'Irc',
  'Telegram',
  'Wechat',
  'Whatsapp',
  'Twitter',
  'Membership',
  'Youtube',
]

export interface MemberListFiltersProps {
  memberCount?: number
  onApply: (value: MemberListFilter) => void
}

export const MemberListFilters = ({ memberCount, onApply }: MemberListFiltersProps) => {
  const [filters, dispatch] = useReducer(filterReducer, MemberListEmptyFilter)
  const searchSlot = useRef<HTMLDivElement>(null)
  const { search, roles, council, onlyVerified, onlyFounder } = filters

  const applyFilters = () => onApply(filters)
  const clear = isFilterEmpty(filters)
    ? undefined
    : () => {
        dispatch({ type: 'clear' })
        onApply(MemberListEmptyFilter)
      }

  const onSearch = (value: string) => {
    dispatch({ type: 'change', field: 'search', value })
  }

  return (
    <Wrapper>
      <div ref={searchSlot}>
        <SimpleSelect
          options={searchFilterOptions}
          value={filters.searchFilter}
          renderOption={renderSocialOption}
          onChange={(value: MemberSearchFilter | null) =>
            value && dispatch({ type: 'change', field: 'searchFilter', value })
          }
        />
      </div>
      <MembersFilterBox
        searchSlot={searchSlot}
        search={search}
        onApply={applyFilters}
        onClear={clear}
        onSearch={onSearch}
      >
        <FieldsHeader>
          <ItemCount count={memberCount}>All members</ItemCount>
        </FieldsHeader>

        <SelectMemberRoles
          value={roles}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'roles', value })
            onApply({ ...filters, roles: value })
          }}
          onApply={applyFilters}
          onClear={() => {
            dispatch({ type: 'change', field: 'roles', value: [] })
            onApply({ ...filters, roles: [] })
          }}
        />

        <FilterSelect
          title="Council Members"
          options={[true, false]}
          renderOption={(value) => (value ? 'Yes' : 'No')}
          value={council}
          onChange={(value) => {
            dispatch({ type: 'change', field: 'council', value })
            onApply({ ...filters, council: value })
          }}
        />

        <ToggleContainer>
          <FilterLabel>Member Type</FilterLabel>
          <TogglableIcon
            value={onlyVerified}
            onChange={(value) => {
              dispatch({ type: 'change', field: 'onlyVerified', value })
              onApply({ ...filters, onlyVerified: value })
            }}
          >
            <VerifiedMemberIcon />
          </TogglableIcon>

          <TogglableIcon
            value={onlyFounder}
            onChange={(value) => {
              dispatch({ type: 'change', field: 'onlyFounder', value })
              onApply({ ...filters, onlyFounder: value })
            }}
          >
            <FounderMemberIcon />
          </TogglableIcon>
        </ToggleContainer>
      </MembersFilterBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  row-gap: 10px;

  > *:first-child {
    display: flex;
    width: 400px;
    flex-direction: row-reverse;

    label {
      > *:first-child {
        height: 100%;
      }
    }
  }
`

const MembersFilterBox = styled(FilterBox)`
  height: 72px;
  margin-top: 8px;

  ${Fields} {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    height: 100%;
  }

  ${SelectContainer} {
    flex-basis: 220px;
  }
`

const FieldsHeader = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-right: auto;
`

const ToggleContainer = styled.div`
  display: grid;
  gap: 4px 8px;
  grid-template-columns: auto 1fr;
  height: 48px;

  & > :first-child {
    grid-column: span 2;
  }
`

const StyledOptionContainer = styled(OptionContainer)`
  grid-template-columns: 30px auto 30px;
  height: 40px;
  svg {
    color: #c4cad6;
  }
`

const SelectedOptionWrapper = styled(ColumnGapBlock)`
  svg {
    color: #c4cad6;
  }
`
