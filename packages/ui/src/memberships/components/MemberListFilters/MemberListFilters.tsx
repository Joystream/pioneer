import React, { useReducer, useRef } from 'react'
import styled from 'styled-components'

import { MembershipExternalResourceType } from '@/common/api/queries'
import { TogglableIcon } from '@/common/components/forms'
import { Fields, FilterBox, FilterLabel } from '@/common/components/forms/FilterBox'
import { CheckboxIcon, CouncilMemberIcon, FounderMemberIcon, VerifiedMemberIcon } from '@/common/components/icons'
import { ItemCount } from '@/common/components/ItemCount'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { MyProfileIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { OptionContainer, OptionProps, SelectContainer, SimpleSelect } from '@/common/components/selects'
import { TextInlineMedium } from '@/common/components/typography'
import { objectEquals } from '@/common/utils'
import { socialToIcon } from '@/memberships/components/SocialMediaTile/SocialMediaTile'
import { MemberRole } from '@/memberships/types'

import { SelectMemberRoles } from '../SelectMemberRoles'

export type MemberSearchFilter =
  | keyof typeof MembershipExternalResourceType
  | 'Membership'
  | 'Account_Address'
  | 'Membership_ID'

export interface MemberListFilter {
  search: string
  roles: MemberRole[]
  onlyFounder: boolean
  searchFilter: MemberSearchFilter
  onlyCouncil: boolean
  onlyVerified: boolean
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
      if (action.field !== 'search' && !filters.search) {
        return { ...filters, searchFilter: 'Membership', [action.field]: action.value }
      }
      return { ...filters, [action.field]: action.value }
  }
  return filters
}

export const MemberListEmptyFilter: MemberListFilter = {
  search: '',
  roles: [],
  onlyFounder: false,
  searchFilter: 'Membership',
  onlyCouncil: false,
  onlyVerified: false,
}

const memberListIcons = {
  ...socialToIcon,
  MEMBERSHIP: <MyProfileIcon />,
  MEMBERSHIP_ID: <MyProfileIcon />,
  ACCOUNT_ADDRESS: <MyProfileIcon />,
}

const renderSocialOption = (option: MemberSearchFilter, props?: OptionProps, key?: any) =>
  props ? (
    <StyledOptionContainer key={key} {...props}>
      {memberListIcons[option.toUpperCase() as keyof typeof memberListIcons] ?? <span />}
      <TextInlineMedium>{option.replace(/_/, ' ')}</TextInlineMedium>
      {props.selected && <CheckboxIcon />}
    </StyledOptionContainer>
  ) : (
    <SelectedOptionWrapper gap={10} align="center">
      {memberListIcons[option.toUpperCase() as keyof typeof memberListIcons]}
      <TextInlineMedium value bold>
        {option.replace(/_/, ' ')}
      </TextInlineMedium>
    </SelectedOptionWrapper>
  )

const isFilterEmpty = objectEquals(MemberListEmptyFilter, { depth: 2 })

const searchFilterOptions: MemberSearchFilter[] = [
  'Membership',
  'Membership_ID',
  'Account_Address',
  'Discord',
  'Email',
  'Facebook',
  'Irc',
  'Hyperlink',
  'Telegram',
  'Twitter',
  'Wechat',
  'Whatsapp',
  'Youtube',
  'Linkedin',
]

export interface MemberListFiltersProps {
  memberCount?: number
  onApply: (value: MemberListFilter) => void
}

export const MemberListFilters = ({ memberCount, onApply }: MemberListFiltersProps) => {
  const [filters, dispatch] = useReducer(filterReducer, MemberListEmptyFilter)
  const searchSlot = useRef<HTMLDivElement>(null)
  const { search, roles, onlyCouncil, onlyFounder, onlyVerified } = filters

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
        <ToggleContainer>
          <FilterLabel>Member Type</FilterLabel>

          <TogglableIcon
            tooltipText="Founding Member"
            value={onlyFounder}
            onChange={(value) => {
              dispatch({ type: 'change', field: 'onlyFounder', value })
              onApply({ ...filters, onlyFounder: value })
            }}
          >
            <FounderMemberIcon />
          </TogglableIcon>
          <TogglableIcon
            tooltipText="Council Member"
            value={onlyCouncil}
            onChange={(value) => {
              dispatch({ type: 'change', field: 'onlyCouncil', value })
              onApply({ ...filters, onlyCouncil: value })
            }}
          >
            <CouncilMemberIcon />
          </TogglableIcon>
          <TogglableIcon
            tooltipText="Verified Member"
            value={onlyVerified}
            onChange={(value) => {
              dispatch({ type: 'change', field: 'onlyVerified', value })
              onApply({ ...filters, onlyVerified: value })
            }}
          >
            <VerifiedMemberIcon />
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
    width: 440px;
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
    grid-column: span 3;
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
