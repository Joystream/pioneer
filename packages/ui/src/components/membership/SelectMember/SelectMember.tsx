import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BaseMember } from '../../../common/types'
import { useMembership } from '../../../hooks/useMembership'
import { useToggle } from '../../../hooks/useToggle'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { EmptyOption, SelectComponent, SelectedOption, SelectProps } from '../../selects'
import { MemberInfo } from '../MemberInfo'
import { OptionListMember } from './OptionListMember'

export const filterMember = (filterOut: BaseMember | undefined) => {
  return filterOut ? (member: BaseMember) => member.handle !== filterOut.handle : () => true
}

export const SelectMember = React.memo(({ onChange, filter, selected, disabled }: SelectProps<BaseMember>) => {
  const { isLoading, members } = useMembership()
  const [isOpen, toggleOpen] = useToggle()
  const [selectedOption, setSelectedOption] = useState<BaseMember | undefined>(selected)
  const selectNode = useRef<HTMLDivElement>(null)
  const options = members.filter(filter || (() => true))

  const onOptionClick = useCallback(
    (option: BaseMember) => {
      toggleOpen()
      setSelectedOption(option)
      onChange(option)
    },
    [filter, toggleOpen]
  )

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      if (isOpen && selectNode.current && !event.composedPath().includes(selectNode.current)) {
        toggleOpen()
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen])

  useEffect(() => {
    const escListener = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        toggleOpen()
      }
    }
    document.addEventListener('keydown', escListener)

    return () => document.removeEventListener('keydown', escListener)
  }, [isOpen])

  return (
    <SelectComponent ref={selectNode}>
      <Toggle onClick={toggleOpen} isOpen={isOpen} disabled={disabled}>
        {selectedOption && (
          <SelectedOption>
            <MemberInfo member={selectedOption} />
          </SelectedOption>
        )}
        {(!selectedOption || isOpen) && (
          <EmptyOption
            type="text"
            placeholder="Select Member or type a member"
            autoComplete="off"
            disabled={disabled}
          />
        )}
        <ToggleButton disabled={disabled}>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {!isLoading && isOpen && <OptionListMember onChange={onOptionClick} options={options} />}
    </SelectComponent>
  )
})
