import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { Colors, Sizes } from '../../../constants'
import { useMembership } from '../../../hooks/useMembership'
import { MemberInfo } from '../../MemberInfo'
import { Toggle, ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { OptionListMember } from './OptionListMember'

interface Props {
  onChange: (member: MemberFieldsFragment) => void
  filter?: (member: MemberFieldsFragment) => boolean
  selected?: MemberFieldsFragment
  enable?: boolean
}

export const filterMember = (filterOut: MemberFieldsFragment | undefined) => {
  return filterOut ? (member: MemberFieldsFragment) => member.handle !== filterOut.handle : () => true
}

export const SelectMember = React.memo(({ onChange, filter, selected, enable }: Props) => {
  const { loading, members } = useMembership()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<MemberFieldsFragment | undefined>(selected)
  const selectNode = useRef<HTMLDivElement>(null)

  const onOptionClick = useCallback(
    (option: MemberFieldsFragment) => {
      setIsOpen(false)
      setSelectedOption(option)
      onChange(option)
    },
    [filter]
  )

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      if (isOpen && selectNode.current && !event.composedPath().includes(selectNode.current)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', clickListener)

    return () => document.removeEventListener('mousedown', clickListener)
  }, [isOpen])

  useEffect(() => {
    const escListener = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', escListener)

    return () => document.removeEventListener('keydown', escListener)
  }, [isOpen])

  return (
    <SelectComponent ref={selectNode}>
      <Toggle
        onClick={() => {
          if (enable !== false) {
            setIsOpen(!isOpen)
          }
        }}
        isOpen={isOpen}
        enable={enable}
      >
        {selectedOption && (
          <SelectedOption>
            <MemberInfo member={selectedOption} />
          </SelectedOption>
        )}
        {!selectedOption && (
          <Empty type={'text'} placeholder={'Select Member or type a member'} autoComplete="off" disabled={!enable} />
        )}
        <ToggleButton disabled={!enable}>
          <ArrowDownIcon />
        </ToggleButton>
      </Toggle>
      {!loading && isOpen && <OptionListMember onChange={onOptionClick} options={members} />}
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
