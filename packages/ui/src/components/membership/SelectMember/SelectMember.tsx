import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGetMembersQuery } from '../../../api/queries'
import { BaseMember } from '../../../common/types'
import { useDebounce } from '../../../hooks/useDebounce'
import { useMyMemberships } from '../../../hooks/useMyMemberships'
import { useToggle } from '../../../hooks/useToggle'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { EmptyOption, SelectComponent, SelectedOption, SelectProps } from '../../selects'
import { MemberInfo } from '../MemberInfo'
import { OptionsListMember } from './OptionsListMember'

export const filterMember = (filterOut: BaseMember | undefined) => {
  return filterOut ? (member: BaseMember) => member.handle !== filterOut.handle : () => true
}

const filterByText = (options: BaseMember[], text: string) => {
  if (!text.length) {
    return options
  }
  const searchBy = text.toLocaleLowerCase()
  return options.filter(
    ({ handle, id, name }) =>
      name?.toLocaleLowerCase().includes(searchBy) ||
      handle?.toLocaleLowerCase().includes(searchBy) ||
      id.includes(searchBy)
  )
}

export const SelectMember = React.memo(({ onChange, filter, selected, disabled }: SelectProps<BaseMember>) => {
  const { members } = useMyMemberships()
  const myMembersHandles = members.map(({ handle }) => handle)
  const { data } = useGetMembersQuery()
  const baseFilter = filter || (() => true)
  const filterOutMyMemberships = ({ handle }: BaseMember) => !myMembersHandles.includes(handle)
  const allMembers = (data?.members || []).filter(filterOutMyMemberships)
  const [isOpen, toggleOpen] = useToggle()
  const [selectedOption, setSelectedOption] = useState<BaseMember | undefined>(selected)
  const selectNode = useRef<HTMLDivElement>(null)
  const textInput = useRef<HTMLInputElement>(null)

  const [filterInput, setFilterInput] = useState('')
  const search = useDebounce(filterInput, 200)

  const filteredMembers = useMemo(() => filterByText(members.filter(baseFilter), search), [search, members])
  const filteredFoundMembers = useMemo(() => filterByText(allMembers.filter(baseFilter), search), [search, allMembers])

  const onOptionClick = useCallback(
    (option: BaseMember) => {
      toggleOpen()
      setSelectedOption(option)
      onChange(option)
      setFilterInput('')
    },
    [filter, toggleOpen]
  )

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      if (isOpen && selectNode.current && !event.composedPath().includes(selectNode.current)) {
        toggleOpen()
        setFilterInput('')
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen])

  useEffect(() => {
    const escListener = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        toggleOpen()
        setFilterInput('')
      }
    }
    document.addEventListener('keydown', escListener)

    return () => document.removeEventListener('keydown', escListener)
  }, [isOpen])

  useEffect(() => {
    isOpen && textInput.current?.focus()
  }, [isOpen])

  return (
    <SelectComponent ref={selectNode}>
      <Toggle onClick={() => !isOpen && toggleOpen()} isOpen={isOpen} disabled={disabled}>
        {selectedOption && !isOpen && (
          <SelectedOption>
            <MemberInfo member={selectedOption} />
          </SelectedOption>
        )}
        {(!selectedOption || isOpen) && (
          <EmptyOption
            ref={textInput}
            type="text"
            placeholder="Select Member or type a member"
            autoComplete="off"
            value={filterInput}
            onChange={(t) => setFilterInput(t.target.value)}
          />
        )}
        <ToggleButton disabled={disabled}>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {isOpen && (
        <OptionsListMember myMembers={filteredMembers} allMembers={filteredFoundMembers} onChange={onOptionClick} />
      )}
    </SelectComponent>
  )
})
