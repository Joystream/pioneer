import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BaseMember } from '../../../common/types'
import { useMembership } from '../../../hooks/useMembership'
import { useToggle } from '../../../hooks/useToggle'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { MemberInfo } from '../../membership/MemberInfo'
import { EmptyOption, SelectComponent, SelectedOption } from '../selects'
import { OptionListMember } from './OptionListMember'

interface Props {
  onChange: (member: BaseMember) => void
  filter?: (member: BaseMember) => boolean
  selected?: BaseMember
  enable?: boolean
}

export const filterMember = (filterOut: BaseMember | undefined) => {
  return filterOut ? (member: BaseMember) => member.handle !== filterOut.handle : () => true
}

export const SelectMember = React.memo(({ onChange, filter, selected, enable }: Props) => {
  const { isLoading, members } = useMembership()
  const [isOpen, toggleOpen] = useToggle()
  const [selectedOption, setSelectedOption] = useState<BaseMember | undefined>(selected)
  const selectNode = useRef<HTMLDivElement>(null)

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
      <Toggle onClick={toggleOpen} isOpen={isOpen} enable={enable}>
        {selectedOption && (
          <SelectedOption>
            <MemberInfo member={selectedOption} />
          </SelectedOption>
        )}
        {(!selectedOption || isOpen) && (
          <EmptyOption type="text" placeholder="Select Member or type a member" autoComplete="off" disabled={!enable} />
        )}
        <ToggleButton disabled={!enable}>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {!isLoading && isOpen && <OptionListMember onChange={onOptionClick} options={members} />}
    </SelectComponent>
  )
})
