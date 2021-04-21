import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Shadows, Transitions } from '../../constants'
import { CopyButton } from '../buttons'
import { Help } from '../Help'
import { AlertSymbol, SuccessSymbol } from '../icons/symbols'
import { TextSmall } from '../typography'

import { Label } from '.'

export type InputComponentProps = InputProps &
  InputElementProps &
  DisabledInputProps & {
    id?: string
    label?: string
    required?: boolean
    value?: string
    icon?: React.ReactElement
    copy?: boolean
    textToCopy?: string
    units?: string
    message?: string
    helperText?: string
    helperTitle?: string
    helperLinkText?: React.ReactElement
    helperLinkURL?: string
    className?: string
    children: React.ReactNode
  }

interface InputProps {
  id?: string
  validation?: 'invalid' | 'valid' | 'warning' | undefined
  required?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (event: any) => void
}

interface InputElementProps {
  disabled?: boolean
  inputSize?: 'm' | 'l' | undefined
  icon?: React.ReactElement
  copy?: boolean
  units?: string
  validation?: 'invalid' | 'valid' | 'warning' | undefined
  borderless?: boolean
  inputWidth?: 's' | undefined
}

interface DisabledInputProps {
  disabled?: boolean
}

export const InputComponent = React.memo(
  ({
    id,
    label,
    required,
    validation,
    disabled,
    value,
    inputSize,
    inputWidth,
    icon,
    copy,
    textToCopy,
    units,
    message,
    helperText,
    helperTitle,
    helperLinkText,
    helperLinkURL,
    className,
    children,
    borderless,
  }: InputComponentProps) => {
    return (
      <InputElement className={className} inputSize={inputSize} inputWidth={inputWidth}>
        {label && (
          <InputLabel htmlFor={id} isRequired={required} disabled={disabled}>
            {label}
            {helperText && (
              <Help
                helperText={helperText}
                helperTitle={helperTitle}
                helperLinkText={helperLinkText}
                helperLinkURL={helperLinkURL}
              />
            )}
          </InputLabel>
        )}
        <InputContainer
          copy={copy}
          units={units}
          icon={icon}
          validation={validation}
          disabled={disabled}
          inputSize={inputSize}
          borderless={borderless}
        >
          {icon && <InputIcon>{icon}</InputIcon>}
          <InputArea>{children}</InputArea>
          {(units || copy) && (
            <InputRightSide>
              {units && <InputUnits>{units}</InputUnits>}
              {copy && <InputCopy textToCopy={textToCopy ? textToCopy : value} disabled={disabled} />}
            </InputRightSide>
          )}
        </InputContainer>
        {message && (
          <InputNotification validation={validation}>
            {validation === 'invalid' && (
              <InputNotificationIcon>
                <AlertSymbol />
              </InputNotificationIcon>
            )}
            {validation === 'warning' && (
              <InputNotificationIcon>
                <AlertSymbol />
              </InputNotificationIcon>
            )}
            {validation === 'valid' && (
              <InputNotificationIcon>
                <SuccessSymbol />
              </InputNotificationIcon>
            )}
            <InputNotificationMessage>{message}</InputNotificationMessage>
          </InputNotification>
        )}
      </InputElement>
    )
  }
)

export const InputText = React.memo(
  ({ id, value, required, validation, placeholder, disabled, onChange }: InputProps) => {
    return (
      <Input
        id={id}
        name={id}
        type="text"
        value={value}
        required={required}
        validation={validation}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        autoComplete="off"
      />
    )
  }
)

export const InputNumber = React.memo(
  ({ id, value, required, validation, placeholder, disabled, onChange }: InputProps) => {
    return (
      <StyledNumberInput
        id={id}
        name={id}
        type="string"
        value={value}
        required={required}
        validation={validation}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        autoComplete="off"
      />
    )
  }
)

export const InputTextarea = React.memo(
  ({ id, value, required, validation, placeholder, disabled, onChange }: InputProps) => {
    return (
      <Textarea
        id={id}
        name={id}
        value={value}
        required={required}
        validation={validation}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        autoComplete="off"
      />
    )
  }
)

const InputWithNothing = css<InputProps>`
  padding: 0 16px 1px 16px;
`
const InputWithIcon = css<InputProps>`
  padding: 0 16px 1px 36px;
`
const InputWithRight = css<InputProps>`
  padding: 0 0 1px 16px;
`
const InputWithBoth = css<InputProps>`
  padding: 0 0 1px 36px;
`

const InputStyles = css<InputProps>`
  width: 100%;
  height: 100%;
  outline: none;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: ${BorderRad.s};
  font-family: ${Fonts.Inter};
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${Colors.Black[900]};
  transition: ${Transitions.all};

  &::placeholder {
    font-weight: 400;
    color: ${Colors.Black[400]};
  }
`

export const Input = styled.input`
  ${InputStyles};
  &[type='number'] {
    text-align: right;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const StyledNumberInput = styled(Input)`
  text-align: right;
`

const Textarea = styled.textarea`
  ${InputStyles} {
    resize: none;
  }
`

const InputElement = styled.div<InputElementProps>`
  display: grid;
  grid-row-gap: 4px;
  align-items: center;
  width: 100%;
  min-width: ${({ inputWidth }) => (inputWidth === 's' ? '320px' : '400px')};
`

const InputLabel = styled(Label)<DisabledInputProps>`
  margin-bottom: 0;
  color: ${({ disabled }) => (disabled ? Colors.Black[500] : Colors.Black[900])};
`

const InputContainer = styled.div<InputElementProps>`
  display: grid;
  position: relative;
  grid-template-columns: ${(props) => (props.copy || props.units ? '1fr auto' : '1fr')};
  align-items: center;
  width: 100%;
  height: ${({ inputSize }) => {
    switch (inputSize) {
      case 'l':
        return '80px'
      case 'm':
      default:
        return '48px'
    }
  }};
  border: 1px solid
    ${({ validation }) => {
      switch (validation) {
        case 'invalid':
          return Colors.Red[400]
        case 'valid':
          return Colors.Green[500]
        case 'warning':
          return Colors.Orange[500]
        case undefined:
        default:
          return Colors.Black[200]
      }
    }};
  border: ${({ borderless }) => {
    if (borderless) {
      return 'none'
    }
  }};
  border-color: ${({ disabled }) => {
    if (disabled) {
      return Colors.Black[200]
    }
  }};
  border-radius: ${BorderRad.s};
  background-color: ${({ disabled }) => (disabled ? Colors.Black[75] : Colors.White)};
  box-shadow: ${Shadows.transparent};
  transition: ${Transitions.all};
  & input,
  & textarea {
    ${(props) => (!props.icon && !props.units && !props.copy ? InputWithNothing : null)}
    ${(props) => (props.icon && !props.units && !props.copy ? InputWithIcon : null)}
    ${(props) => ((props.units || props.copy) && !props.icon ? InputWithRight : null)}
    ${(props) => ((props.units || props.copy) && props.icon ? InputWithBoth : null)}
  }
  & textarea {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  &:hover,
  &:focus,
  &:focus-within {
    border-color: ${({ validation }) => {
      switch (validation) {
        case 'invalid':
          return Colors.Red[400]
        case 'valid':
          return Colors.Green[500]
        case 'warning':
          return Colors.Orange[500]
        default:
          return Colors.Blue[400]
      }
    }};
    border-color: ${({ disabled }) => {
      if (disabled) {
        return Colors.Black[200]
      }
    }};
    box-shadow: ${({ validation }) => {
      switch (validation) {
        case 'invalid':
          return Shadows.focusInvalid
        case 'valid':
          return Shadows.focusValid
        case 'warning':
          return Shadows.focusWarning
        default:
          return Shadows.focusDefault
      }
    }};
    box-shadow: ${({ disabled }) => {
      if (disabled) {
        return 'none'
      }
    }};
  }
`

const InputIcon = styled.div<DisabledInputProps>`
  display: flex;
  position: absolute;
  left: 16px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  color: inherit;
  transition: ${Transitions.all};
`

const InputArea = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`

const InputRightSide = styled.div<DisabledInputProps>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: 100%;
  padding: 0 12px 0 8px;
`

const InputCopy = styled(CopyButton)`
  width: 24px;
  height: 24px;
  padding: 0 4px;
  color: ${({ disabled }) => (disabled ? Colors.Black[400] : Colors.Black[900])};
`

const InputUnits = styled.span`
  font-family: ${Fonts.Grotesk};
  font-size: 14px;
  line-height: 1.5;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
`

const InputNotification = styled.div<InputProps>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  color: ${({ validation }) => {
    switch (validation) {
      case 'invalid':
        return Colors.Red[400]
      case 'valid':
        return Colors.Green[500]
      case 'warning':
        return Colors.Orange[500]
      case undefined:
      default:
        return Colors.Black[400]
    }
  }};
`

const InputNotificationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  color: inherit;

  .blackPart,
  .primaryPart {
    fill: currentColor;
  }
`

const InputNotificationMessage = styled(TextSmall)`
  color: inherit;
`
