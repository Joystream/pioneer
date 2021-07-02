import React from 'react'
import styled, { css } from 'styled-components'

import { BorderRad, Colors, Fonts, Shadows, Transitions } from '../../constants'
import { CopyButton } from '../buttons'
import { AlertSymbol, SuccessSymbol } from '../icons/symbols'
import { Tooltip, TooltipDefault } from '../Tooltip'
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
    tooltipText?: string
    tooltipTitle?: string
    tooltipLinkText?: React.ReactElement
    tooltipLinkURL?: string
    className?: string
    children: React.ReactNode
  }

interface InputProps<Element extends HTMLElement = HTMLInputElement> extends React.InputHTMLAttributes<Element> {
  id?: string
  validation?: 'invalid' | 'valid' | 'warning' | undefined
  required?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
}

export interface InputElementProps {
  disabled?: boolean
  inputSize?: 'xs' | 's' | 'm' | 'l' | 'auto' | undefined
  icon?: React.ReactElement
  iconRight?: boolean
  copy?: boolean
  units?: string
  validation?: 'invalid' | 'valid' | 'warning' | undefined
  borderless?: boolean
  inputWidth?: 'auto' | 's' | 'xs' | undefined
  tight?: boolean
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
    tight,
    icon,
    iconRight,
    copy,
    textToCopy,
    units,
    message,
    tooltipText,
    tooltipTitle,
    tooltipLinkText,
    tooltipLinkURL,
    className,
    children,
    borderless,
  }: InputComponentProps) => {
    return (
      <InputElement className={className} inputSize={inputSize} inputWidth={inputWidth} tight={tight}>
        {label && (
          <InputLabel htmlFor={id} isRequired={required} disabled={disabled}>
            {label}
            {tooltipText && (
              <Tooltip
                tooltipText={tooltipText}
                tooltipTitle={tooltipTitle}
                tooltipLinkText={tooltipLinkText}
                tooltipLinkURL={tooltipLinkURL}
              >
                <TooltipDefault />
              </Tooltip>
            )}
          </InputLabel>
        )}
        <InputContainer
          copy={copy}
          units={units}
          icon={icon}
          iconRight={iconRight}
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

export const InputText = React.memo((props: InputProps) => {
  return <Input name={props.id} type="text" autoComplete="off" {...props} />
})

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

type TextAreaProps = InputProps<HTMLTextAreaElement & HTMLInputElement>
export const InputTextarea = React.memo(
  ({ id, value, required, validation, placeholder, disabled, onChange }: TextAreaProps) => {
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
const InputWithRightIcon = css<InputProps>`
  padding: 0 36px 1px 16px;
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
  ${InputStyles}
  resize: none;
`

export const InputElement = styled.div<InputElementProps>`
  display: grid;
  grid-row-gap: 4px;
  align-items: center;
  width: ${({ tight }) => (tight ? 'fit-content' : '100%')};
  min-width: ${({ inputWidth }) => {
    switch (inputWidth) {
      case 'auto':
        return null
      case 's':
        return '320px'
      case 'xs':
        return '200px'
      default:
        return '400px'
    }
  }};
`

const InputLabel = styled(Label)<DisabledInputProps>`
  margin-bottom: 0;
  color: ${({ disabled }) => (disabled ? Colors.Black[500] : Colors.Black[900])};
`

const InputIcon = styled.div<DisabledInputProps>`
  display: flex;
  position: absolute;
  width: 16px;
  height: 16px;
  pointer-events: none;
  color: inherit;
  transition: ${Transitions.all};
`

export const InputContainer = styled.div<InputElementProps>`
  display: grid;
  position: relative;
  grid-template-columns: ${(props) => (props.copy || props.units ? '1fr auto' : '1fr')};
  align-items: center;
  width: 100%;
  height: ${({ inputSize }) => {
    switch (inputSize) {
      case 'auto':
        return undefined
      case 'xs':
        return '32px'
      case 's':
        return '40px'
      case 'm':
      default:
        return '48px'
      case 'l':
        return '80px'
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
          return Colors.Black[300]
      }
    }};
  border: ${({ borderless }) => {
    if (borderless) {
      return 'none'
    }
  }};
  border-color: ${({ disabled }) => {
    if (disabled) {
      return Colors.Black[300]
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
    ${(props) => (props.icon && props.iconRight && !props.units && !props.copy ? InputWithRightIcon : null)}
    ${(props) => ((props.units || props.copy) && !props.icon ? InputWithRight : null)}
    ${(props) => ((props.units || props.copy) && props.icon ? InputWithBoth : null)}
  }
  & textarea {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  &:hover,
  &:focus,
  &:focus-within,
  &:hover .ck.ck-editor__editable_inline,
  &:focus .ck.ck-editor__editable_inline,
  &:focus-within .ck.ck-editor__editable_inline {
    &, 
    .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
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
        return Colors.Black[300]
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
  }

  ${InputIcon} {
    ${({ iconRight }) =>
      iconRight
        ? css`
            right: 16px;
          `
        : css`
            left: 16px;
          `};
  }

  .ck.ck-toolbar {
    border: none;
  }
  .ck.ck-editor__editable_inline,
  .ck.ck-focused,
  .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused  {
    border: none;
    border-top: 1px solid transparent;
  }
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
