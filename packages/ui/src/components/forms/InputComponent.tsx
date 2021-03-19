import React, { ReactElement, ReactHTMLElement, ReactNode, ReactNodeArray } from 'react'
import styled, { css } from 'styled-components'
import { Colors, Transitions, Fonts, BorderRad, Shadows } from '../../constants'
import { CopyButton } from '../buttons'
import { Text } from '../typography'
import { Label } from './'
import { AlertSymbol } from '../icons/symbols/AlertSymbol'
import { SuccessSymbol } from '../icons/symbols/SuccessSymbol'
import { Help } from '../Help'

type InputComponentProps = InputProps &
  InputElementProps &
  DisabledInputProps & {
    id?: string
    label?: string
    required?: boolean
    value?: string
    placeholder?: string
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
    children: ReactNode
  }

interface InputProps {
  icon?: React.ReactElement
  copy?: boolean
  units?: string
  validation?: 'invalid' | 'valid' | 'warning' | undefined
  inputType?: 'text' | 'textarea' | 'number'
  inputSize?: 'm' | 'l' | undefined
}

interface InputElementProps {
  disabled?: boolean
  inputSize?: 'm' | 'l' | undefined
  icon?: React.ReactElement
  copy?: boolean
  units?: string
  validation?: 'invalid' | 'valid' | 'warning' | undefined
}

interface DisabledInputProps {
  disabled?: boolean
}

export const InputComponent = ({
  inputType,
  id,
  label,
  required,
  validation,
  disabled,
  value,
  placeholder,
  inputSize,
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
}: InputComponentProps) => {
  return (
    <InputElement className={className} inputSize={inputSize}>
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
          {validation === 'invalid' ||
            (validation === 'warning' && (
              <InputNotificationIcon>
                <AlertSymbol />
              </InputNotificationIcon>
            ))}
          {validation === 'valid' && (
            <InputNotificationIcon>
              <SuccessSymbol />
            </InputNotificationIcon>
          )}
          <InputNotificationMessage size={3}>{message}</InputNotificationMessage>
        </InputNotification>
      )}
    </InputElement>
  )
}

// {inputType === 'textarea' ? (
//   <InputTextarea
//     id={id}
//     inputType={inputType}
//     value={value}
//     required={required}
//     validation={validation}
//     placeholder={placeholder}
//     disabled={disabled}
//     icon={icon}
//     copy={copy}
//     units={units}
//     inputSize={inputSize}
//   />
// ) : (
//   <Input
//     id={id}
//     type={inputType}
//     inputType={inputType}
//     value={value}
//     required={required}
//     validation={validation}
//     placeholder={placeholder}
//     disabled={disabled}
//     icon={icon}
//     copy={copy}
//     units={units}
//     inputSize={inputSize}
//   />
// )}

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
  border: none;
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
  ${(props) => (!props.icon && !props.units && !props.copy ? InputWithNothing : null)}
  ${(props) => (props.icon && !props.units && !props.copy ? InputWithIcon : null)}
  ${(props) => ((props.units || props.copy) && !props.icon ? InputWithRight : null)}
  ${(props) => ((props.units || props.copy) && props.icon ? InputWithBoth : null)}
`

export const Input = styled.input`
  ${InputStyles}
  &[type="number"] {
    text-align: right;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const InputTextarea = styled.textarea`
  ${InputStyles}
  padding-top: 16px;
  padding-bottom: 16px;
  resize: none;
`

const InputElement = styled.div<InputElementProps>`
  display: grid;
  grid-row-gap: 4px;
  align-items: center;
  width: fit-content;
  min-width: 400px;
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
  border-color: ${({ disabled }) => {
    if (disabled) {
      return Colors.Black[75]
    }
  }};
  border-radius: ${BorderRad.s};
  background-color: ${({ disabled }) => (disabled ? Colors.Black[75] : 'transparent')};
  box-shadow: ${Shadows.transparent};
  transition: ${Transitions.all};

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
        return Colors.Black[75]
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

const InputNotificationMessage = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  color: inherit;
`
