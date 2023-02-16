import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import styled, { css } from 'styled-components'

import { enhancedGetErrorMessage, enhancedHasError } from '@/common/utils/validation'

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
    sublabel?: string
    inputDisabled?: boolean
    required?: boolean
    value?: string
    icon?: React.ReactElement
    copy?: boolean
    textToCopy?: string
    units?: string
    message?: React.ReactElement | string
    tooltipText?: React.ReactElement | string
    tooltipTitle?: string
    tooltipLinkText?: React.ReactElement | string
    tooltipLinkURL?: string
    className?: string
    children: React.ReactNode
  }

export interface InputProps<Element extends HTMLElement = HTMLInputElement> extends React.InputHTMLAttributes<Element> {
  id?: string
  validation?: 'invalid' | 'valid' | 'warning' | undefined
  required?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
}

export interface InputElementProps {
  disabled?: boolean
  inputSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'auto' | undefined
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
    sublabel,
    required,
    validation,
    disabled,
    inputDisabled,
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
    name,
  }: InputComponentProps) => {
    const formContext = useFormContext()

    const validationStatus = useMemo(() => {
      if (!formContext || !name) return validation
      return enhancedHasError(formContext?.formState?.errors)(name) ? 'invalid' : validation
    }, [JSON.stringify(formContext?.formState?.errors), name, validation])

    const validationMessage = useMemo(() => {
      if (!formContext || !name) return message
      return enhancedGetErrorMessage(formContext?.formState?.errors)(name) ?? message
    }, [JSON.stringify(formContext?.formState?.errors), name, message])

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
        {sublabel && (
          <InputSublabelWrapper>
            <InputSublabel>{sublabel}</InputSublabel>
          </InputSublabelWrapper>
        )}
        <InputContainer
          copy={copy}
          units={units}
          icon={icon}
          iconRight={iconRight}
          validation={validationStatus}
          disabled={disabled || inputDisabled}
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
        {validationMessage && (
          <InputNotification validation={validationStatus}>
            {validationStatus === 'invalid' && (
              <InputNotificationIcon>
                <AlertSymbol />
              </InputNotificationIcon>
            )}
            {validationStatus === 'warning' && (
              <InputNotificationIcon>
                <AlertSymbol />
              </InputNotificationIcon>
            )}
            {validationStatus === 'valid' && (
              <InputNotificationIcon>
                <SuccessSymbol />
              </InputNotificationIcon>
            )}
            <InputNotificationMessage>{validationMessage}</InputNotificationMessage>
          </InputNotification>
        )}
      </InputElement>
    )
  }
)

export const InputText = React.memo((props: InputProps) => {
  const formContext = useFormContext()

  if (!formContext || !props.name) {
    return <Input type="text" autoComplete="off" {...props} />
  }

  return <Input type="text" autoComplete="off" {...props} {...formContext.register(props.name)} />
})

type TextAreaProps = InputProps<HTMLTextAreaElement & HTMLInputElement>

export const InputTextarea = React.memo(({ name, ...props }: TextAreaProps) => {
  const formContext = useFormContext()

  if (!formContext || !name) {
    return <Textarea {...props} />
  }

  return <Textarea {...props} {...formContext.register(name)} />
})

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

const Textarea = styled.textarea`
  ${InputStyles};

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

const InputSublabelWrapper = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 16px;
`

const InputSublabel = styled(Label)`
  font-weight: 400;
  font-family: ${Fonts.Inter};
  color: ${Colors.Black[700]};
  position: absolute;
  white-space: nowrap;
`

export const InputIcon = styled.div<DisabledInputProps>`
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
      case 'xl':
        return '104px'
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
  .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
    border: none;
    border-top: 1px solid ${Colors.Black[300]};
  }
`

export const InputArea = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  min-width: 0;
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
`

export const InputNotification = styled.div<InputProps>`
  display: grid;
  min-height: 18px;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: 100%;
  grid-template-columns: max-content;
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

export const InputNotificationMessage = styled(TextSmall)`
  color: inherit;
`
