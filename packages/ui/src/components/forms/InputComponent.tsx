import React from 'react'
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
  }

interface InputProps {
  validation?: 'invalid' | 'valid' | undefined
  inputType?: 'text' | 'textarea' | 'number'
}

interface InputElementProps {
  size?: 'm' | 'l'
  icon?: React.ReactElement
  copy?: boolean
  units?: string
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
  size,
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
}: InputComponentProps) => {
  return (
    <InputElement className={className} size={size}>
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
      <InputContainer>
        {icon && <InputIcon disabled={disabled}>{icon}</InputIcon>}
        <InputArea>
          {inputType === 'textarea' ? (
            <InputTextarea
              id={id}
              inputType={inputType}
              value={value}
              required={required}
              validation={validation}
              placeholder={placeholder}
              disabled={disabled}
            />
          ) : (
            <Input
              id={id}
              type={inputType}
              inputType={inputType}
              value={value}
              required={required}
              validation={validation}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        </InputArea>
        {(units || copy) && (
          <InputRightSide disabled={disabled}>
            {units && <InputUnits>{units}</InputUnits>}
            {copy && <InputCopy textToCopy={textToCopy ? textToCopy : value} />}
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

const InputStyles = css<InputProps>`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
  box-shadow: 0px 0px 0px transparent;
  outline: none;
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

  &:hover,
  &:focus {
    border-color: ${Colors.Blue[400]};
    box-shadow: ${Shadows.focus};
  }
`

const Input = styled.input`
  ${InputStyles}
  &[type="number"] {
    text-align: right;
  }
`

const InputTextarea = styled.textarea`
  ${InputStyles}
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
`

const InputContainer = styled.div<InputElementProps>`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;

  height: ${({ size }) => {
    switch (size) {
      case 'l':
        return '80px'
      case 'm':
      default:
        return '48px'
    }
  }};
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
  position: absolute;
  right: 16px;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: 100%;
`

const InputCopy = styled(CopyButton)`
  width: 100%;
  height: 100%;
`

const InputUnits = styled.span`
  font-family: ${Fonts.Grotesk};
  font-size: 14px;
  line-height: 20px;
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
  color: ${Colors.Black[400]};
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
    color: inherit;
  }
`

const InputNotificationMessage = styled(Text)`
  font-size: 12px;
  line-height: 18px;
  color: inherit;
`
