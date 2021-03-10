import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { Colors, Sizes } from '../../../constants'
import { useMembership } from '../../../hooks/useMembership'
import { useToggle } from '../../../hooks/useToggle'
import { MemberInfo } from '../../membership/MemberInfo'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
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
          <Empty type="text" placeholder="Select Member or type a member" autoComplete="off" disabled={!enable} />
        )}
        <ToggleButton disabled={!enable}>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {!isLoading && isOpen && <OptionListMember onChange={onOptionClick} options={members} />}
    </SelectComponent>
  )
})

const SelectedOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  min-height: ${Sizes.accountSelectHeight};
  max-height: ${Sizes.accountSelectHeight};
  padding: 10px 28px 10px 16px;
`

const Empty = styled.input`
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  width: 100%;
  height: 100%;
  padding: 16px;
  border: none;
  outline: none;
  background-color: transparent;

  &::placeholder {
    font-size: 14px;
    line-height: 45px;
    font-weight: 400;
    color: ${Colors.Black[400]};
  }
  &:disabled {
    cursor: not-allowed;
  }
`

const SelectComponent = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
`
