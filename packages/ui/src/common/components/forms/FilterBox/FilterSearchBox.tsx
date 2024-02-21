import React, { ChangeEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { InputComponent, InputNotification, InputText } from '@/common/components/forms'
import { CrossIcon, SearchIcon } from '@/common/components/icons'
import { Colors } from '@/common/constants'

import { ButtonLink } from '../../buttons'
import { ControlProps } from '../types'

import { FilterLabel } from './FilterLabel'

interface FilterSearchBoxProps extends SearchBoxProps {
  slot: React.RefObject<HTMLDivElement>
  label?: string
  displayReset?: boolean
  minCharacterLimit?: number
}
export const FilterSearchBox = React.memo(
  ({ value, slot, onApply, onChange, label, displayReset, minCharacterLimit }: FilterSearchBoxProps) => {
    // Force the search box to render (sometime the ref is null on the first render)
    const [rendered, setRendered] = useState(!!slot.current)
    useEffect(() => {
      !rendered && setRendered(true)
    }, [])

    return (
      slot.current &&
      createPortal(
        <SearchBox
          value={value}
          onApply={onApply}
          onChange={onChange}
          label={label}
          displayReset={displayReset}
          minCharacterLimit={minCharacterLimit}
        />,
        slot.current
      )
    )
  }
)

interface SearchBoxProps extends ControlProps<string> {
  onApply?: () => void
  label?: string
  displayReset?: boolean
  minCharacterLimit?: number
}
export const SearchBox = React.memo(
  ({ value, onApply, onChange, label, displayReset, minCharacterLimit = 3 }: SearchBoxProps) => {
    const change = onChange && (({ target }: ChangeEvent<HTMLInputElement>) => onChange(target.value))

    const isValid = !value || value.length === 0 || value.length >= minCharacterLimit
    const [showInvalid, setShowInvalid] = useState(false)
    useEffect(() => {
      if (isValid) setShowInvalid(false)
    }, [isValid])

    const keyDown = ({ key }: React.KeyboardEvent) => {
      if (key !== 'Enter') return
      if (!isValid) return setShowInvalid(true)
      onApply?.()
    }

    const reset =
      onChange &&
      onApply &&
      (() => {
        onChange('')
        onApply()
      })

    return (
      <SearchBoxWrapper>
        <FilterLabel>{label}</FilterLabel>
        <SearchInput
          inputSize={label ? 'xs' : 's'}
          validation={showInvalid ? 'invalid' : undefined}
          message={showInvalid ? `Minimum of ${minCharacterLimit} characters is required` : undefined}
        >
          <InputText placeholder="Search" value={value} onChange={change} onKeyDown={keyDown} />
          {displayReset && value && (
            <ClearButton onClick={reset} size="small" borderless>
              <CrossIcon />
            </ClearButton>
          )}
        </SearchInput>
      </SearchBoxWrapper>
    )
  }
)

const SearchBoxWrapper = styled.div`
  &:hover,
  &:focus,
  &:focus-within,
  &:active {
    ${FilterLabel} {
      color: ${Colors.Blue[400]};
    }
  }
`

const SearchInput = styled(InputComponent).attrs({
  icon: <SearchIcon />,
  tight: true,
  inputWidth: 'xs',
})`
  width: 100%;
  & + div {
    border: 1px solid ${Colors.Black[200]};
  }
  min-width: 220px;

  ${InputNotification} {
    position: absolute;
    top: 42px;
  }
`

const ClearButton = styled(ButtonLink)`
  line-height: 16px;
  margin-right: 8px;

  &:before {
    display: none;
  }
`
