import React, { ReactNode } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import styled, { css } from 'styled-components'

import { TooltipContainer } from '@/common/components/Tooltip'

import { BorderRad, Colors, Fonts, Transitions } from '../../constants'

import { Label } from './Label'

export interface Props {
  id?: string
  isRequired?: boolean
  disabled?: boolean
  checked?: boolean
  onChange?: (value: boolean) => void
  trueLabel: ReactNode
  falseLabel: ReactNode
  hasNoOffState?: boolean
  onBlur?: any
}

function BaseToggleCheckbox({
  id,
  isRequired,
  disabled,
  checked,
  onChange,
  trueLabel,
  falseLabel,
  hasNoOffState = false,
  onBlur,
}: Props) {
  const onClick = (setValue: boolean) => () => {
    if (disabled !== true) {
      onChange?.(setValue)
    }
  }

  return (
    <ToggleContainer groupDisabled={disabled}>
      <ToggleLabel onClick={onClick(true)}>{trueLabel}</ToggleLabel>
      <ToggleStyledInput isChecked={checked ?? false} hasNoOffState={hasNoOffState}>
        <ToggleInput
          id={id}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={(event) => onChange?.(event.currentTarget.checked)}
          required={isRequired}
          onBlur={onBlur}
        />
      </ToggleStyledInput>
      <ToggleLabel onClick={onClick(false)}>{falseLabel}</ToggleLabel>
    </ToggleContainer>
  )
}

interface CheckboxProps extends Props {
  name?: string
}

export const ToggleCheckbox = ({ name, ...props }: CheckboxProps) => {
  const formContext = useFormContext()

  if (!formContext || !name) {
    return <BaseToggleCheckbox {...props} />
  }

  return (
    <Controller
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <BaseToggleCheckbox {...props} checked={field.value} onChange={field.onChange} onBlur={field.onBlur} />
      )}
    />
  )
}

const ToggleInput = styled.input`
  position: absolute;
  height: 0;
  z-index: -1;
  opacity: 0;
  outline: none;
`

interface ToggleStyledInputProps {
  isChecked: boolean
  hasNoOffState: boolean
}
const ToggleLabel = styled.button`
  outline: none;
  font-family: ${Fonts.Inter};
  font-size: 14px;
  line-height: 20px;
  color: ${Colors.Black[900]};
  cursor: pointer;
`
const checkedBoxStyles = css`
  background-color: ${Colors.Blue[500]};

  &:hover,
  &:focus {
    background-color: ${Colors.Blue[400]};
  }
  &:after {
    transform: translateX(0%);
  }
`

const ToggleStyledInput = styled.label<ToggleStyledInputProps>`
  display: flex;
  align-items: center;
  width: 48px;
  height: 24px;
  margin: 0 10px;
  position: relative;
  border-radius: ${BorderRad.full};
  background-color: ${(hasNoOffState) => (hasNoOffState ? Colors.Blue[500] : Colors.Black[300])};
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${(hasNoOffState) => (hasNoOffState ? Colors.Blue[400] : Colors.Black[200])};
  }

  &:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border: 2px solid transparent;
    border-radius: ${BorderRad.round};
    background-color: ${Colors.White};
    background-clip: content-box;
    transform: translateX(100%);
    transition: ${Transitions.all};
  }

  ${(props) => props.isChecked && checkedBoxStyles};
`

interface ToggleCheckBoxContainerProps {
  groupDisabled?: boolean
}

const disabledToggleGroupStyles = css`
  opacity: 0.5;
  cursor: not-allowed;

  ${ToggleStyledInput},
  ${ToggleLabel} {
    cursor: not-allowed;
  }
`

const ToggleContainer = styled.div<ToggleCheckBoxContainerProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  ${(props) => props.groupDisabled && disabledToggleGroupStyles};
`

export const InlineToggleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  ${Label} {
    line-height: 20px;
    margin-bottom: 0;
  }

  ${ToggleContainer} {
    margin-left: 12px;
  }

  ${TooltipContainer} {
    margin-left: 12px;
  }
`
